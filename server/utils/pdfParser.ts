import { extractText } from 'unpdf'

/**
 * Extracts plain text from a PDF buffer.
 * Throws a Nitro H3Error with an appropriate status code if extraction fails.
 */
export async function extractTextFromPdf(buffer: Uint8Array): Promise<string> {
  try {
    const result = await extractText(buffer)
    return result.text.join('\n')
  }
  catch (error) {
    const name = error instanceof Error ? error.name : ''
    const message = error instanceof Error ? error.message : String(error)
    console.error('[pdfParser] Extraction failed:', name, message)

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
}
