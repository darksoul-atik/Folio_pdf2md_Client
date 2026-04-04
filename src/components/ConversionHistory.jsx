import { downloadMarkdown } from '../utils/api'

export default function ConversionHistory({ history, onLoad, onClear }) {
  if (!history || history.length === 0) return null

  return (
    <section className="mt-10 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="font-display tracking-widest" style={{ fontSize:22, color:'var(--text-on-dark)' }}>
            RECENT
          </h3>
          <div className="flex-1 h-px" style={{ background:'var(--border)', width:40 }} />
        </div>
        <button onClick={onClear}
          className="font-mono text-xs tracking-widest uppercase transition-colors duration-150"
          style={{ color:'var(--text-dim)' }}
          onMouseEnter={e => e.target.style.color='#ff5c00'}
          onMouseLeave={e => e.target.style.color='var(--text-dim)'}>
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {history.map((entry, i) => {
          const date = new Date(entry.convertedAt)
          const timeAgo = formatTimeAgo(date)
          const readingTime = Math.max(1, Math.ceil(entry.wordCount / 200))

          return (
            <div key={i}
              className="flex items-center justify-between gap-4 px-4 py-3 transition-all duration-150"
              style={{ border:'1px solid var(--border)', background:'var(--surface2)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor='#ff5c00'}
              onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>

              {/* Left */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-white" style={{ fontSize:9, letterSpacing:'0.05em' }}>MD</span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-sm truncate" style={{ color:'var(--text-on-dark)' }}>
                    {entry.filename}
                  </p>
                  <p className="font-mono" style={{ fontSize:11, color:'var(--text-dim)' }}>
                    {entry.pageCount}p · {entry.wordCount.toLocaleString()} words · ~{readingTime} min · {timeAgo}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => onLoad(entry)}
                  className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 transition-all duration-150"
                  style={{ border:'1px solid var(--border)', color:'var(--text-dim)', background:'transparent' }}
                  onMouseEnter={e => { e.target.style.borderColor='#ff5c00'; e.target.style.color='#ff5c00' }}
                  onMouseLeave={e => { e.target.style.borderColor='var(--border)'; e.target.style.color='var(--text-dim)' }}>
                  View
                </button>
                <button
                  onClick={() => downloadMarkdown(entry.markdown, entry.filename)}
                  className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 transition-all duration-150"
                  style={{ background:'#ff5c00', color:'#fff', border:'none' }}
                  onMouseEnter={e => e.target.style.background='#cc4900'}
                  onMouseLeave={e => e.target.style.background='#ff5c00'}>
                  ↓
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function formatTimeAgo(date) {
  const diff = (Date.now() - date.getTime()) / 1000
  if (diff < 60)  return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}