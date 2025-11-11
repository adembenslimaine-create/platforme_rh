"use client"

import { useState } from "react"

export default function EmployeeLeavePage() {
  const [showNewRequest, setShowNewRequest] = useState(false)

  const leaveRequests = [
    {
      id: 1,
      type: "Congé Annuel",
      startDate: "2025-10-01",
      endDate: "2025-10-10",
      days: 10,
      status: "Approuvé",
      requestDate: "2025-09-15",
    },
    {
      id: 2,
      type: "Congé Maladie",
      startDate: "2025-09-20",
      endDate: "2025-09-22",
      days: 3,
      status: "En attente",
      requestDate: "2025-09-19",
    },
  ]

  const leaveBalance = {
    annual: { used: 15, total: 30 },
    sick: { used: 3, total: 7 },
    maternity: { used: 0, total: 120 },
  }

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes Congés</h1>
          <p className="text-foreground-muted mt-2">Gérez vos demandes de congés</p>
        </div>
        <button
          onClick={() => setShowNewRequest(true)}
          className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors"
        >
          + Nouvelle Demande
        </button>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Congé Annuel", used: leaveBalance.annual.used, total: leaveBalance.annual.total },
          { label: "Congé Maladie", used: leaveBalance.sick.used, total: leaveBalance.sick.total },
          { label: "Congé Maternité", used: leaveBalance.maternity.used, total: leaveBalance.maternity.total },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6">
            <p className="text-foreground-muted text-sm font-medium">{item.label}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold text-foreground">{item.total - item.used}</p>
                <p className="text-xs text-foreground-muted">sur {item.total} jours</p>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.used / item.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-foreground-muted text-right">{item.used} utilisé</p>
            </div>
          </div>
        ))}
      </div>

      {/* Leave Requests */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Mes Demandes de Congés</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-variant border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-bold text-foreground">Type</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Début</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Fin</th>
                <th className="text-center px-6 py-4 font-bold text-foreground">Jours</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Demandé le</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Statut</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((req) => (
                <tr key={req.id} className="border-b border-border-light hover:bg-surface-variant transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{req.type}</td>
                  <td className="px-6 py-4 text-foreground text-sm">{req.startDate}</td>
                  <td className="px-6 py-4 text-foreground text-sm">{req.endDate}</td>
                  <td className="px-6 py-4 text-center font-bold text-foreground">{req.days}</td>
                  <td className="px-6 py-4 text-foreground text-sm">{req.requestDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === "Approuvé" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                      }`}
                    >
                      {req.status}
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
        </div>
      </div>

      {/* New Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-slide-in-right">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Nouvelle Demande</h2>
              <button onClick={() => setShowNewRequest(false)} className="text-2xl text-foreground-muted">
                ×
              </button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Type de Congé</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Congé Annuel</option>
                  <option>Congé Maladie</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date de Début</label>
                <input type="date" className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date de Fin</label>
                <input type="date" className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Motif</label>
                <textarea className="w-full px-4 py-2 border border-border rounded-lg" rows={3} />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewRequest(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-surface-variant"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
