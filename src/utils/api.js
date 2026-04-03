import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 min — large PDFs can take time
});

/**
 * Converts a PDF file to Markdown via the backend API.
 * @param {File} file - The PDF file object
 * @returns {Promise<{markdown: string, filename: string, wordCount: number, pageCount: number}>}
 */
export async function convertPdfToMarkdown(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/convert", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const data = response.data;
  return {
    markdown: data.markdown,
    filename: data.filename,
    wordCount: data.word_count,
    pageCount: data.page_count,
  };
}

/**
 * Downloads the converted Markdown as a .md file.
 * @param {string} markdownText
 * @param {string} filename
 */
export function downloadMarkdown(markdownText, filename) {
  const blob = new Blob([markdownText], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default apiClient;
