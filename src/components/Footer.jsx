export default function Footer() {
  return (
    <footer className="border-t border-border py-5 mt-16">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between flex-wrap gap-2">
        <p className="font-body text-muted text-xs">
          Built with FastAPI · PyMuPDF · pdfplumber · React · Tailwind
        </p>
        <p className="font-body text-muted text-xs">
          CPU-only · No paid APIs · Open source
        </p>
      </div>
    </footer>
  )
}