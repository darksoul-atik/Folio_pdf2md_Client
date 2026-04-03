import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function MarkdownPreview({ result, onDownload, onReset }) {
  const { markdown, filename, wordCount, pageCount } = result
  const [copied, setCopied] = useState(false)
  const [view, setView] = useState('preview') // 'preview' | 'raw'

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
      }}>
        ✓ COPIED TO CLIPBOARD
      </div>

      {/* Stats + actions */}
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

      {/* View toggle */}
      <div className="flex items-center gap-0" style={{ borderBottom: '1px solid #2a2a2a' }}>
        {['preview', 'raw'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-150"
            style={{
              background: view === v ? '#ff5c00' : 'transparent',
              color: view === v ? '#fff' : '#666',
              border: 'none',
              borderRadius: 0,
            }}
          >
            {v === 'preview' ? '⬡ Preview' : '</> Raw'}
          </button>
        ))}
      </div>

      {/* Preview panel */}
      <div style={{ border: '1px solid #2a2a2a', background: '#0d0d0d', minHeight: 300 }}>
        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: '1px solid #2a2a2a', background: '#141414' }}>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#2a2a2a' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#2a2a2a' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5c00' }} />
          </div>
          <span className="font-mono text-muted text-xs tracking-wide">{filename}</span>
          <span className="font-mono text-xs tracking-widest uppercase"
            style={{ color: view === 'preview' ? '#ff5c00' : '#444', fontSize: 10 }}>
            {view}
          </span>
        </div>

        {/* Content */}
        <div className="overflow-auto p-6" style={{ maxHeight: 560 }}>
          {view === 'raw' ? (
            <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-words"
              style={{ color: '#c8c4bc' }}>
              {markdown}
            </pre>
          ) : (
            <div className="folio-md">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ borderRadius: 0, background: '#111', border: '1px solid #2a2a2a', fontSize: 12 }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className}
                        style={{ background: '#1a1a1a', padding: '2px 6px', fontFamily: 'DM Mono, monospace', fontSize: '0.85em', color: '#ff5c00' }}
                        {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, mono, small }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-muted tracking-widest uppercase" style={{ fontSize: 9 }}>
        {label}
      </span>
      <span style={{
        fontFamily: mono ? 'DM Mono, monospace' : 'Bebas Neue, sans-serif',
        fontSize: small ? 12 : 20,
        color: '#e8e4dc',
        letterSpacing: '0.05em',
        lineHeight: 1,
      }}>
        {value}
      </span>
    </div>
  )
}