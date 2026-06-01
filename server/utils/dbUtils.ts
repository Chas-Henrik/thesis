import { getServerSupabaseClient } from './supabase'
import type { MappedJob } from '~/server/utils/jobSearch'
import { GoogleGenAI } from "@google/genai";
import { EMBEDDING_TIMEOUT_MS } from '~/constants/jobSearch'

/**
 * Fetches all af_job_id values from the jobs table in Supabase.
 * Handles pagination to retrieve all results (default limit is 1000).
 * Returns an array of strings representing existing job IDs in the database.
 */
export const fetchAllExistingJobIds = async (): Promise<string[]> => {
  const supabase = getServerSupabaseClient()
  const allIds: string[] = []
  const pageSize = 1000
  let offset = 0
  let hasMore = true

  while (hasMore) {
    const { data, error } = await supabase
      .from('jobs')
      .select('af_job_id')
      .range(offset, offset + pageSize - 1)

    if (error) {
      throw new Error(`Failed to fetch existing job IDs: ${error.message}`)
    }

    if (!data || data.length === 0) {
      hasMore = false
      break
    }

    allIds.push(...data.map(row => row.af_job_id))

    // If we got fewer results than the page size, we've reached the end
    if (data.length < pageSize) {
      hasMore = false
    } else {
      offset += pageSize
    }
  }

  return allIds
}

/**
 * Syncs mapped jobs with the database.
 * Deletes jobs no longer in the AF API response and inserts new jobs.
 */
export const updateDB = async (mappedJobs: MappedJob[]): Promise<void> => {
  const supabase = getServerSupabaseClient()
  const apiAfJobIds = mappedJobs.map(job => job.af_job_id)
  const existingAfJobIds = await fetchAllExistingJobIds()
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: { timeout: 30_000 },
  }); 

  console.log(`[updateDB] Imported job IDs: ${apiAfJobIds.length}, Existing job IDs: ${existingAfJobIds.length}`)

  // Find jobs to delete
  const apiSet = new Set(apiAfJobIds)
  const afJobIdsToDelete = existingAfJobIds.filter(id => !apiSet.has(id))

  // Find new jobs to add
  const existingSet = new Set(existingAfJobIds)
  const newAfJobIds = apiAfJobIds.filter(id => !existingSet.has(id))
  console.log(`[updateDB] New jobs to add: ${newAfJobIds.length}, Jobs to delete: ${afJobIdsToDelete.length}`)

  // Delete old jobs
  if (afJobIdsToDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .in('af_job_id', afJobIdsToDelete)

    if (deleteError) {
      console.error('Error deleting jobs:', deleteError)
      throw new Error(`Failed to delete jobs: ${deleteError.message}`)
    }
    console.log(`[updateDB] Deleted ${afJobIdsToDelete.length} jobs`)
  }

  // Insert new jobs
  if (newAfJobIds.length > 0) {

    const newJobsToInsert = mappedJobs
      .filter(job => newAfJobIds.includes(job.af_job_id))


    const newJobsWithEmbeddings = []
    for (const job of newJobsToInsert) {
      const extractJobInfo = await extractJobAdSkillsAndExperience(job.description)

      const extractedEmbeddingResponse = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: extractJobInfo,
        config: { outputDimensionality: 768 }
      });

      const rawEmbeddingResponse = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: `${job.title} ${job.description ?? ''}`.trim(),
        config: { outputDimensionality: 768 }
      });
      
      newJobsWithEmbeddings.push({
        ...job,
        extracted_experiences_skills_embedding: extractedEmbeddingResponse.embeddings?.[0]?.values ?? null,
        raw_description_embedding: rawEmbeddingResponse.embeddings?.[0]?.values ?? null
      })
      await new Promise(resolve => setTimeout(resolve, EMBEDDING_TIMEOUT_MS))
    }

    const { error: insertError } = await supabase
      .from('jobs')
      .insert(newJobsWithEmbeddings)



    if (insertError) {
      console.error('Error inserting jobs:', insertError)
      throw new Error(`Failed to insert jobs: ${insertError.message}`)
    }

    console.log(`[updateDB] Inserted ${newAfJobIds.length} new jobs`)
  }
}

export interface JobSearchResult {
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
  similarity: number
}

export const cvDBCosineSimilaritySearch = async (
  embedding: number[],
  topK: number = 5,
  adSearchOption: string
): Promise<JobSearchResult[]> => {
  const supabase = getServerSupabaseClient()
  const rpcName = adSearchOption === 'Extracted Ad' ? 'match_extracted_jobs_cosine' : 'match_raw_jobs_cosine'

  const { data, error } = await supabase.rpc(rpcName, {
    query_embedding: embedding,
    match_count: topK,
  })
  if (error) {
    throw new Error(`Cosine similarity search failed: ${error.message}`)
  }
  return data as JobSearchResult[]

}

export const extractCVSkillsAndExperience = async (text: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const prompt = `You are a CV parser. Extract only the skills and work experience from the following CV text. 
  Return a clean, concise summary containing:
  - A "Skills" section listing technical and soft skills
  - An "Experience" section listing job titles, employers, durations, and key responsibilities

  Remove all formatting noise, personal contact details, education details, hobbies, and unrelated content.
  Keep the output as plain text.

  CV text:
  ${text}`

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: prompt,
    config: {temperature: 0 },
  })
  console.log(response.text)
  return response.text ?? ''
}


export const extractJobAdSkillsAndExperience = async (text: string | null): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  if (!text || text.trim().length === 0) {
    console.error('Job description text is required for extraction')
    return ''
  }

  const prompt = `You are a job advertisement parser. Extract only the required and preferred qualifications from the following job ad.
    Return a clean, concise summary containing:
    - A "Required Skills" section listing the technical and soft skills the employer is looking for
    - A "Required Experience" section listing the experience, background, or seniority level the employer expects

    Ignore company descriptions, benefits, salary, application instructions, legal disclaimers, and unrelated content.
    Keep the output as plain text.

    Job ad text:
    ${text}`

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: prompt,
    config: {temperature: 0 },
  })
  return response.text ?? ''
}

export const createEmbedding = async (text: string) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  }); 

  if (!text || text.trim().length === 0) {
    console.error('Text content is required for embedding')
    return []
  }

  const embeddingResponse = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text.trim(),
    config: { outputDimensionality: 768 }
  })

  return embeddingResponse.embeddings?.[0]?.values ?? []
}
