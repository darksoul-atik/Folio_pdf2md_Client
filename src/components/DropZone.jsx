import { useRef, useState } from 'react'

export default function DropZone({ onFileSelect, disabled }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) onFileSelect(dropped)
  }

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleInputChange = (e) => {
    const selected = e.target.files?.[0]
    if (selected) onFileSelect(selected)
    e.target.value = ''
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !disabled && inputRef.current?.click()}
      className="relative cursor-pointer select-none transition-all duration-200"
      style={{
        border: isDragging ? '1px solid #ff5c00' : '1px solid #2a2a2a',
        background: isDragging ? 'rgba(255,92,0,0.04)' : 'transparent',
        padding: '56px 24px',
      }}
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l"
        style={{ borderColor: isDragging ? '#ff5c00' : '#444' }} />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r"
        style={{ borderColor: isDragging ? '#ff5c00' : '#444' }} />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l"
        style={{ borderColor: isDragging ? '#ff5c00' : '#444' }} />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r"
        style={{ borderColor: isDragging ? '#ff5c00' : '#444' }} />

      <div className="flex flex-col items-center gap-4">
        {/* Icon */}
        <div className="relative">
          <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
            <rect x="1" y="1" width="36" height="46" rx="1"
              stroke={isDragging ? '#ff5c00' : '#444'} strokeWidth="1"/>
            <path d="M28 1v12h10" stroke={isDragging ? '#ff5c00' : '#444'} strokeWidth="1"/>
            <path d="M9 28h20M9 22h14" stroke="#ff5c00" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M38 36v14M34 46l4 4 4-4" stroke={isDragging ? '#ff5c00' : '#888'}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="text-center">
          <p className="font-mono text-text-on-dark text-sm tracking-wide">
            {isDragging ? 'Drop to convert' : 'Drop PDF here'}
          </p>
          <p className="font-mono text-muted text-xs mt-1.5 tracking-wide">
            or{' '}
            <span className="text-accent underline underline-offset-2">browse files</span>
            {' '}· max 20 MB
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}