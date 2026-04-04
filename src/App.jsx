import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import DropZone from './components/DropZone'
import FileInfo from './components/FileInfo'
import LoadingOverlay from './components/LoadingOverlay'
import MarkdownPreview from './components/MarkdownPreview'
import ConversionHistory from './components/ConversionHistory'
import { useConverter } from './hooks/useConverter'

const FEATURES = [
  '# Headings', '**Bold** / *Italic*', '- Lists',
  '| Tables |', '``` Code ```', '> Blockquotes',
  '~~Strikethrough~~', '[Links](url)', '- [ ] Checkboxes', 'OCR fallback',
]

const STEPS = [
  { n: '01', title: 'Upload', desc: 'Drag & drop or browse. Supports text-based or scanned PDFs up to 20 MB.' },
  { n: '02', title: 'Convert', desc: 'PyMuPDF + pdfplumber extract layout. Heuristics detect headings, lists, tables, links, blockquotes and more.' },
  { n: '03', title: 'Download', desc: 'Preview, edit, or download the Markdown. Conversion history saved locally.' },
]

export default function App() {
  const {
    file, isLoading, result, history, theme,
    selectFile, convert, download, loadFromHistory,
    clearHistory, reset, toggleTheme,
  } = useConverter()

  // Apply theme to root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen flex flex-col folio-root">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-14">

        {/* Hero */}
        {!result && !isLoading && (
          <div className="mb-12 animate-fade-up">
            <div className="overflow-hidden mb-1">
              <h2 className="font-display leading-none tracking-wider folio-hero-text"
                style={{ fontSize:'clamp(52px,10vw,96px)' }}>
                PDF TO
              </h2>
            </div>
            <div className="overflow-hidden flex items-baseline gap-4 mb-6">
              <h2 className="font-display text-accent leading-none tracking-wider"
                style={{ fontSize:'clamp(52px,10vw,96px)' }}>
                MARKDOWN
              </h2>
              <span className="font-mono text-xs tracking-widest uppercase self-end mb-2 hidden sm:block folio-muted">
                v1.0
              </span>
            </div>
            <p className="font-body text-base max-w-xl leading-relaxed mb-8 folio-muted">
              Drop any PDF — reports, papers, documentation — and get clean, structured Markdown.
              Runs entirely on CPU. No API keys. No cloud. No cost.
            </p>
            <div className="flex flex-wrap gap-2">
              {FEATURES.map(f => (
                <span key={f} className="font-mono text-xs px-3 py-1.5 tracking-wide folio-pill">{f}</span>
              ))}
            </div>
          </div>
        )}

        {/* Converter card */}
        <div className="folio-card">
          <div className="flex items-center justify-between px-5 py-3 folio-card-header">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-widest uppercase folio-muted">
                {isLoading ? 'Processing...' : result ? 'Output' : 'Input'}
              </span>
            </div>
            <span className="font-mono text-xs tracking-wide folio-muted">
              {result ? result.filename : 'folio.converter'}
            </span>
          </div>
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
                  <p className="text-center font-mono text-xs tracking-wide folio-muted-2">
                    text-based · scanned · multi-page · up to 20 MB
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* History */}
        {!result && !isLoading && (
          <ConversionHistory
            history={history}
            onLoad={loadFromHistory}
            onClear={clearHistory}
          />
        )}

        {/* How it works */}
        {!result && !isLoading && (
          <section className="mt-16 animate-fade-up">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-display tracking-widest folio-hero-text" style={{ fontSize:28 }}>
                HOW IT WORKS
              </h3>
              <div className="flex-1 h-px folio-divider" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px folio-steps-grid">
              {STEPS.map(({ n, title, desc }) => (
                <div key={n} className="p-6 folio-step-card">
                  <span className="font-display text-accent tracking-wider" style={{ fontSize:36 }}>{n}</span>
                  <h4 className="font-display tracking-widest mt-1 mb-3 folio-hero-text" style={{ fontSize:18 }}>
                    {title.toUpperCase()}
                  </h4>
                  <p className="font-body text-sm leading-relaxed folio-muted">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stats strip */}
        {!result && !isLoading && (
          <div className="mt-12 flex items-center justify-between flex-wrap gap-4 animate-fade-up">
            {[
              { n: '10+', label: 'Markdown elements' },
              { n: '20MB', label: 'Max file size' },
              { n: '100+', label: 'OCR languages' },
              { n: '0',   label: 'API keys needed' },
            ].map(({ n, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-accent tracking-wider" style={{ fontSize:32 }}>{n}</span>
                <span className="font-mono text-xs tracking-widest uppercase folio-muted-2">{label}</span>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}