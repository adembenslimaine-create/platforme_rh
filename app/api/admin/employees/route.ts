import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const employees = await executeQuery("SELECT * FROM employees LIMIT 100")
    return NextResponse.json(employees)
  } catch (error) {
    console.error("Error fetching employees:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const result = await executeQuery(
      "INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_id, salary, department_id, commission_pct) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.first_name,
        data.last_name,
        data.email,
        data.phone_number,
        data.hire_date,
        data.job_id,
        data.salary,
        data.department_id,
        data.commission_pct || null,
      ],
    )

    return NextResponse.json({ success: true, id: (result as any).insertId })
  } catch (error) {
    console.error("Error creating employee:", error)
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 })
  }
}
