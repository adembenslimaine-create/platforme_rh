"use client"

import { useEffect, useState } from "react"

export default function EmployeeAbsencesPage() {
  const [absences, setAbsences] = useState([
    { id: 1, date: "2025-09-15", reason: "Maladie", duration: "1 jour", status: "Justifiée" },
    { id: 2, date: "2025-09-10", reason: "Appointment médical", duration: "0.5 jour", status: "Justifiée" },
    { id: 3, date: "2025-09-05", reason: "Raison personnelle", duration: "1 jour", status: "Non justifiée" },
  ])

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mes Absences</h1>
        <p className="text-foreground-muted mt-2">Historique de vos absences</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Total Absences</p>
          <p className="text-3xl font-bold text-foreground">3</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Justifiées</p>
          <p className="text-3xl font-bold text-success">2</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Non Justifiées</p>
          <p className="text-3xl font-bold text-error">1</p>
        </div>
      </div>

      {/* Absences Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-variant border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-bold text-foreground">Date</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Motif</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Durée</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Statut</th>
              </tr>
            </thead>
            <tbody>
              {absences.map((abs) => (
                <tr key={abs.id} className="border-b border-border-light hover:bg-surface-variant transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{abs.date}</td>
                  <td className="px-6 py-4 text-foreground">{abs.reason}</td>
                  <td className="px-6 py-4 text-foreground">{abs.duration}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        abs.status === "Justifiée" ? "bg-success/20 text-success" : "bg-error/20 text-error"
                      }`}
                    >
                      {abs.status}
                    </span>
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
