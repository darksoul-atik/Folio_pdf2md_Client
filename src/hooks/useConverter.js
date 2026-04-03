import { useState, useCallback } from 'react'
import Swal from 'sweetalert2'
import { convertPdfToMarkdown, downloadMarkdown } from '../utils/api'

const ACCEPTED_TYPE = 'application/pdf'
const MAX_SIZE_MB = 20
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

function applyFolioStyles(popup) {
  if (!popup) return

  // Popup box
  Object.assign(popup.style, {
    background: '#141414',
    border: '1px solid #2a2a2a',
    borderRadius: '0',
    fontFamily: "'DM Mono', monospace",
  })

  // Title
  const title = popup.querySelector('.swal2-title')
  if (title) Object.assign(title.style, {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '28px',
    letterSpacing: '0.1em',
    color: '#e8e4dc',
  })

  // Content text
  const content = popup.querySelector('.swal2-html-container')
  if (content) Object.assign(content.style, {
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    color: '#888888',
  })

  // Confirm button
  const confirmBtn = popup.querySelector('.swal2-confirm')
  if (confirmBtn) Object.assign(confirmBtn.style, {
    background: '#ff5c00',
    borderRadius: '0',
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '10px 24px',
    border: 'none',
  })

  // Success icon — make it orange
  const successIcon = popup.querySelector('.swal2-success-ring')
  if (successIcon) successIcon.style.borderColor = 'rgba(255,92,0,0.25)'
  popup.querySelectorAll('[class^="swal2-success-line"]').forEach(el => {
    el.style.background = '#ff5c00'
  })
  const successCircle = popup.querySelector('.swal2-icon.swal2-success')
  if (successCircle) successCircle.style.borderColor = '#ff5c00'

  // Error icon — make it orange
  const errorIcon = popup.querySelector('.swal2-icon.swal2-error')
  if (errorIcon) errorIcon.style.borderColor = '#ff5c00'
  popup.querySelectorAll('[class^="swal2-x-mark-line"]').forEach(el => {
    el.style.background = '#ff5c00'
  })

  // Timer progress bar
  const timerBar = popup.querySelector('.swal2-timer-progress-bar')
  if (timerBar) timerBar.style.background = '#ff5c00'
}

const swalBase = {
  background: '#141414',
  color: '#e8e4dc',
  confirmButtonColor: '#ff5c00',
  didOpen: (popup) => applyFolioStyles(popup),
  didRender: (popup) => applyFolioStyles(popup),
}

export function useConverter() {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const selectFile = useCallback((incoming) => {
    if (!incoming) return

    if (incoming.type !== ACCEPTED_TYPE && !incoming.name.toLowerCase().endsWith('.pdf')) {
      Swal.fire({ ...swalBase, icon: 'error', title: 'Invalid File', text: 'Please upload a PDF file.' })
      return
    }

    if (incoming.size > MAX_SIZE_BYTES) {
      Swal.fire({ ...swalBase, icon: 'error', title: 'File Too Large', text: `Max size is ${MAX_SIZE_MB} MB.` })
      return
    }

    setFile(incoming)
    setResult(null)
  }, [])

  const convert = useCallback(async () => {
    if (!file) return
    setIsLoading(true)
    setResult(null)

    try {
      const data = await convertPdfToMarkdown(file)
      setResult(data)

      Swal.fire({
        ...swalBase,
        icon: 'success',
        title: 'Converted',
        text: `${data.pageCount} page(s) · ${data.wordCount.toLocaleString()} words`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.message || 'Something went wrong.'
      Swal.fire({ ...swalBase, icon: 'error', title: 'Conversion Failed', text: msg })
    } finally {
      setIsLoading(false)
    }
  }, [file])

  const download = useCallback(() => {
    if (!result) return
    downloadMarkdown(result.markdown, result.filename)
  }, [result])

  const reset = useCallback(() => {
    setFile(null)
    setResult(null)
  }, [])

  return { file, isLoading, result, selectFile, convert, download, reset }
}