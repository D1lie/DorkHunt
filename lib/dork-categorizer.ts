export type DorkCategory = 
  | "PII"
  | "Sensitive Data"
  | "Specific URLs"
  | "API"
  | "Admin/Login"
  | "Config Files"
  | "Public Keys"
  | "Cloud Infrastructure"
  | "CI/CD & DevOps"
  | "Social Media & OAuth"
  | "Log Files"
  | "Database Backups"
  | "Network Devices"
  | "Other"

const CATEGORY_PATTERNS: Record<DorkCategory, string[]> = {
  "PII": [
    "email", "phone", "ssn", "social security", "aadhaar", "passport",
    "@gmail", "@yahoo", "@hotmail", "@aol"
  ],
  "Sensitive Data": [
    "password", "passwd", "pwd", "secret", "token", "key", "credential",
    "api_key", "access_key", "private_key", "aws_secret", "database"
  ],
  "Specific URLs": [
    "security.txt", "disclosure", "responsible", "reward", "bounty", "vulnerability"
  ],
  "API": [
    "api", "swagger", "graphql", "rest", "endpoint", "apidocs"
  ],
  "Admin/Login": [
    "admin", "login", "signin", "sign in", "auth", "portal", "dashboard"
  ],
  "Config Files": [
    ".env", "config", ".ini", ".conf", ".cfg", ".yaml", ".yml", ".json", ".xml", "configuration"
  ],
  "Public Keys": [
    "id_rsa", "id_dsa", ".pem", ".ppk", "private key", "ssh", "pgp", "gpg"
  ],
  "Cloud Infrastructure": [
    "aws_", "amazon", "s3", "azure", "google_cloud", "gcp", "digitalocean",
    "alicloud", "cloud_watch", "amazonaws"
  ],
  "CI/CD & DevOps": [
    "docker", "travis", "jenkins", "ansible", "gitlab", "circleci",
    "deploy_", "pipeline", "master.key", "deployment"
  ],
  "Social Media & OAuth": [
    "facebook", "twitter", "github", "slack", "okta", "firebase", "oauth",
    "auth_token", "bearer", "jwt", "mailchimp", "mailgun", "sendgrid", "twilio", "stripe"
  ],
  "Log Files": [
    ".log", ".history", "bash_history", "sh_history", "zsh_history",
    "syslog", "access_log", "error_log", "putty"
  ],
  "Database Backups": [
    ".sql", ".mdb", ".ora", "mysql_dump", "database_backup", "backup.sql", "dump.sql"
  ],
  "Network Devices": [
    "vpn", "ilo", "camera", "router", "gateway", "firewall", "pulse secure", "viewerframe"
  ],
  "Other": []
}

export function categorizeDork(dork: string): DorkCategory {
  const lower = dork.toLowerCase()
  
  for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    if (category === "Other") continue
    
    if (patterns.some(pattern => lower.includes(pattern))) {
      return category as DorkCategory
    }
  }
  
  return "Other"
}

export function getDorkCategories(dorks: string[]): Map<DorkCategory, number> {
  const counts = new Map<DorkCategory, number>()
  
  dorks.forEach((dork) => {
    const category = categorizeDork(dork)
    counts.set(category, (counts.get(category) || 0) + 1)
  })
  
  return counts
}
