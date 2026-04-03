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

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

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
      className={`
        relative border-2 border-dashed rounded-sm p-12
        flex flex-col items-center justify-center gap-4
        cursor-pointer transition-all duration-200 select-none
        ${isDragging
          ? 'border-accent bg-accent/5 scale-[1.01]'
          : 'border-border hover:border-ink hover:bg-surface/40'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
      `}
    >
      {/* Icon */}
      <div className={`transition-transform duration-200 ${isDragging ? 'scale-110' : ''}`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="4" width="28" height="36" rx="1" stroke="#0e0e0e" strokeWidth="1.5" fill="none"/>
          <path d="M28 4v10h8" stroke="#0e0e0e" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M16 28h16M16 22h10" stroke="#d4541a" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M24 38v8M20 42l4 4 4-4" stroke="#0e0e0e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="text-center">
        <p className="font-display font-semibold text-ink text-base">
          {isDragging ? 'Drop it here' : 'Drop your PDF here'}
        </p>
        <p className="font-body text-muted text-sm mt-1">
          or <span className="text-accent underline underline-offset-2">browse files</span> · max 20 MB
        </p>
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