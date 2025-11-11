"use client"

import type React from "react"

import { useState } from "react"

interface AddEmployeeModalProps {
  onClose: () => void
  onAdd: (employee: any) => void
}

export default function AddEmployeeModal({ onClose, onAdd }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    job: "",
    salary: "",
    hireDate: "",
    manager: "",
    country: "Tunisia",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      job: "",
      salary: "",
      hireDate: "",
      manager: "",
      country: "Tunisia",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-white">
          <h2 className="text-2xl font-bold text-foreground">Ajouter un Nouvel Employé</h2>
          <button onClick={onClose} className="text-2xl text-foreground-muted hover:text-foreground">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Prénom *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nom *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Téléphone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Département *</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Sélectionner</option>
                <option value="IT">IT</option>
                <option value="RH">RH</option>
                <option value="Ventes">Ventes</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            {/* Job */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Poste *</label>
              <input
                type="text"
                value={formData.job}
                onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Salaire (TND) *</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Hire Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date d'embauche *</label>
              <input
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Manager */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Gestionnaire</label>
              <select
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Aucun</option>
                <option value="1">Ahmed Ben Ali</option>
                <option value="2">Fatima Khlifi</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Pays</label>
              <input
                type="text"
                value={formData.country}
                disabled
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface-variant text-foreground-muted"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-surface-variant transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Ajouter l'Employé
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
