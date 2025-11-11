"use client"

import { useState } from "react"

interface LeaveRequest {
  id: number
  type: string
  fromDate: string
  toDate: string
  days: number
  reason: string
  status: "approved" | "pending" | "rejected"
}

export default function LeavesPage() {
  const [leaveBalance] = useState({
    annual: 20,
    sick: 5,
    unpaid: 0,
  })

  const [leaves] = useState<LeaveRequest[]>([
    {
      id: 1,
      type: "Congé annuel",
      fromDate: "2024-01-15",
      toDate: "2024-01-20",
      days: 5,
      reason: "Vacances en famille",
      status: "approved",
    },
    {
      id: 2,
      type: "Congé de maladie",
      fromDate: "2024-01-10",
      toDate: "2024-01-12",
      days: 2,
      reason: "Grippe",
      status: "approved",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newLeave, setNewLeave] = useState({
    type: "annual",
    fromDate: "",
    toDate: "",
    reason: "",
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Mes Congés</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          + Demander un Congé
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-600">Congés Annuels</p>
          <p className="text-2xl font-bold text-blue-600">{leaveBalance.annual} jours</p>
        </div>
        <div className="card bg-green-50 border-green-200">
          <p className="text-sm text-gray-600">Congé de Maladie</p>
          <p className="text-2xl font-bold text-green-600">{leaveBalance.sick} jours</p>
        </div>
        <div className="card bg-orange-50 border-orange-200">
          <p className="text-sm text-gray-600">Congé Non Payé</p>
          <p className="text-2xl font-bold text-orange-600">{leaveBalance.unpaid} jours</p>
        </div>
      </div>

      {showForm && (
        <div className="card border-2 border-blue-200">
          <h3 className="text-lg font-semibold mb-4">Nouvelle Demande de Congé</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de Congé</label>
                <select className="input-field">
                  <option>Congé annuel</option>
                  <option>Congé de maladie</option>
                  <option>Congé non payé</option>
                </select>
              </div>
              <div></div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Du</label>
                <input type="date" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Au</label>
                <input type="date" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Raison</label>
                <textarea
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Expliquez la raison de votre demande..."
                ></textarea>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                Soumettre
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Historique des Demandes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Du</th>
                <th className="px-4 py-3 text-left">Au</th>
                <th className="px-4 py-3 text-left">Jours</th>
                <th className="px-4 py-3 text-left">Raison</th>
                <th className="px-4 py-3 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{leave.type}</td>
                  <td className="px-4 py-3 text-sm">{leave.fromDate}</td>
                  <td className="px-4 py-3 text-sm">{leave.toDate}</td>
                  <td className="px-4 py-3">{leave.days} j</td>
                  <td className="px-4 py-3 text-sm">{leave.reason}</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Approuvée</span>
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
