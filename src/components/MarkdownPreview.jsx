export default function MarkdownPreview({ result, onDownload, onReset }) {
  const { markdown, filename, wordCount, pageCount } = result;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = markdown;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-slide-up">
      {/* Stats bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <Stat label="Pages" value={pageCount} />
          <div className="w-px h-6 bg-border" />
          <Stat label="Words" value={wordCount.toLocaleString()} />
          <div className="w-px h-6 bg-border" />
          <Stat label="Output" value={filename} mono />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="btn-ghost text-xs py-2 px-4"
          >
            Copy
          </button>
          <button
            onClick={onDownload}
            className="btn-primary text-xs py-2 px-4"
          >
            Download .md
          </button>
          <button
            onClick={onReset}
            className="text-muted hover:text-accent transition-colors duration-150 ml-1"
            aria-label="Convert another file"
            title="Convert another file"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 9a6 6 0 1 0 1.5-3.9M3 5v4h4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview panel */}
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
          </div>
          <span className="font-mono text-xs text-muted">{filename}</span>
          <div className="w-16" /> {/* Spacer */}
        </div>
        <pre className="overflow-auto max-h-120 p-5 text-xs font-mono text-ink/80 leading-relaxed whitespace-pre-wrap break-words bg-white">
          {markdown}
        </pre>
      </div>
    </div>
  );
}

function Stat({ label, value, mono }) {
  return (
    <div className="flex flex-col">
      <span className="font-body text-muted text-xs uppercase tracking-wider">
        {label}
      </span>
      <span
        className={`text-ink font-semibold text-sm ${mono ? "font-mono" : "font-display"}`}
      >
        {value}
      </span>
    </div>
  );
}
