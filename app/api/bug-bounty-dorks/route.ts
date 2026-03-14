import { NextResponse } from "next/server"
import { loadBugBountyDorks } from "@/lib/dorks.server"

export async function GET() {
  try {
    const dorks = await loadBugBountyDorks()
    
    return NextResponse.json({
      dorks,
      count: dorks.length,
    })
  } catch (error) {
    console.error("Error loading bug bounty dorks:", error)
    return NextResponse.json(
      { error: "Failed to load dorks" },
      { status: 500 }
    )
  }
}

export const dynamic = "force-dynamic"
