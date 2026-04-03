import Header from './components/Header'
import Footer from './components/Footer'
import DropZone from './components/DropZone'
import FileInfo from './components/FileInfo'
import LoadingOverlay from './components/LoadingOverlay'
import MarkdownPreview from './components/MarkdownPreview'
import { useConverter } from './hooks/useConverter'

export default function App() {
  const { file, isLoading, result, selectFile, convert, download, reset } = useConverter()

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">

        {/* Hero text */}
        {!result && (
          <div className="mb-10 animate-fade-in">
            <h2 className="font-display font-extrabold text-ink text-4xl sm:text-5xl leading-tight tracking-tight">
              Turn PDFs into<br />
              <span className="text-accent">clean Markdown.</span>
            </h2>
            <p className="font-body text-muted text-base mt-4 max-w-lg leading-relaxed">
              Upload any PDF — reports, docs, papers — and get structured Markdown with
              headings, lists, bold/italic, tables, and code blocks. Runs entirely on CPU.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                '# Headings',
                '**Bold** / *Italic*',
                '- Lists',
                '| Tables |',
                '``` Code ```',
                'OCR fallback',
              ].map((f) => (
                <span
                  key={f}
                  className="font-mono text-xs border border-border rounded-sm px-3 py-1 text-muted bg-white"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main card */}
        <div className="card shadow-sm">
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
                <p className="text-center font-body text-muted text-xs">
                  Supports text-based PDFs · Table extraction · Up to 20 MB
                </p>
              )}
            </div>
          )}
        </div>

        {/* How it works — only show before conversion */}
        {!result && !isLoading && (
          <section className="mt-14 animate-fade-in">
            <h3 className="font-display font-bold text-ink text-xl mb-6 tracking-tight">
              How it works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  step: '01',
                  title: 'Upload',
                  desc: 'Drag and drop or browse for a PDF file up to 20 MB.',
                },
                {
                  step: '02',
                  title: 'Convert',
                  desc: 'PyMuPDF extracts layout, fonts, and text. Heuristics detect headings, lists, and tables.',
                },
                {
                  step: '03',
                  title: 'Download',
                  desc: 'Preview the Markdown in the browser and download the .md file.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="border border-border rounded-sm p-5 bg-white">
                  <span className="font-mono text-xs text-accent font-bold">{step}</span>
                  <h4 className="font-display font-semibold text-ink text-base mt-2 mb-1">{title}</h4>
                  <p className="font-body text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}