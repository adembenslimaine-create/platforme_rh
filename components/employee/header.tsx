"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EmployeeHeader() {
  const router = useRouter()
  const [showProfile, setShowProfile] = useState(false)
  const userEmail = localStorage.getItem("userEmail")

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  return (
    <header className="bg-gradient-to-r from-surface to-background border-b border-border shadow-md">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Bienvenue</h2>
          <p className="text-sm text-foreground-muted">{userEmail}</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-2 hover:bg-secondary/10 rounded-lg transition-all duration-200"
          >
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold shadow-md">
              E
            </div>
            <span className="hidden md:inline text-sm font-medium text-foreground">Employé</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border z-50 animate-slide-in-right">
              <div className="p-4 space-y-2">
                <button className="w-full text-left text-sm px-3 py-2 hover:bg-surface-variant rounded transition-all duration-200 text-foreground">
                  Mon Profil
                </button>
                <button className="w-full text-left text-sm px-3 py-2 hover:bg-surface-variant rounded transition-all duration-200 text-foreground">
                  Préférences
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm px-3 py-2 text-error hover:bg-error/10 rounded transition-all duration-200"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
