/**
 * POST /api/cv/parse
 * Accepts a PDF file and returns the extracted plain text
 */

import { extractText } from 'unpdf'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = formData.get('file')

  if (!file || !(file instanceof Blob)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file field in form data' })
  }

  if (file.type !== 'application/pdf') {
    throw createError({ statusCode: 400, statusMessage: 'Only PDF files are accepted' })
  }

  const arrayBuffer = await file.arrayBuffer()

  let text: string
  try {
    const result = await extractText(new Uint8Array(arrayBuffer))
    text = result.text.join('\n')
  }
  catch (error) {
    const name = error instanceof Error ? error.name : ''
    const message = error instanceof Error ? error.message : String(error)
    console.error('[cv/parse] Extraction failed:', name, message)

    if (name === 'PasswordException' || message.toLowerCase().includes('password')) {
      throw createError({ statusCode: 422, statusMessage: 'PDF is password-protected and cannot be read' })
    }
    if (name === 'InvalidPDFException' || message.toLowerCase().includes('invalid pdf')) {
      throw createError({ statusCode: 422, statusMessage: 'File is not a valid PDF' })
    }
    if (name === 'MissingPDFException') {
      throw createError({ statusCode: 422, statusMessage: 'PDF content is missing or empty' })
    }

    throw createError({ statusCode: 500, statusMessage: `Failed to extract text: ${message}` })
  }

  console.log('[cv/parse] Extracted text:', text)

  return { success: true }
})
