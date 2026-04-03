export default function Header() {
  return (
    <header className="border-b border-border py-5">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="w-8 h-8 bg-ink rounded-sm flex items-center justify-center flex-shrink-0">
            <span className="font-mono text-paper text-xs font-bold">.md</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-ink text-lg leading-none tracking-tight">
              PDF<span className="text-accent">→</span>Markdown
            </h1>
            <p className="font-body text-muted text-xs mt-0.5">
              CPU-based converter
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1">
          <Badge>Open Source</Badge>
          <Badge>No API Key</Badge>
          <Badge>CPU Only</Badge>
        </div>
      </div>
    </header>
  );
}

function Badge({ children }) {
  return (
    <span className="font-mono text-xs text-muted border border-border rounded-sm px-2 py-0.5 ml-1">
      {children}
    </span>
  );
}
