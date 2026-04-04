<div align="center">

```
███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔════╝██╔═══██╗██║     ██║██╔═══██╗
█████╗  ██║   ██║██║     ██║██║   ██║
██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
```

**PDF → Markdown Converter · Frontend**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Deployed-Firebase-FF6D00?style=flat-square&logo=firebase)](https://firebase.google.com)

*A professional, dark-themed web interface for converting PDFs to clean GitHub-flavored Markdown.*

[Live Demo](https://folio-pdf2md.web.app) · [Backend Repo](https://github.com/darksoul-atik/Folio_pdf2md_server) · [Report Bug](https://github.com/darksoul-atik/Folio_pdf2md/issues)

</div>

---

## ✦ Overview

Folio's frontend is a modern single-page React application that provides a complete PDF-to-Markdown conversion experience directly in the browser. Upload a PDF, watch it convert, preview the result in rendered GitHub-style Markdown, edit if needed, and download — all in one place.

---

## ✦ Features

### Core
- **Drag & drop upload** — with file type and size validation (max 20 MB)
- **Real-time conversion** — sends PDF to FastAPI backend, receives structured Markdown
- **4-mode preview panel:**
  - `Preview` — rendered GitHub-flavored Markdown
  - `Raw` — plain Markdown text
  - `Edit` — editable textarea (changes apply to copy & download)
  - `Split` — side-by-side editor and live preview

### Markdown Rendering
| Element | Rendered |
|---------|----------|
| `# H1 / ## H2 / ### H3` | ✅ Bebas Neue headings with underline |
| `**Bold** / *Italic*` | ✅ |
| `~~Strikethrough~~` | ✅ |
| `[Links](url)` | ✅ Orange accent color |
| `- Lists / 1. Ordered` | ✅ Orange dash markers |
| `- [ ] Checkboxes` | ✅ Orange accent |
| `\| Tables \|` | ✅ Dark themed, alternating rows |
| ` ``` Code ``` ` | ✅ Syntax highlighted (oneDark) |
| `> Blockquotes` | ✅ Orange left border |
| `---` Dividers | ✅ |

### UX & Polish
- **Conversion stats** — pages, words, reading time, headings, tables, code blocks, links detected
- **Conversion history** — last 5 conversions saved in `localStorage`, re-viewable and re-downloadable
- **Dark / Light mode toggle** — persists across sessions, full CSS variable theming
- **Copy to clipboard** — with orange toast notification
- **SweetAlert2** — fully themed to match Folio's dark aesthetic
- **Grain overlay** — subtle texture for depth
- **Responsive design** — works on mobile, tablet, and desktop

---

## ✦ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| Vite 6 | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| `react-markdown` | Markdown rendering |
| `remark-gfm` | GitHub Flavored Markdown support |
| `react-syntax-highlighter` | Code block syntax highlighting |
| `sweetalert2` | Themed alert dialogs |
| `axios` | HTTP client for backend API |

---

## ✦ Project Structure

```
folio_frontend/
├── index.html                    # Entry point with Google Fonts
├── vite.config.js                # Vite + Tailwind v4 plugin
├── package.json
└── src/
    ├── main.jsx                  # React root
    ├── App.jsx                   # Root layout, hero, steps, stats strip
    ├── index.css                 # CSS variables (dark/light), global styles,
    │                             # Tailwind import, SweetAlert2 theme,
    │                             # Markdown styles, animations
    ├── components/
    │   ├── Header.jsx            # Logo, badges, theme toggle
    │   ├── Footer.jsx            # Tech credits
    │   ├── DropZone.jsx          # Drag & drop with corner accents
    │   ├── FileInfo.jsx          # Selected file name + size
    │   ├── LoadingOverlay.jsx    # Animated scan-line loading state
    │   ├── MarkdownPreview.jsx   # 4-mode preview + stats + actions
    │   └── ConversionHistory.jsx # localStorage history panel
    ├── hooks/
    │   └── useConverter.js       # All state, conversion logic,
    │                             # history, theme, SweetAlert config
    └── utils/
        └── api.js                # Axios client, convertPdfToMarkdown(),
                                  # downloadMarkdown()
```

---

## ✦ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- [Folio Backend](https://github.com/darksoul-atik/Folio_pdf2md_server) running

### Installation

```bash
# Clone the repository
git clone https://github.com/darksoul-atik/Folio_pdf2md.git
cd Folio_pdf2md

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:8000/api
```

For production, replace with your deployed backend URL:
```env
VITE_API_URL=https://folio-backend-8t8a.onrender.com/api
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

> Make sure the backend is running at `http://localhost:8000` before starting the frontend.

### Building for Production

```bash
npm run build
```

Output goes to `dist/`.

---

## ✦ Deployment (Firebase Hosting)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Build
npm run build

# Initialize (first time only)
firebase init
# → Select: Hosting
# → Public directory: dist
# → Single-page app: Yes
# → Overwrite index.html: No

# Deploy
firebase deploy
```

Live at → [https://folio-pdf2md.web.app](https://folio-pdf2md.web.app)

---

## ✦ Design System

### Colors
| Variable | Dark | Light | Usage |
|----------|------|-------|-------|
| `--bg` | `#0a0a0a` | `#f5f2eb` | Page background |
| `--surface` | `#111111` | `#ffffff` | Card backgrounds |
| `--surface2` | `#141414` | `#edeae2` | Nested surfaces |
| `--border` | `#2a2a2a` | `#d6d2c8` | All borders |
| `--accent` | `#ff5c00` | `#ff5c00` | Orange accent (constant) |
| `--text-on-dark` | `#e8e4dc` | `#0e0e0e` | Primary text |

### Typography
| Font | Usage |
|------|-------|
| Bebas Neue | Display headings, hero text, step numbers |
| DM Sans | Body text, descriptions |
| DM Mono | Code, labels, badges, buttons |

---

## ✦ API Integration

The frontend communicates with one endpoint:

```
POST /api/convert
Content-Type: multipart/form-data
Body: { file: <PDF file> }
```

Response:
```json
{
  "success": true,
  "filename": "document.md",
  "markdown": "# Heading\n\nContent...",
  "word_count": 1240,
  "page_count": 5
}
```

---

## ✦ Backend Repository

> The FastAPI backend that powers the conversion engine.

🔗 [github.com/darksoul-atik/Folio_pdf2md_server](https://github.com/darksoul-atik/Folio_pdf2md_server)

---

## ✦ License

MIT — free to use, modify, and distribute.

---

<div align="center">
  <p>Built with React · Vite · Tailwind CSS v4</p>
  <p><strong>Folio</strong> — PDF to Markdown, the professional way.</p>
</div>