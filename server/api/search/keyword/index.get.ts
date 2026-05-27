import { getPrisma } from '~/server/utils/prisma'

interface SearchRequest {
  query: string
}

interface Job {
  id: string
  title: string
  location: string | null
  date: string | null
  description: string
  job_link: string | null
  employer_name: string | null
  employment_type: string | null
  working_hours_type: string | null
  af_job_id: string
}

interface SearchResponse {
  success: boolean
  data: Job[]
  error?: string
}

export default defineEventHandler(async (event): Promise<SearchResponse> => {
  try {
    const query = getQuery(event).query as string

    // Validate input
    if (!query || typeof query !== 'string') {
      return {
        success: false,
        data: [],
        error: 'Missing or invalid query parameter',
      }
    }

    const trimmedQuery = query.trim()

    if (trimmedQuery.length === 0) {
      return {
        success: false,
        data: [],
        error: 'Query cannot be empty',
      }
    }

    const prisma = getPrisma()

    // Search in title and description fields using case-insensitive matching
    const results = await prisma.jobs.findMany({
      where: {
        OR: [
          {
            title: {
              contains: trimmedQuery,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: trimmedQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        location: true,
        date: true,
        description: true,
        job_link: true,
        employer_name: true,
        employment_type: true,
        working_hours_type: true,
        af_job_id: true,
      },
    })
    console.log(`[search] Found ${results.length} results for query: "${trimmedQuery}"`)
    
    // Convert BigInt id to string for JSON serialization
    const serializedResults = results.map(job => ({
      ...job,
      id: job.id.toString(),
    }))

    return {
      success: true,
      data: serializedResults as Job[],
    }
  } catch (error) {
    console.error('Search error:', error)
    return {
      success: false,
      data: [],
      error: 'An error occurred while searching',
    }
  }
})
