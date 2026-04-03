export default function Header() {
  return (
    <header className="border-b border-border py-5">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-ink rounded-sm flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            {/* F lettermark */}
            <span className="font-display font-extrabold text-paper text-lg leading-none">F</span>
            {/* accent dot */}
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-ink text-xl leading-none tracking-tight">
              Folio
            </h1>
            <p className="font-mono text-muted text-xs mt-0.5 tracking-wide">
              PDF <span className="text-accent">→</span> Markdown
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="hidden sm:flex items-center gap-1.5">
          <Badge>Open Source</Badge>
          <Badge>No API Key</Badge>
          <Badge>CPU Only</Badge>
        </div>
      </div>
    </header>
  )
}

function Badge({ children }) {
  return (
    <span className="font-mono text-xs text-muted border border-border rounded-sm px-2 py-0.5">
      {children}
    </span>
  )
}