export default function LoadingOverlay() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 animate-fade-in">
      {/* Animated document icon */}
      <div className="relative w-16 h-20">
        <div className="absolute inset-0 border-2 border-ink rounded-sm bg-white" />
        {/* Scanning line */}
        <div
          className="absolute left-0 right-0 h-0.5 bg-accent opacity-80"
          style={{
            animation: 'scanLine 1.6s ease-in-out infinite',
          }}
        />
        {/* Lines on document */}
        <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-2">
          {[80, 60, 90, 50, 70].map((w, i) => (
            <div
              key={i}
              className="h-1 bg-border rounded-full"
              style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-accent inline-block"
            style={{
              animation: 'dotBounce 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center">
        <p className="font-display font-semibold text-ink text-base">Converting your PDF</p>
        <p className="font-body text-muted text-sm mt-1">Extracting content and building Markdown…</p>
      </div>

      <style>{`
        @keyframes scanLine {
          0%   { top: 8px; opacity: 1; }
          50%  { top: calc(100% - 8px); opacity: 1; }
          100% { top: 8px; opacity: 1; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}