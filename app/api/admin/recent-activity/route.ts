import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

function timeAgo(dateStr: string) {
  const now = new Date()
  const d = new Date(dateStr)
  const diffMs = now.getTime() - d.getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `Il y a ${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Il y a ${hours}h`
  const days = Math.floor(hours / 24)
  return `Il y a ${days}j`
}

export async function GET() {
  try {
    const recentHires = (await executeQuery(
      `SELECT employee_id, first_name, last_name, hire_date
       FROM employees
       ORDER BY hire_date DESC
       LIMIT 5`,
    )) as any[]

    const recentJobs = (await executeQuery(
      `SELECT jh.employee_id, jh.start_date, jh.job_id, e.first_name, e.last_name
       FROM job_history jh
       JOIN employees e ON e.employee_id = jh.employee_id
       ORDER BY jh.start_date DESC
       LIMIT 5`,
    )) as any[]

    const activities = [
      ...recentHires.map((e) => ({
        type: "Nouvel employé",
        desc: `${e.first_name ?? ""} ${e.last_name ?? ""}`.trim(),
        time: timeAgo(e.hire_date),
      })),
      ...recentJobs.map((j) => ({
        type: "Changement de poste",
        desc: `${j.first_name ?? ""} ${j.last_name ?? ""} → ${j.job_id}`.trim(),
        time: timeAgo(j.start_date),
      })),
    ].slice(0, 8)

    return NextResponse.json(activities)
  } catch (error) {
    console.error("[v0] Error fetching recent activity:", error)
    return NextResponse.json({ error: "Failed to fetch recent activity" }, { status: 500 })
  }
}
