import { getServerSupabaseClient } from './supabase'
import type { MappedJob } from '~/server/utils/jobSearch'
import { GoogleGenAI } from "@google/genai";

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
    apiKey: process.env.GEMINI_API_KEY
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


    const newJobsWithEmbeddings = await Promise.all(newJobsToInsert.map(async (job) => {
      const embeddingResponse = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: job.description || "",
        config: { outputDimensionality: 768 }
      });
      return {
        ...job,
        raw_description_embedding: embeddingResponse.embeddings?.[0]?.values ?? null
      }
    }))

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



