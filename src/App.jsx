import Header from './components/Header'
import Footer from './components/Footer'
import DropZone from './components/DropZone'
import FileInfo from './components/FileInfo'
import LoadingOverlay from './components/LoadingOverlay'
import MarkdownPreview from './components/MarkdownPreview'
import { useConverter } from './hooks/useConverter'

const FEATURES = [
  '# Headings', '**Bold** / *Italic*', '- Lists',
  '| Tables |', '``` Code ```', '> Blockquotes',
  '~~Strikethrough~~', '[Links](url)', '- [ ] Checkboxes', 'OCR fallback',
]

const STEPS = [
  { n: '01', title: 'Upload', desc: 'Drag & drop or browse. Supports any text-based or scanned PDF up to 20 MB.' },
  { n: '02', title: 'Convert', desc: 'PyMuPDF + pdfplumber extract layout. Heuristics detect headings, lists, tables, links, blockquotes and more.' },
  { n: '03', title: 'Download', desc: 'Preview the full Markdown output in the browser, copy it, or download as a .md file.' },
]

export default function App() {
  const { file, isLoading, result, selectFile, convert, download, reset } = useConverter()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0a' }}>
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-14">

        {/* Hero */}
        {!result && !isLoading && (
          <div className="mb-12 animate-fade-up">
            {/* Big display heading */}
            <div className="overflow-hidden mb-2">
              <h2 className="font-display text-text-on-dark leading-none tracking-wider"
                style={{ fontSize: 'clamp(52px, 10vw, 96px)' }}>
                PDF TO
              </h2>
            </div>
            <div className="overflow-hidden flex items-baseline gap-4 mb-6">
              <h2 className="font-display text-accent leading-none tracking-wider"
                style={{ fontSize: 'clamp(52px, 10vw, 96px)' }}>
                MARKDOWN
              </h2>
              <span className="font-mono text-muted text-xs tracking-widest uppercase self-end mb-2 hidden sm:block">
                v1.0
              </span>
            </div>

            <p className="font-body text-muted text-base max-w-xl leading-relaxed mb-8"
              style={{ color: '#888' }}>
              Drop any PDF — reports, papers, documentation — and get clean, structured Markdown.
              Runs entirely on CPU. No API keys. No cloud. No cost.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {FEATURES.map(f => (
                <span key={f}
                  className="font-mono text-xs px-3 py-1.5 tracking-wide"
                  style={{ border: '1px solid #2a2a2a', color: '#666', background: '#111' }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main converter card */}
        <div style={{ border: '1px solid #2a2a2a', background: '#111' }}>
          {/* Card header bar */}
          <div className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: '1px solid #2a2a2a', background: '#141414' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-widest uppercase text-muted">
                {isLoading ? 'Processing...' : result ? 'Output' : 'Input'}
              </span>
            </div>
            <span className="font-mono text-xs text-muted tracking-wide">
              {result ? result.filename : 'folio.converter'}
            </span>
          </div>

          {/* Card body */}
          <div className="p-6">
            {isLoading ? (
              <LoadingOverlay />
            ) : result ? (
              <MarkdownPreview result={result} onDownload={download} onReset={reset} />
            ) : (
              <div className="flex flex-col gap-4">
                <DropZone onFileSelect={selectFile} disabled={isLoading} />
                {file && (
                  <>
                    <FileInfo file={file} onRemove={reset} />
                    <div className="flex justify-end">
                      <button onClick={convert} className="btn-primary" disabled={isLoading}>
                        Convert to Markdown →
                      </button>
                    </div>
                  </>
                )}
                {!file && (
                  <p className="text-center font-mono text-xs tracking-wide"
                    style={{ color: '#444' }}>
                    text-based · scanned · multi-page · up to 20 MB
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* How it works */}
        {!result && !isLoading && (
          <section className="mt-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-display text-text-on-dark tracking-widest"
                style={{ fontSize: 28 }}>HOW IT WORKS</h3>
              <div className="flex-1 h-px" style={{ background: '#2a2a2a' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px"
              style={{ background: '#2a2a2a' }}>
              {STEPS.map(({ n, title, desc }) => (
                <div key={n} className="p-6" style={{ background: '#111' }}>
                  <span className="font-display text-accent tracking-wider"
                    style={{ fontSize: 36 }}>{n}</span>
                  <h4 className="font-display text-text-on-dark tracking-widest mt-1 mb-3"
                    style={{ fontSize: 18 }}>{title.toUpperCase()}</h4>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#666' }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom stat strip */}
        {!result && !isLoading && (
          <div className="mt-12 flex items-center justify-between flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: '0.2s' }}>
            {[
              { n: '10+', label: 'Markdown elements' },
              { n: '20MB', label: 'Max file size' },
              { n: '100+', label: 'OCR languages' },
              { n: '0', label: 'API keys needed' },
            ].map(({ n, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-accent tracking-wider"
                  style={{ fontSize: 32 }}>{n}</span>
                <span className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: '#555' }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}