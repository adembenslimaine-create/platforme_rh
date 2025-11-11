"use client"

import { useEffect, useState } from "react"
import StatCard from "@/components/dashboard/stat-card"
import EmployeeChart from "@/components/dashboard/employee-chart"
import RecentActivity from "@/components/dashboard/recent-activity"

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: "Total Employés", value: "Chargement...", icon: "👥", color: "bg-blue-100" },
    { label: "En Paie Ce Mois", value: "Chargement...", icon: "💰", color: "bg-green-100" },
    { label: "Congés Approuvés", value: "23", icon: "📅", color: "bg-yellow-100" },
    { label: "Candidats", value: "12", icon: "🎯", color: "bg-purple-100" },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const empRes = await fetch("/api/employees")
        const employees = await empRes.json()

        const payrollRes = await fetch("/api/payroll")
        const payrollResponse = await payrollRes.json()

        let formattedPayroll = "0.00"
        if (payrollResponse && typeof payrollResponse.totalPayroll === "number") {
          formattedPayroll = payrollResponse.totalPayroll.toFixed(2)
        }

        setStats([
          { label: "Total Employés", value: employees.length, icon: "👥", color: "bg-blue-100" },
          {
            label: "En Paie Ce Mois",
            value: `${Number.parseFloat(formattedPayroll).toLocaleString("fr-TN")} TND`,
            icon: "💰",
            color: "bg-green-100",
          },
          { label: "Congés Approuvés", value: "23", icon: "📅", color: "bg-yellow-100" },
          { label: "Candidats", value: "12", icon: "🎯", color: "bg-purple-100" },
        ])
      } catch (error) {
        console.error("[v0] Error fetching dashboard stats:", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de Bord Administrateur</h1>
        <p className="text-foreground-muted mt-2">Aperçu complet de votre organisation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EmployeeChart />
        <RecentActivity />
      </div>
    </div>
  )
}
