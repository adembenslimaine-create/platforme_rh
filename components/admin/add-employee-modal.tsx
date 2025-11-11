"use client"

import type React from "react"

import { useState } from "react"

interface AddEmployeeModalProps {
  onClose: () => void
  onAdd: (employee: any) => void
}

export default function AddEmployeeModal({ onClose, onAdd }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    hire_date: "",
    job_id: "IT_PROG",
    salary: "",
    department_id: "60",
    commission_pct: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.hire_date || !formData.salary) {
      setError("Veuillez remplir tous les champs obligatoires")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Erreur lors de l'ajout de l'employé")
      }

      onAdd(formData)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Ajouter un Employé</h2>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="first_name"
            placeholder="Prénom"
            value={formData.first_name}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Nom"
            value={formData.last_name}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Téléphone"
            value={formData.phone_number}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="date"
            name="hire_date"
            value={formData.hire_date}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salaire (TND)"
            value={formData.salary}
            onChange={handleChange}
            className="input-field"
            required
          />
          <select name="job_id" value={formData.job_id} onChange={handleChange} className="input-field">
            <option value="IT_PROG">Programmeur</option>
            <option value="SA_REP">Commercial</option>
            <option value="FI_ACCOUNT">Comptable</option>
          </select>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Annuler
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? "Ajout..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
