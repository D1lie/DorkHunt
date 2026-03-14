export function normalizeTargetDomain(input: string): string {
  if (!input) return ""
  
  let domain = input.trim()
  
  // Remove protocol
  domain = domain.replace(/^https?:\/\//i, "")
  
  // Remove trailing slash
  domain = domain.replace(/\/$/, "")
  
  // Remove path
  domain = domain.split("/")[0]
  
  // Remove port if present
  domain = domain.split(":")[0]
  
  return domain
}

export function isValidDomain(domain: string): boolean {
  if (!domain) return false
  
  // Basic domain validation
  const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i
  return domainRegex.test(domain)
}

export function applyTargetToDork(dork: string, targetDomain: string): string {
  if (!targetDomain || !dork) return dork
  
  const normalized = normalizeTargetDomain(targetDomain)
  if (!isValidDomain(normalized)) return dork
  
  // Check if dork already has site: operator
  const siteRegex = /site:([^\s]+)/i
  
  if (siteRegex.test(dork)) {
    // Replace existing site: operator
    return dork.replace(siteRegex, `site:${normalized}`)
  } else {
    // Prepend site: operator
    return `site:${normalized} ${dork}`
  }
}

export function applyTargetToDorks(dorks: string[], targetDomain: string): string[] {
  if (!targetDomain) return dorks
  return dorks.map((dork) => applyTargetToDork(dork, targetDomain))
}

export function removeTargetFromDork(dork: string): string {
  // Remove site: operator from the beginning
  return dork.replace(/^site:[^\s]+\s+/, "")
}
