import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const payrollData = (await executeQuery(
      `SELECT e.employee_id, e.first_name, e.last_name, e.salary, e.commission_pct,
              d.department_name, j.job_title
       FROM employees e
       LEFT JOIN departments d ON e.department_id = d.department_id
       LEFT JOIN jobs j ON e.job_id = j.job_id`,
    )) as any[]

    const totalPayroll = payrollData.reduce((sum, emp) => {
      const baseSalary = Number(emp.salary) || 0
      // commission_pct is a fraction (e.g., 0.20 for 20%) in given schema
      const commission = emp.commission_pct ? baseSalary * Number(emp.commission_pct) : 0
      return sum + baseSalary + commission
    }, 0)

    return NextResponse.json({ payrollData, totalPayroll, currency: "TND" })
  } catch (error) {
    console.error("[v0] Error fetching payroll:", error)
    return NextResponse.json({ error: "Failed to fetch payroll" }, { status: 500 })
  }
}
