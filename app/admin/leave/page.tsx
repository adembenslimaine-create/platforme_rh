"use client"

import { useEffect, useState } from "react"

export default function LeavePage() {
  const [leaveRequests, setLeaveRequests] = useState<any[]>([])

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch('/api/leaves', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ leave_id: id, status }) })
      setLeaveRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch {}
  }

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/leaves")
        const data = await res.json()
        setLeaveRequests(Array.isArray(data) ? data : [])
      } catch {
        setLeaveRequests([])
      }
    }
    load()
  }, [])

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion des Congés & Absences</h1>
        <p className="text-foreground-muted mt-2">Approuvez et gérez les demandes de congés</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Total Demandes</p>
          <p className="text-3xl font-bold text-foreground">24</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Approuvées</p>
          <p className="text-3xl font-bold text-success">18</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">En Attente</p>
          <p className="text-3xl font-bold text-warning">5</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Rejetées</p>
          <p className="text-3xl font-bold text-error">1</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-variant border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-bold text-foreground">Employé</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Type</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Début</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Fin</th>
                <th className="text-center px-6 py-4 font-bold text-foreground">Jours</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Statut</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((req) => (
                <tr key={req.id} className="border-b border-border-light hover:bg-surface-variant transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{req.employee}</td>
                  <td className="px-6 py-4 text-foreground">{req.type}</td>
                  <td className="px-6 py-4 text-foreground text-sm">{req.startDate}</td>
                  <td className="px-6 py-4 text-foreground text-sm">{req.endDate}</td>
                  <td className="px-6 py-4 text-center font-bold text-foreground">{req.days}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${req.status === "Approuvé" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => updateStatus(req.id, 'Approuvé')} className="px-3 py-1 bg-success/20 text-success rounded hover:bg-success/30 text-xs font-medium">
                      Approuver
                    </button>
                    <button onClick={() => updateStatus(req.id, 'Rejeté')} className="px-3 py-1 bg-error/20 text-error rounded hover:bg-error/30 text-xs font-medium">
                      Rejeter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
