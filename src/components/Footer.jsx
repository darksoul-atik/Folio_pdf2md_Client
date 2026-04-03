export default function Footer() {
  return (
    <footer className="border-t border-border py-6 mt-20">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-accent flex items-center justify-center">
            <span className="font-display text-white text-xs">F</span>
          </div>
          <span className="font-mono text-muted text-xs tracking-widest uppercase">Folio</span>
        </div>
        <p className="font-mono text-muted text-xs tracking-wide">
          FastAPI · PyMuPDF · pdfplumber · Tesseract · React · Tailwind
        </p>
        <p className="font-mono text-muted text-xs">
          CPU-only · Zero paid APIs
        </p>
      </div>
    </footer>
  )
}