"use client"

import { useEffect, useState } from "react"

export default function EmployeeChart() {
  const [data, setData] = useState<{ dept: string; count: number }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/departments")
        const depts = await res.json()
        setData(
          depts.map((d: any) => ({ dept: d.department_name, count: Number(d.employee_count) || 0 }))
        )
      } catch (e) {
        setData([])
      }
    }
    fetchData()
  }, [])

  const max = Math.max(1, ...data.map((d) => d.count))

  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
      <h3 className="text-lg font-bold text-foreground mb-4">Distribution par Département</h3>
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-sm text-foreground-muted">Aucune donnée</div>
        ) : (
          data.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{item.dept}</span>
                <span className="text-sm font-bold text-foreground-muted">{item.count}</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                <div
                  className={`bg-primary h-full rounded-full transition-all duration-300`}
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
