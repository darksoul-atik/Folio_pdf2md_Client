export default function FileInfo({ file, onRemove }) {
  const sizeKB = (file.size / 1024).toFixed(1);
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  const displaySize = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;

  return (
    <div className="flex items-center justify-between bg-surface border border-border rounded-sm px-4 py-3 animate-fade-in">
      <div className="flex items-center gap-3 min-w-0">
        {/* PDF icon */}
        <div className="flex-shrink-0 w-9 h-9 bg-accent/10 rounded-sm flex items-center justify-center">
          <span className="font-mono text-xs font-bold text-accent">PDF</span>
        </div>
        <div className="min-w-0">
          <p className="font-body font-medium text-ink text-sm truncate">
            {file.name}
          </p>
          <p className="font-body text-muted text-xs">{displaySize}</p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="flex-shrink-0 ml-4 text-muted hover:text-accent transition-colors duration-150"
        aria-label="Remove file"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
