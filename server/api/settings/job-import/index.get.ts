/**
 * GET /api/settings/job-import
 * Retrieve the current job import date range from storage/database
 */

import { getPrisma } from '~/server/utils/prisma'

interface JobImportData {
  fromDate?: string
  toDate?: string
}

export default defineEventHandler(async (event): Promise<JobImportData> => {
  try {
    const prisma = getPrisma()
    
    // Fetch job import settings from database
    const settings = await prisma.settings.findUnique({
      where: { id: 1n },
      select: {
        from_date: true,
        to_date: true,
      },
    })

    return {
      fromDate: settings?.from_date || undefined,
      toDate: settings?.to_date || undefined,
    }
  } catch (error) {
    console.error('[job-import GET]', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve job import dates',
    })
  }
})
