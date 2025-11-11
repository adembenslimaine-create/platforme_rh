import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const departments = (await executeQuery(
      `SELECT d.department_id, d.department_name, d.manager_id, COUNT(e.employee_id) as employee_count
       FROM departments d
       LEFT JOIN employees e ON d.department_id = e.department_id
       GROUP BY d.department_id`,
    )) as any[]

    return NextResponse.json(departments)
  } catch (error) {
    console.error("[v0] Error fetching departments:", error)
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 })
  }
}
