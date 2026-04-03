export default function Header() {
  return (
    <header className="border-b border-border py-4 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex-shrink-0">
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <span className="font-display text-white text-lg leading-none">F</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-text-on-dark text-2xl leading-none tracking-wider">
              FOLIO
            </span>
            <span className="font-mono text-muted text-[10px] tracking-widest uppercase">
              PDF → Markdown
            </span>
          </div>
        </div>

        {/* Right badges */}
        <div className="hidden sm:flex items-center gap-2">
          {['CPU Only', 'No API Key', 'Open Source'].map(b => (
            <span key={b} className="font-mono text-[10px] text-muted border border-border px-2 py-1 tracking-widest uppercase">
              {b}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}