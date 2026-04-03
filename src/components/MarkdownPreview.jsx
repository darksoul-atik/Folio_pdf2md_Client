import { useState } from 'react'

export default function MarkdownPreview({ result, onDownload, onReset }) {
  const { markdown, filename, wordCount, pageCount } = result
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
    } catch {
      const el = document.createElement('textarea')
      el.value = markdown
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-up">

      {/* Toast */}
      <div style={{
        position: 'fixed', bottom: 24, left: '50%',
        transform: 'translateX(-50%)',
        background: '#ff5c00', color: '#fff',
        fontFamily: 'DM Mono, monospace',
        fontSize: 12, letterSpacing: '0.1em',
        padding: '8px 20px', zIndex: 999,
        transition: 'all 0.25s ease',
        opacity: copied ? 1 : 0,
        pointerEvents: copied ? 'auto' : 'none',
        animation: copied ? 'slideToast 0.25s ease forwards' : 'none',
      }}>
        ✓ COPIED TO CLIPBOARD
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-6">
          <Stat label="Pages" value={pageCount} />
          <Stat label="Words" value={wordCount.toLocaleString()} />
          <Stat label="File" value={filename} mono small />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyToClipboard} className="btn-ghost text-xs py-2 px-4">
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button onClick={onDownload} className="btn-primary text-xs py-2 px-5">
            Download .md
          </button>
          <button onClick={onReset}
            className="ml-1 text-muted hover:text-accent transition-colors duration-150 p-1"
            title="Convert another file">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8a6 6 0 1 0 1.4-3.6M2 4.5v4h4"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Preview panel */}
      <div style={{ border: '1px solid #2a2a2a', background: '#0d0d0d' }}>
        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: '1px solid #2a2a2a', background: '#141414' }}>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#2a2a2a' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#2a2a2a' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5c00' }} />
          </div>
          <span className="font-mono text-muted text-xs tracking-wide">{filename}</span>
          <div className="w-16" />
        </div>
        <pre className="overflow-auto font-mono text-xs leading-relaxed whitespace-pre-wrap break-words p-5"
          style={{ maxHeight: 500, color: '#c8c4bc', background: '#0d0d0d' }}>
          {markdown}
        </pre>
      </div>
    </div>
  )
}

function Stat({ label, value, mono, small }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-muted tracking-widest uppercase"
        style={{ fontSize: 9 }}>{label}</span>
      <span style={{
        fontFamily: mono ? 'DM Mono, monospace' : 'Bebas Neue, sans-serif',
        fontSize: small ? 12 : 20,
        color: '#e8e4dc',
        letterSpacing: mono ? '0.05em' : '0.05em',
        lineHeight: 1,
      }}>
        {value}
      </span>
    </div>
  )
}