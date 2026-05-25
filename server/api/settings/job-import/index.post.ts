/**
 * POST /api/settings/job-import
 * Accept date range and trigger database import process
 */

import { importDatabaseForDateRange } from '~/server/services/jobImport'

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
    // update settings table with new dates - implement your actual storage logic here
    // Example: await saveJobImportDates(body.fromDate, body.toDate)

    // Simulate import delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Call the import service
    const result = await importDatabaseForDateRange(body.fromDate, body.toDate)

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
