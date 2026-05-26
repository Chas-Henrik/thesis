/**
 * Job Import Service
 * Handles database import logic for date ranges
 */
import {fetchAllHits, mapHitToJob} from '~/server/utils/jobSearch'
import type {MappedJob} from '~/server/utils/jobSearch'

interface JobImportResult {
  success: boolean
  importedRecords: number
  message: string
}

/**
 * Import database records for a given date range
 * @param fromDate ISO 8601 date string (YYYY-MM-DD)
 * @param toDate ISO 8601 date string (YYYY-MM-DD)
 * @returns Import result with record count and status message
 */
export const importDatabaseForDateRange = async (
  fromDate: string,
  toDate: string,
): Promise<JobImportResult> => {
  try {
    const from = new Date(fromDate)
    const to = new Date(toDate)

    if (from > to) {
      throw new Error('From date must be before or equal to To date')
    }

    const allHits = await fetchAllHits(fromDate, toDate)
    console.log('[jobImport] Total hits fetched:', allHits.length)

    const mappedJobs: MappedJob[] = allHits.map(mapHitToJob)
    console.log('[jobImport] Imported records:', mappedJobs.length)

    return {
      success: true,
      importedRecords: mappedJobs.length,
      message: `Successfully imported ${mappedJobs.length} records for dates ${fromDate} to ${toDate}`,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('[jobImport] Import failed:', errorMessage)
    throw new Error(`Database import failed: ${errorMessage}`)
  }
}

