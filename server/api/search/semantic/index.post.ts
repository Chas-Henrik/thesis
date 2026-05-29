/**
 * POST /api/search/semantic
 * Accepts a PDF file and returns the extracted plain text
 */

import { extractTextFromPdf } from '~/server/utils/pdfParser'
import { cvDBCosineSimilaritySearch, createEmbedding, extractCVSkillsAndExperience } from '~/server/utils/dbUtils'


export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const cvSearchOption = formData.get('cvSearchOption') as string | null
  const file = formData.get('file')
  const freetextQuery = formData.get('freetextQuery') as string | null
  const topK = formData.get('topK') as string | null

  let text: string

  switch (cvSearchOption) {
    case null:
      if (!freetextQuery || !freetextQuery.trim()) {
        throw createError({ statusCode: 400, statusMessage: 'Freetext query is required when no CV is provided' })
      }
      text = freetextQuery.trim()
      break
    case 'Raw CV Info':
    case 'Extracted CV':
      if (!file || !(file instanceof Blob) || file.type !== 'application/pdf') {
        throw createError({ statusCode: 400, statusMessage: 'PDF file is required for CV search' })
      }
      const buffer = new Uint8Array(await file.arrayBuffer())
      text = await extractTextFromPdf(buffer)
      if (cvSearchOption === 'Extracted CV') {
        text = await extractCVSkillsAndExperience(text)
      }
      break
    default:
      throw createError({ statusCode: 400, statusMessage: 'Invalid CV search option' })
  }

  const embedding = await createEmbedding(text)
  
  const response = await cvDBCosineSimilaritySearch(embedding, topK ? parseInt(topK) : 10)

  return { success: true, data: response }
})

