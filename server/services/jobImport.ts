/**
 * Job Import Service
 * Handles database import logic for date ranges
 */

interface JobImportResult {
  success: boolean
  importedRecords: number
  message: string
}

interface MappedJob {
  title: string
  location: string | null
  date: string
  description: string
  job_link: string
  employment_type: string | null
  working_hours_type: string | null
  employer: string | null
  af_job_id: string
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
    // Validate dates
    const from = new Date(fromDate)
    const to = new Date(toDate)

    if (from > to) {
      throw new Error('From date must be before or equal to To date')
    }

    const publishedAfter = encodeURIComponent(`${fromDate}T00:00:00`)
    const publishedBefore = encodeURIComponent(`${toDate}T00:00:00`)
    const config = useRuntimeConfig()
    const url = `${config.jobSearchApiUrl}?published-before=${publishedBefore}&published-after=${publishedAfter}&offset=0&limit=${config.jobSearchApiLimit}`

    console.log('[jobImport] Fetching from:', url)

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`External API responded with status ${response.status}`)
    }

    const data = await response.json()

    const mappedJobs: MappedJob[] = (data.hits ?? []).map((hit: Record<string, unknown>) => ({
      title: hit.headline as string,
      location: ((hit.workplace_address as Record<string, unknown> | null)?.city as string | null)?.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) ?? null,
      date: hit.publication_date as string,
      description: ((hit.description as Record<string, unknown> | null)?.text as string | null) ?? null,
      job_link: hit.webpage_url as string,
      employment_type: ((hit.employment_type as Record<string, unknown> | null)?.label as string | null) ?? null,
      working_hours_type: ((hit.working_hours_type as Record<string, unknown> | null)?.label as string | null) ?? null,
      employer: ((hit.employer as Record<string, unknown> | null)?.name as string | null) ?? null,
      af_job_id: hit.id as string,
    }))

    console.log('[jobImport] Mapped jobs:', JSON.stringify(mappedJobs, null, 2))

    const importedRecords = mappedJobs.length

    console.log('[jobImport] Imported records:', importedRecords)

    return {
      success: true,
      importedRecords,
      message: `Successfully imported ${importedRecords} records for dates ${fromDate} to ${toDate}`,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('[jobImport] Import failed:', errorMessage)
    throw new Error(`Database import failed: ${errorMessage}`)
  }
}
