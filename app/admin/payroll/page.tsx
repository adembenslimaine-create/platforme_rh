"use client"

import { useEffect, useMemo, useState } from "react"

type PayrollRow = {
  employee_id: number
  first_name: string
  last_name: string
  department_name: string | null
  job_title: string | null
  salary: number
  commission_pct: number | null
}

export default function PayrollPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  )
  const [rows, setRows] = useState<PayrollRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/payroll")
        const data = await res.json()
        setRows(data.payrollData || [])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatted = useMemo(
    () =>
      rows.map((r) => {
        const base = Number(r.salary) || 0
        const bonus = r.commission_pct ? base * Number(r.commission_pct) : 0
        const deductions = 0
        const net = base + bonus - deductions
        return {
          name: `${r.first_name ?? ""} ${r.last_name ?? ""}`.trim(),
          department: r.department_name ?? "N/A",
          baseSalary: base,
          bonus,
          deductions,
          netSalary: net,
          status: "Payé",
        }
      }),
    [rows]
  )

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion de Paie</h1>
        <p className="text-foreground-muted mt-2">Gérez les salaires et la paie de vos employés</p>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="bg-success text-white font-medium py-2 px-6 rounded-lg hover:bg-success/90 transition-colors">
          Générer Paie
        </button>
        <button onClick={async () => {
          try {
            const res = await fetch('/api/payroll/export')
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'payroll.pdf'
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
          } catch {}
        }} className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">
          Exporter PDF
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6">Chargement...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-surface-variant border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-bold text-foreground">Nom</th>
                  <th className="text-left px-6 py-4 font-bold text-foreground">Département</th>
                  <th className="text-right px-6 py-4 font-bold text-foreground">Salaire de Base</th>
                  <th className="text-right px-6 py-4 font-bold text-foreground">Bonus</th>
                  <th className="text-right px-6 py-4 font-bold text-foreground">Déductions</th>
                  <th className="text-right px-6 py-4 font-bold text-foreground">Salaire Net</th>
                  <th className="text-left px-6 py-4 font-bold text-foreground">Statut</th>
                  <th className="text-left px-6 py-4 font-bold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formatted.map((item, idx) => (
                  <tr key={idx} className="border-b border-border-light hover:bg-surface-variant transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                    <td className="px-6 py-4 text-foreground">{item.department}</td>
                    <td className="px-6 py-4 text-right text-foreground">{item.baseSalary.toLocaleString()} TND</td>
                    <td className="px-6 py-4 text-right text-success font-medium">{item.bonus.toLocaleString()} TND</td>
                    <td className="px-6 py-4 text-right text-error font-medium">{item.deductions.toLocaleString()} TND</td>
                    <td className="px-6 py-4 text-right font-bold text-primary">{item.netSalary.toLocaleString()} TND</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success`}>
                        Payé
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="px-3 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 text-xs font-medium">
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
