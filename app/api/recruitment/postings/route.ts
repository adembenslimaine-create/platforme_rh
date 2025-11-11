import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const title = (data.title || "Nouveau Poste").toString()
    const department_id = Number(data.department_id ?? 60)
    const status = (data.status || "Open").toString()

    await executeQuery(
      "INSERT INTO job_postings (title, department_id, status, created_at) VALUES (?, ?, ?, CURRENT_DATE)",
      [title, department_id, status]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error creating job posting:", error)
    return NextResponse.json({ error: "Failed to create job posting" }, { status: 500 })
  }
}
