export default function LoadingOverlay() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16 animate-fade-in">
      {/* Animated document */}
      <div className="relative w-14 h-18" style={{ width: 56, height: 72 }}>
        <div className="absolute inset-0 border border-border" style={{ background: '#141414' }} />
        {/* Scan line */}
        <div className="absolute left-0 right-0 h-px bg-accent"
          style={{ animation: 'scanLine 1.8s ease-in-out infinite', top: 12 }} />
        {/* Doc lines */}
        <div className="absolute inset-0 flex flex-col justify-center gap-2 px-2.5">
          {[75, 55, 85, 45, 65, 50].map((w, i) => (
            <div key={i} className="h-px bg-border" style={{ width: `${w}%` }} />
          ))}
        </div>
        {/* Corner fold */}
        <div className="absolute top-0 right-0 w-3 h-3"
          style={{ background: '#0a0a0a', borderLeft: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }} />
      </div>

      {/* Pulsing dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map(i => (
          <span key={i} className="w-1.5 h-1.5 bg-accent inline-block"
            style={{ animation: 'pulse-dot 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>

      <div className="text-center">
        <p className="font-display text-text-on-dark text-2xl tracking-widest">CONVERTING</p>
        <p className="font-mono text-muted text-xs mt-2 tracking-wide">
          Extracting content and building Markdown…
        </p>
      </div>
    </div>
  )
}