export default function Header({ theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <header style={{ borderBottom:'1px solid var(--border)', padding:'16px 24px' }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent flex items-center justify-center flex-shrink-0">
            <span className="font-display text-white text-lg leading-none">F</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display tracking-wider folio-hero-text" style={{ fontSize:24, lineHeight:1 }}>
              FOLIO
            </span>
            <span className="font-mono folio-muted tracking-widest uppercase" style={{ fontSize:10 }}>
              PDF → Markdown
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            {['CPU Only', 'No API Key', 'Open Source'].map(b => (
              <span key={b} className="font-mono folio-pill tracking-widest uppercase" style={{ fontSize:10, padding:'4px 8px' }}>
                {b}
              </span>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-3 py-2 transition-all duration-200"
            style={{ border:'1px solid var(--border)', color:'var(--text-dim)', background:'transparent' }}
            onMouseEnter={e => e.currentTarget.style.borderColor='#ff5c00'}
            onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
            title="Toggle theme">
            {isDark ? '☀ Light' : '☾ Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}