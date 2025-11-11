"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const menuItems = [
  { label: "Mon Profil", href: "/employee/profile", icon: "👤" },
  { label: "Mon Salaire", href: "/employee/salary", icon: "💼" },
  { label: "Mes Congés", href: "/employee/leave", icon: "📅" },
  { label: "Mes Absences", href: "/employee/absences", icon: "📋" },
  { label: "Contrats", href: "/employee/contracts", icon: "📄" },
  { label: "Documents", href: "/employee/documents", icon: "📂" },
]

export default function EmployeeSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-64"} bg-gradient-to-b from-secondary to-secondary-dark text-white transition-all duration-300 flex flex-col shadow-lg`}
    >
      <div className="p-6 border-b border-secondary-dark/50 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-2xl font-bold">TalentHub</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-secondary-dark p-2 rounded transition-all duration-200"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive ? "bg-secondary-dark shadow-md scale-105" : "hover:bg-secondary-dark/50 hover:translate-x-1"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-secondary-dark/50 text-center text-sm text-white/80">
        {!isCollapsed && <p>© 2025 TalentHub</p>}
      </div>
    </aside>
  )
}
