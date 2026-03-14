export function exportDorksAsTxt(dorks: string[]): string {
  return dorks.join("\n")
}

export function exportDorksAsJson(dorks: string[]): string {
  return JSON.stringify(dorks, null, 2)
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function getTimestampedFilename(prefix: string, extension: string): string {
  const date = new Date()
  const timestamp = date.toISOString().split("T")[0]
  return `${prefix}-${timestamp}.${extension}`
}
