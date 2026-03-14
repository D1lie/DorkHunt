import { promises as fs } from "fs"
import path from "path"

async function loadDorksFromFile(filename: string): Promise<string[]> {
  try {
    const filePath = path.join(process.cwd(), "data", filename)
    const content = await fs.readFile(filePath, "utf-8")
    
    const dorks = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    
    return Array.from(new Set(dorks))
  } catch (error) {
    console.error(`Error loading dorks from ${filename}:`, error)
    return []
  }
}

export async function loadBugBountyDorks(): Promise<string[]> {
  return loadDorksFromFile("bugbountydorks.txt")
}

export async function loadDefaultDorks(): Promise<string[]> {
  return loadDorksFromFile("Dorks.txt")
}
