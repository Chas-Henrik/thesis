/**
 * POST /api/settings/job-import
 * Accept date range and trigger database import process
 */

import { importDatabaseForDateRange } from '~/server/services/jobImport'
import { getPrisma } from '~/server/utils/prisma'

interface JobImportRequest {
  fromDate: string
  toDate: string
}

interface JobImportResponse {
  success: boolean
  message: string
}

export default defineEventHandler(async (event): Promise<JobImportResponse> => {
  try {
    const body = await readBody<JobImportRequest>(event)

    // Validate required fields
    if (!body.fromDate || !body.toDate) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: fromDate and toDate',
      })
    }

    // Validate date format (ISO 8601: YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(body.fromDate) || !dateRegex.test(body.toDate)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid date format. Use YYYY-MM-DD',
      })
    }

    // Validate that toDate is greater than fromDate
    if (new Date(body.toDate) < new Date(body.fromDate)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'toDate must be greater or equal to fromDate',
      })
    }

    console.log('[job-import POST] Received request with dates:', body.fromDate, body.toDate)
    
    // Update settings and import in a transaction (so both succeed or fail together)
    const prisma = getPrisma()
    const result = await prisma.$transaction(
      async (tx) => {
        // Find the first (and should be only) settings record
        let settings = await tx.settings.findFirst()
        
        // If no settings exist, create one
        if (!settings) {
          settings = await tx.settings.create({
            data: {
              from_date: body.fromDate,
              to_date: body.toDate,
            },
          })
        } else {
          // Update existing settings
          settings = await tx.settings.update({
            where: { id: settings.id },
            data: {
              from_date: body.fromDate,
              to_date: body.toDate,
            },
          })
        }
        
        // Call the import service
        return await importDatabaseForDateRange(body.fromDate, body.toDate)
      },
      {
        timeout: 30000, // 30 seconds
      }
    )

    return {
      success: result.success,
      message: result.message,
    }
  } catch (error) {
    console.error('[job-import POST]', error)

    // Re-throw validation errors
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process database import',
    })
  }
})
