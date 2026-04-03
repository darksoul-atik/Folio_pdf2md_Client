import { useState, useCallback } from 'react'
import Swal from 'sweetalert2'
import { convertPdfToMarkdown, downloadMarkdown } from '../utils/api'

const ACCEPTED_TYPE = 'application/pdf'
const MAX_SIZE_MB = 20
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

export function useConverter() {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null) // { markdown, filename, wordCount, pageCount }

  // ---- File selection & validation ----
  const selectFile = useCallback((incoming) => {
    if (!incoming) return

    if (incoming.type !== ACCEPTED_TYPE && !incoming.name.toLowerCase().endsWith('.pdf')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file',
        text: 'Please upload a PDF file.',
        confirmButtonColor: '#0e0e0e',
      })
      return
    }

    if (incoming.size > MAX_SIZE_BYTES) {
      Swal.fire({
        icon: 'error',
        title: 'File too large',
        text: `Maximum allowed size is ${MAX_SIZE_MB} MB.`,
        confirmButtonColor: '#0e0e0e',
      })
      return
    }

    setFile(incoming)
    setResult(null)
  }, [])

  // ---- Conversion ----
  const convert = useCallback(async () => {
    if (!file) return

    setIsLoading(true)
    setResult(null)

    try {
      const data = await convertPdfToMarkdown(file)
      setResult(data)

      Swal.fire({
        icon: 'success',
        title: 'Converted!',
        text: `${data.pageCount} page(s) · ${data.wordCount.toLocaleString()} words`,
        confirmButtonColor: '#0e0e0e',
        timer: 3000,
        timerProgressBar: true,
      })
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        'Something went wrong. Please try again.'

      Swal.fire({
        icon: 'error',
        title: 'Conversion failed',
        text: msg,
        confirmButtonColor: '#0e0e0e',
      })
    } finally {
      setIsLoading(false)
    }
  }, [file])

  // ---- Download ----
  const download = useCallback(() => {
    if (!result) return
    downloadMarkdown(result.markdown, result.filename)
  }, [result])

  // ---- Reset ----
  const reset = useCallback(() => {
    setFile(null)
    setResult(null)
  }, [])

  return { file, isLoading, result, selectFile, convert, download, reset }
}