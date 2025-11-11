import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const employeeCount = (await executeQuery("SELECT COUNT(*) as count FROM employees")) as any[]

    const payrollData = (await executeQuery("SELECT SUM(salary) as total FROM employees")) as any[]

    return NextResponse.json({
      totalEmployees: employeeCount[0]?.count || 0,
      monthlyPayroll: payrollData[0]?.total || 0,
      approvedLeaves: 12,
      pendingRecruitement: 5,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
