/**
 * POST /api/search/semantic
 * Accepts a PDF file and returns the extracted plain text
 */

import { extractTextFromPdf } from '~/server/utils/pdfParser'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = formData.get('file')

  if (!file || !(file instanceof Blob)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file field in form data' })
  }

  if (file.type !== 'application/pdf') {
    throw createError({ statusCode: 400, statusMessage: 'Only PDF files are accepted' })
  }

  const buffer = new Uint8Array(await file.arrayBuffer())
  const text = await extractTextFromPdf(buffer)

  console.log('[search/semantic] Extracted text:', text)

  return { success: true }
})

