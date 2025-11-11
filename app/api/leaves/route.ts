import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const rows = (await executeQuery(
      `SELECT l.leave_id, l.leave_type, l.start_date, l.end_date, l.days, l.status,
              e.first_name, e.last_name
       FROM leaves l
       JOIN employees e ON e.employee_id = l.employee_id
       ORDER BY l.start_date DESC
       LIMIT 100`
    )) as any[]

    const data = rows.map((r) => ({
      id: r.leave_id,
      employee: `${r.first_name ?? ""} ${r.last_name ?? ""}`.trim(),
      type: r.leave_type,
      startDate: r.start_date,
      endDate: r.end_date,
      days: Number(r.days) || 0,
      status: r.status,
    }))

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching leaves:", error)
    return NextResponse.json({ error: "Failed to fetch leaves" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json()
    const id = Number(data.leave_id ?? data.id)
    const status = data.status
    if (!id || !status) {
      return NextResponse.json({ error: "leave_id and status required" }, { status: 400 })
    }
    await executeQuery("UPDATE leaves SET status = ? WHERE leave_id = ?", [status, id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating leave:", error)
    return NextResponse.json({ error: "Failed to update leave" }, { status: 500 })
  }
}
