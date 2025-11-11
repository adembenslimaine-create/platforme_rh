import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const rows = (await executeQuery(
      `SELECT e.first_name, e.last_name, e.salary, e.commission_pct, d.department_name
       FROM employees e
       LEFT JOIN departments d ON e.department_id = d.department_id`
    )) as any[]
    let csv = 'Nom,Département,Base,Bonus,Net\n'
    csv += rows.map((r:any) => {
      const base = Number(r.salary)||0
      const bonus = r.commission_pct ? base*Number(r.commission_pct):0
      const net = base+bonus
      return `${`${r.first_name??''} ${r.last_name??''}`.trim().replace(/,/g,' ')},${(r.department_name??'N/A').replace(/,/g,' ')},${base.toFixed(2)},${bonus.toFixed(2)},${net.toFixed(2)}`
    }).join('\n')
    return new NextResponse(csv, { headers: { 'Content-Type':'text/csv; charset=utf-8', 'Content-Disposition':'attachment; filename="payroll.csv"' } })
  } catch (error) {
    console.error('[v0] Error exporting payroll CSV:', error)
    return NextResponse.json({ error:'Failed to export payroll' }, { status:500 })
  }
}
