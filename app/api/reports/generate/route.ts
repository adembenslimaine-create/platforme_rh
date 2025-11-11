import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type') || 'payroll_monthly'
    let csv = 'type,date\n' + `${type},${new Date().toISOString()}\n`

    if (type === 'payroll_monthly') {
      const rows = (await executeQuery(
        `SELECT e.first_name, e.last_name, e.salary, e.commission_pct, d.department_name
         FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id`
      )) as any[]
      csv = 'Nom,Département,Base,Bonus,Net\n'
      csv += rows.map((r: any) => {
        const base = Number(r.salary) || 0
        const bonus = r.commission_pct ? base * Number(r.commission_pct) : 0
        const net = base + bonus
        const name = `${r.first_name ?? ''} ${r.last_name ?? ''}`.trim().replace(/,/g, ' ')
        const dept = (r.department_name ?? 'N/A').replace(/,/g, ' ')
        return `${name},${dept},${base.toFixed(2)},${bonus.toFixed(2)},${net.toFixed(2)}`
      }).join('\n')
    } else if (type === 'leaves') {
      const rows = (await executeQuery(
        `SELECT l.leave_type, l.start_date, l.end_date, l.days, l.status, e.first_name, e.last_name
         FROM leaves l JOIN employees e ON e.employee_id = l.employee_id`
      )) as any[]
      csv = 'Employé,Type,Début,Fin,Jours,Statut\n'
      csv += rows.map((r: any) => `${`${r.first_name ?? ''} ${r.last_name ?? ''}`.trim().replace(/,/g,' ')},${r.leave_type},${r.start_date},${r.end_date},${r.days},${r.status}`).join('\n')
    } else if (type === 'recruitment') {
      const rows = (await executeQuery(
        `SELECT jp.title, c.name, c.status, c.applied_date FROM job_postings jp LEFT JOIN candidates c ON c.job_posting_id = jp.job_posting_id`
      )) as any[]
      csv = 'Offre,Candidat,Statut,Date\n'
      csv += rows.map((r: any) => `${(r.title||'').replace(/,/g,' ')},${(r.name||'').replace(/,/g,' ')},${r.status||''},${r.applied_date||''}`).join('\n')
    }

    return new NextResponse(csv, { headers: { 'Content-Type':'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${type}.csv"` } })
  } catch (error) {
    console.error('[v0] Error generating report:', error)
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}
