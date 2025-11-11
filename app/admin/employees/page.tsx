"use client"

import { useState, useEffect } from "react"
import EmployeeTable from "@/components/admin/employees/employee-table"
import AddEmployeeModal from "@/components/admin/employees/add-employee-modal"

export default function EmployeesPage() {
  const [showModal, setShowModal] = useState(false)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees")
      const data = await res.json()

      const formattedEmployees = data.map((emp: any) => ({
        id: emp.employee_id,
        firstName: emp.first_name,
        lastName: emp.last_name,
        email: emp.email,
        department: emp.department_name || "N/A",
        job: emp.job_title || "N/A",
        salary: emp.salary,
        hireDate: emp.hire_date,
        status: "Actif",
      }))

      setEmployees(formattedEmployees)
    } catch (error) {
      console.error("[v0] Error fetching employees:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleAddEmployee = async (newEmployee: any) => {
    try {
      await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: newEmployee.firstName,
          last_name: newEmployee.lastName,
          email: newEmployee.email,
          phone_number: newEmployee.phone,
          hire_date: newEmployee.hireDate,
          salary: newEmployee.salary,
          // Flexible: API will resolve these
          department: newEmployee.department,
          job: newEmployee.job,
        })
      })
      await fetchEmployees()
      setShowModal(false)
    } catch (error) {
      console.error("[v0] Error adding employee:", error)
    }
  }

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Employés</h1>
          <p className="text-foreground-muted mt-2">Gérez tous les employés de votre organisation</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          + Ajouter un Employé
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Chercher un employé..."
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Tous les départements</option>
          <option>IT</option>
          <option>RH</option>
          <option>Ventes</option>
          <option>Finance</option>
        </select>
      </div>

      {loading ? <div className="text-center py-8">Chargement...</div> : <EmployeeTable employees={employees} />}

      {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} onAdd={handleAddEmployee} />}
    </div>
  )
}
