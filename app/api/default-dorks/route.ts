import { NextResponse } from "next/server"
import { loadDefaultDorks } from "@/lib/dorks.server"

export async function GET() {
  try {
    const dorks = await loadDefaultDorks()
    
    return NextResponse.json({
      dorks,
      count: dorks.length,
    })
  } catch (error) {
    console.error("Error loading default dorks:", error)
    return NextResponse.json(
      { error: "Failed to load default dorks" },
      { status: 500 }
    )
  }
}

export const dynamic = "force-dynamic"
