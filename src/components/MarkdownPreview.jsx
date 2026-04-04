import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { downloadMarkdown } from "../utils/api";

export default function MarkdownPreview({ result, onDownload, onReset }) {
  const {
    markdown,
    filename,
    wordCount,
    pageCount,
    headings,
    tables,
    codeBlocks,
    links,
    readingTime,
  } = result;
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState("preview"); // preview | raw | edit | split
  const [edited, setEdited] = useState(markdown);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(edited);
    } catch {
      const el = document.createElement("textarea");
      el.value = edited;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => downloadMarkdown(edited, filename);

  return (
    <div className="folio-preview flex flex-col gap-5 animate-fade-up">
      {/* Toast */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#ff5c00",
          color: "#fff",
          fontFamily: "DM Mono,monospace",
          fontSize: 12,
          letterSpacing: "0.1em",
          padding: "8px 20px",
          zIndex: 999,
          transition: "all 0.25s ease",
          opacity: copied ? 1 : 0,
          pointerEvents: copied ? "auto" : "none",
        }}
      >
        ✓ COPIED TO CLIPBOARD
      </div>

      {/* Stats bar */}
      <div
        className="grid grid-cols-2 sm:grid-cols-5 gap-3 pb-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <StatBox label="Pages" value={pageCount} />
        <StatBox label="Words" value={wordCount.toLocaleString()} />
        <StatBox label="Read time" value={`~${readingTime} min`} mono />
        <StatBox label="Headings" value={headings} />
        <StatBox label="Tables" value={tables} />
      </div>

      {/* Extra stats */}
      <div className="flex items-center gap-4 flex-wrap -mt-2">
        {codeBlocks > 0 && (
          <Tag label={`${codeBlocks} code block${codeBlocks > 1 ? "s" : ""}`} />
        )}
        {links > 0 && <Tag label={`${links} link${links > 1 ? "s" : ""}`} />}
        <Tag label={filename} mono />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* View toggle */}
        <div className="flex" style={{ border: "1px solid var(--border)" }}>
          {[
            { id: "preview", label: "Preview" },
            { id: "raw", label: "Raw" },
            { id: "edit", label: "Edit" },
            { id: "split", label: "Split" },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className="font-mono text-xs tracking-widest uppercase px-4 py-2 transition-all duration-150"
              style={{
                background: view === v.id ? "#ff5c00" : "transparent",
                color: view === v.id ? "#fff" : "var(--text-dim)",
                border: "none",
                borderRadius: 0,
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="btn-ghost text-xs py-2 px-4"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary text-xs py-2 px-5"
          >
            Download .md
          </button>
          <button
            onClick={onReset}
            className="ml-1 p-1 transition-colors duration-150"
            style={{ color: "var(--text-dim)" }}
            title="Convert another file"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 8a6 6 0 1 0 1.4-3.6M2 4.5v4h4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Panel */}
      <div
        style={{
          border: "1px solid var(--border)",
          background: "var(--surface)",
          minHeight: 300,
        }}
      >
        {/* Titlebar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            borderBottom: "1px solid var(--border)",
            background: "var(--surface2)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "var(--border)" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "var(--border)" }}
            />
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          </div>
          <span
            className="font-mono text-xs tracking-wide"
            style={{ color: "var(--text-dim)" }}
          >
            {filename}
          </span>
          <span
            className="font-mono tracking-widest uppercase"
            style={{ color: "#ff5c00", fontSize: 10 }}
          >
            {view}
          </span>
        </div>

        {/* Content */}
        {view === "split" ? (
          <div className="grid grid-cols-2" style={{ maxHeight: 560 }}>
            <textarea
              value={edited}
              onChange={(e) => setEdited(e.target.value)}
              className="font-mono text-xs leading-relaxed p-5 resize-none outline-none"
              style={{
                background: "var(--surface)",
                color: "var(--text-on-dark)",
                borderRight: "1px solid var(--border)",
                height: 560,
              }}
            />
            <div className="folio-md overflow-auto p-5" style={{ height: 560 }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={mdComponents}
              >
                {edited}
              </ReactMarkdown>
            </div>
          </div>
        ) : view === "edit" ? (
          <div className="flex flex-col" style={{ height: 560 }}>
            <div
              className="flex items-center gap-2 px-4 py-2"
              style={{
                borderBottom: "1px solid var(--border)",
                background: "var(--surface2)",
                flexShrink: 0,
              }}
            >
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: "#ff5c00" }}
              >
                Editing
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: "var(--text-dim)" }}
              >
                — changes apply to download & copy
              </span>
            </div>
            <textarea
              value={edited}
              onChange={(e) => setEdited(e.target.value)}
              className="font-mono text-xs leading-relaxed p-5 resize-none outline-none"
              style={{
                background: "var(--surface)",
                color: "var(--text-on-dark)",
                border: "none",
                flex: 1,
                width: "100%",
              }}
            />
          </div>
        ) : view === "raw" ? (
          <pre
            className="overflow-auto font-mono text-xs leading-relaxed whitespace-pre-wrap break-words p-5"
            style={{
              maxHeight: 560,
              color: "var(--text-dim)",
              background: "var(--surface)",
            }}
          >
            {edited}
          </pre>
        ) : (
          <div
            className="folio-md overflow-auto p-6"
            style={{ maxHeight: 560 }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={mdComponents}
            >
              {edited}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

const mdComponents = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        customStyle={{
          borderRadius: 0,
          background: "#111",
          border: "1px solid #2a2a2a",
          fontSize: 12,
        }}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code
        className={className}
        style={{
          background: "#1a1a1a",
          padding: "2px 6px",
          fontFamily: "DM Mono,monospace",
          fontSize: "0.85em",
          color: "#ff5c00",
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
};

function StatBox({ label, value, mono }) {
  return (
    <div
      className="flex flex-col gap-0.5 p-3"
      style={{
        background: "var(--surface2)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="font-mono tracking-widest uppercase"
        style={{ fontSize: 9, color: "var(--text-dim)" }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: mono ? "DM Mono,monospace" : "Bebas Neue,sans-serif",
          fontSize: mono ? 13 : 22,
          color: "var(--text-on-dark)",
          letterSpacing: "0.05em",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Tag({ label, mono }) {
  return (
    <span
      className="font-mono text-xs px-2 py-1 tracking-wide"
      style={{
        border: "1px solid var(--border)",
        color: "var(--text-dim)",
        fontFamily: mono ? "DM Mono,monospace" : undefined,
      }}
    >
      {label}
    </span>
  );
}
