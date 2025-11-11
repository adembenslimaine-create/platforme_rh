"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    label: "Tableau de Bord",
    href: "/admin/dashboard",
    icon: "📊",
  },
  {
    label: "Gestion Employés",
    href: "/admin/employees",
    icon: "👥",
  },
  {
    label: "Paie",
    href: "/admin/payroll",
    icon: "💰",
  },
  {
    label: "Congés & Absences",
    href: "/admin/leave",
    icon: "📅",
  },
  {
    label: "Recrutement",
    href: "/admin/recruitment",
    icon: "🎯",
  },
  {
    label: "Rapports",
    href: "/admin/reports",
    icon: "📈",
  },
  {
    label: "Paramètres",
    href: "/admin/settings",
    icon: "⚙️",
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-64"} bg-gradient-to-b from-primary to-primary-dark text-white transition-all duration-300 flex flex-col shadow-xl`}
    >
      {/* Header */}
      <div className="p-6 border-b border-primary-dark/50 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-2xl font-bold">TalentHub</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-primary-dark p-2 rounded transition-all duration-200"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive ? "bg-primary-dark shadow-lg scale-105" : "hover:bg-primary-dark/50 hover:translate-x-1"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-dark/50 text-center text-sm text-white/80">
        {!isCollapsed && <p>© 2025 TalentHub</p>}
      </div>
    </aside>
  )
}
