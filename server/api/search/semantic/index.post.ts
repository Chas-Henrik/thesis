/**
 * POST /api/search/semantic
 * Accepts a PDF file and returns the extracted plain text
 */

import { extractTextFromPdf } from '~/server/utils/pdfParser'
import { cvDBCosineSimilaritySearch, createCVEmbedding } from '~/server/utils/dbUtils'


export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const cvSearchOption = formData.get('cvSearchOption') as string | null
  const file = formData.get('file')
  const topK = formData.get('topK') as string | null


  if (!file || !(file instanceof Blob)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file field in form data' })
  }

  if (file.type !== 'application/pdf') {
    throw createError({ statusCode: 400, statusMessage: 'Only PDF files are accepted' })
  }

  const buffer = new Uint8Array(await file.arrayBuffer())
  const text = await extractTextFromPdf(buffer)

  const embedding = await createCVEmbedding(text, cvSearchOption)
  
  const response = await cvDBCosineSimilaritySearch(embedding, topK ? parseInt(topK) : 10)

  return { success: true, data: response }
})

