import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const employees = (await executeQuery(
      `SELECT e.employee_id, e.first_name, e.last_name, e.email, e.phone_number, 
              e.hire_date, e.job_id, e.salary, e.department_id, e.commission_pct,
              j.job_title, d.department_name
       FROM employees e
       LEFT JOIN jobs j ON e.job_id = j.job_id
       LEFT JOIN departments d ON e.department_id = d.department_id
       LIMIT 100`,
    )) as any[]

    return NextResponse.json(employees)
  } catch (error) {
    console.error("[v0] Error fetching employees:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}

async function resolveDepartmentId(input: any): Promise<number | null> {
  const name = input?.department ?? input?.department_name
  const id = input?.department_id
  if (typeof id === "number") return id
  if (typeof name === "string" && name.trim()) {
    const rows = (await executeQuery(
      "SELECT department_id FROM departments WHERE department_name = ? LIMIT 1",
      [name.trim()],
    )) as any[]
    if (rows.length) return Number(rows[0].department_id)
  }
  return null
}

async function resolveJobId(input: any): Promise<string> {
  const byId = input?.job_id
  if (typeof byId === "string" && byId.trim()) return byId.trim()
  const jt = input?.job_title ?? input?.job
  if (typeof jt === "string" && jt.trim()) {
    const rows = (await executeQuery(
      "SELECT job_id FROM jobs WHERE job_title = ? LIMIT 1",
      [jt.trim()],
    )) as any[]
    if (rows.length) return String(rows[0].job_id)
  }
  // Fallback to a valid job to satisfy NOT NULL constraint
  return "IT_PROG"
}

async function nextEmployeeId(): Promise<number> {
  const rows = (await executeQuery("SELECT COALESCE(MAX(employee_id)+1, 1000) AS next FROM employees")) as any[]
  return Number(rows[0]?.next ?? 1000)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const department_id = await resolveDepartmentId(data)
    const job_id = await resolveJobId(data)
    const employee_id = Number(data.employee_id ?? (await nextEmployeeId()))

    const params = [
      employee_id,
      data.first_name ?? data.firstName ?? null,
      data.last_name ?? data.lastName ?? null,
      data.email ?? null,
      data.phone_number ?? data.phone ?? null,
      data.hire_date ?? data.hireDate ?? null,
      job_id,
      data.salary != null ? Number(data.salary) : null,
      department_id,
      data.commission_pct != null ? Number(data.commission_pct) : null,
    ]

    await executeQuery(
      `INSERT INTO employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, department_id, commission_pct) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params,
    )

    return NextResponse.json({ success: true, employee_id }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating employee:", error)
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json()
    const id = Number(data.employee_id ?? data.id)
    if (!id) return NextResponse.json({ error: "employee_id is required" }, { status: 400 })

    // Prepare field updates with mapping and resolution
    const sets: string[] = []
    const values: any[] = []

    const mapFields: Record<string, any> = {
      first_name: data.first_name ?? data.firstName,
      last_name: data.last_name ?? data.lastName,
      email: data.email,
      phone_number: data.phone_number ?? data.phone,
      hire_date: data.hire_date ?? data.hireDate,
      salary: data.salary != null ? Number(data.salary) : undefined,
      commission_pct: data.commission_pct != null ? Number(data.commission_pct) : undefined,
    }

    for (const [k, v] of Object.entries(mapFields)) {
      if (v !== undefined) {
        sets.push(`${k} = ?`)
        values.push(v)
      }
    }

    // Resolve optional job/department updates
    if (data.job_id || data.job || data.job_title) {
      const job_id = await resolveJobId(data)
      sets.push("job_id = ?")
      values.push(job_id)
    }
    if (data.department_id || data.department || data.department_name) {
      const department_id = await resolveDepartmentId(data)
      sets.push("department_id = ?")
      values.push(department_id)
    }

    if (sets.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 })

    values.push(id)
    await executeQuery(`UPDATE employees SET ${sets.join(", ")} WHERE employee_id = ?`, values)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating employee:", error)
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 })
  }
}
