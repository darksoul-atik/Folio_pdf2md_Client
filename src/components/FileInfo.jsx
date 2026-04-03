export default function FileInfo({ file, onRemove }) {
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
  const sizeKB = (file.size / 1024).toFixed(1)
  const displaySize = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`

  return (
    <div className="flex items-center justify-between border border-border px-4 py-3 animate-fade-in"
      style={{ background: '#141414' }}>
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex-shrink-0 w-8 h-8 bg-accent flex items-center justify-center">
          <span className="font-mono text-white text-[10px] font-medium tracking-wider">PDF</span>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-text-on-dark text-sm truncate">{file.name}</p>
          <p className="font-mono text-muted text-xs mt-0.5">{displaySize}</p>
        </div>
      </div>
      <button onClick={onRemove}
        className="flex-shrink-0 ml-4 text-muted hover:text-accent transition-colors duration-150"
        aria-label="Remove file">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}