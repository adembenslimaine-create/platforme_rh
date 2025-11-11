"use client"

import type React from "react"
import { useState, useEffect } from "react"

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    maritalStatus: "",
    department: "",
    job: "",
    hireDate: "",
    employeeId: "",
    manager: "",
    address: "",
    city: "",
    country: "Tunisie",
    postalCode: "",
    cin: "",
    passport: "",
    bankAccount: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  useEffect(() => {
    setIsClient(true)
    const fetchProfile = async () => {
      try {
        const token = window.localStorage.getItem("authToken")
        if (!token) {
          setLoading(false)
          return
        }

        const res = await fetch("/api/employees")
        const employees = await res.json()

        if (employees.length > 0) {
          const emp = employees[0]
          setProfile({
            firstName: emp.first_name || "",
            lastName: emp.last_name || "",
            email: emp.email || "",
            phone: emp.phone_number || "",
            dateOfBirth: "",
            placeOfBirth: "",
            nationality: "Tunisienne",
            maritalStatus: "",
            department: emp.department_name || "",
            job: emp.job_title || "",
            hireDate: emp.hire_date || "",
            employeeId: emp.employee_id || "",
            manager: "",
            address: "",
            city: "Tunis",
            country: "Tunisie",
            postalCode: "",
            cin: "",
            passport: "",
            bankAccount: "",
            emergencyContact: "",
            emergencyPhone: "",
          })
        }
      } catch (error) {
        console.error("[v0] Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsEditing(false)
    // In production, send updated profile to backend
  }

  if (!isClient || loading) return <div className="p-8 text-center">Chargement...</div>

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
          <p className="text-foreground-muted mt-2">Consultez vos informations personnelles et professionnelles</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`font-medium py-2 px-6 rounded-lg transition-colors ${
            isEditing ? "bg-error text-white hover:bg-error/90" : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {isEditing ? "Annuler" : "Modifier"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="mb-8 pb-8 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Informations Personnelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Prénom", name: "firstName" },
              { label: "Nom", name: "lastName" },
              { label: "Email", name: "email" },
              { label: "Téléphone", name: "phone" },
              { label: "Date de Naissance", name: "dateOfBirth", type: "date" },
              { label: "Lieu de Naissance", name: "placeOfBirth" },
              { label: "Nationalité", name: "nationality" },
              { label: "État Civil", name: "maritalStatus" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={profile[field.name as keyof typeof profile]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border border-border rounded-lg ${
                    isEditing
                      ? "focus:outline-none focus:ring-2 focus:ring-primary"
                      : "bg-surface-variant text-foreground-muted"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 pb-8 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Informations Professionnelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Numéro Employé", name: "employeeId" },
              { label: "Département", name: "department" },
              { label: "Poste", name: "job" },
              { label: "Date d'embauche", name: "hireDate", type: "date" },
              { label: "Responsable", name: "manager" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={profile[field.name as keyof typeof profile]}
                  onChange={handleChange}
                  disabled={!isEditing && field.name !== "phone"}
                  className={`w-full px-4 py-2 border border-border rounded-lg ${
                    isEditing && field.name !== "employeeId" && field.name !== "department"
                      ? "focus:outline-none focus:ring-2 focus:ring-primary"
                      : "bg-surface-variant text-foreground-muted"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 pb-8 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Adresse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Adresse", name: "address" },
              { label: "Ville", name: "city" },
              { label: "Code Postal", name: "postalCode" },
              { label: "Pays", name: "country" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={profile[field.name as keyof typeof profile]}
                  onChange={handleChange}
                  disabled={!isEditing || field.name === "country"}
                  className={`w-full px-4 py-2 border border-border rounded-lg ${
                    isEditing && field.name !== "country"
                      ? "focus:outline-none focus:ring-2 focus:ring-primary"
                      : "bg-surface-variant text-foreground-muted"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 pb-8 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Pièces d'Identité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Numéro CIN", name: "cin" },
              { label: "Numéro Passeport", name: "passport" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={profile[field.name as keyof typeof profile]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border border-border rounded-lg ${
                    isEditing
                      ? "focus:outline-none focus:ring-2 focus:ring-primary"
                      : "bg-surface-variant text-foreground-muted"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 pb-8 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Informations Bancaires</h2>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Compte Bancaire</label>
            <input
              type="text"
              name="bankAccount"
              value={profile.bankAccount}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-border rounded-lg ${
                isEditing
                  ? "focus:outline-none focus:ring-2 focus:ring-primary"
                  : "bg-surface-variant text-foreground-muted"
              }`}
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Contact d'Urgence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Nom", name: "emergencyContact" },
              { label: "Téléphone", name: "emergencyPhone" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={profile[field.name as keyof typeof profile]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border border-border rounded-lg ${
                    isEditing
                      ? "focus:outline-none focus:ring-2 focus:ring-primary"
                      : "bg-surface-variant text-foreground-muted"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-4 mt-8 pt-8 border-t border-border">
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 px-6 py-2 border border-border text-foreground rounded-lg hover:bg-surface-variant transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Enregistrer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
