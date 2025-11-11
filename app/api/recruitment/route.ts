import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const rows = (await executeQuery(
      `SELECT c.candidate_id, c.name, c.status, c.applied_date, c.rating,
              jp.title as position
       FROM candidates c
       JOIN job_postings jp ON jp.job_posting_id = c.job_posting_id
       ORDER BY c.applied_date DESC
       LIMIT 100`
    )) as any[]

    const data = rows.map((r) => ({
      id: r.candidate_id,
      name: r.name,
      position: r.position,
      status: r.status,
      appliedDate: r.applied_date,
      rating: r.rating != null ? Number(r.rating) : null,
    }))

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching recruitment data:", error)
    return NextResponse.json({ error: "Failed to fetch recruitment data" }, { status: 500 })
  }
}
