"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminHeader() {
  const router = useRouter()
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Bienvenue, Administrateur</h2>
          <p className="text-sm text-foreground-muted">Système de gestion RH - TalentHub</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-variant rounded-lg transition-colors">🔔</button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 hover:bg-surface-variant rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="hidden md:inline text-sm font-medium">Admin</span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border z-50">
                <div className="p-4 space-y-2">
                  <button className="w-full text-left text-sm px-3 py-2 hover:bg-surface-variant rounded transition-colors">
                    Mon Profil
                  </button>
                  <button className="w-full text-left text-sm px-3 py-2 hover:bg-surface-variant rounded transition-colors">
                    Paramètres
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm px-3 py-2 text-error hover:bg-error/10 rounded transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
