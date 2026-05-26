import {JOB_SEARCH_API_URL, JOB_SEARCH_API_LIMIT, JOB_SEARCH_API_MAX_OFFSET} from '~/constants/jobSearch'

export interface MappedJob {
  title: string
  location: string | null
  date: string
  description: string | null
  job_link: string
  employment_type: string | null
  working_hours_type: string | null
  employer: string | null
  af_job_id: string
}

export const fetchAllHits = async (fromDate: string, toDate: string): Promise<Record<string, unknown>[]> => {
  const publishedAfter = encodeURIComponent(`${fromDate}T00:00:00`)
  const publishedBefore = encodeURIComponent(`${toDate}T00:00:00`)
  const baseUrl = `${JOB_SEARCH_API_URL}?published-before=${publishedBefore}&published-after=${publishedAfter}&limit=${JOB_SEARCH_API_LIMIT}`

  const allHits: Record<string, unknown>[] = []
  let offset = 0

  while (true) {
    const url = `${baseUrl}&offset=${offset}`
    console.log('[jobSearch] Fetching from:', url)

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`External API responded with status ${response.status}`)
    }

    const data = await response.json()
    const hits: Record<string, unknown>[] = data.hits ?? []
    allHits.push(...hits)

    if (hits.length < JOB_SEARCH_API_LIMIT) break
    offset += JOB_SEARCH_API_LIMIT
    if (offset >= JOB_SEARCH_API_MAX_OFFSET) break
  }

  return allHits
}

export const mapHitToJob = (hit: Record<string, unknown>): MappedJob => ({
  title: hit.headline as string,
  location: ((hit.workplace_address as Record<string, unknown> | null)?.city as string | null)?.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) ?? null,
  date: hit.publication_date as string,
  description: ((hit.description as Record<string, unknown> | null)?.text as string | null) ?? null,
  job_link: hit.webpage_url as string,
  employment_type: ((hit.employment_type as Record<string, unknown> | null)?.label as string | null) ?? null,
  working_hours_type: ((hit.working_hours_type as Record<string, unknown> | null)?.label as string | null) ?? null,
  employer: ((hit.employer as Record<string, unknown> | null)?.name as string | null) ?? null,
  af_job_id: hit.id as string,
})
