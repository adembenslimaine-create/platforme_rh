"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Default admin account created by the system
const ADMIN_ACCOUNTS = ["admin@talenhub.tn", "supervisor@talenhub.tn"]

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate login - In production, connect to actual backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email && password) {
        const isAdmin = ADMIN_ACCOUNTS.includes(email.toLowerCase())
        const userType = isAdmin ? "admin" : "employee"

        // Store session
        localStorage.setItem("userType", userType)
        localStorage.setItem("userEmail", email)
        localStorage.setItem("isLoggedIn", "true")

        toast.success(`Connexion réussie comme ${userType === "admin" ? "administrateur" : "employé"}`)

        // Auto-route based on user type
        if (userType === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/employee/profile")
        }
      }
    } catch (error) {
      toast.error("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-col justify-center items-start text-white space-y-6 animate-slide-in-left">
        <div className="space-y-2">
          <div className="text-5xl font-bold">TalentHub</div>
          <p className="text-xl text-white/80">Gestion Complète des Ressources Humaines</p>
        </div>

        <div className="space-y-4 pt-6">
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm">✓</span>
            </div>
            <p className="text-white/90">Gestion complète des employés et contrats</p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm">✓</span>
            </div>
            <p className="text-white/90">Calcul automatisé de la paie en TND</p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm">✓</span>
            </div>
            <p className="text-white/90">Gestion des congés et absences</p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm">✓</span>
            </div>
            <p className="text-white/90">Module de recrutement intégré</p>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-sm text-white/60">Adapté pour la Tunisie • Conforme aux normes locales</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="animate-slide-in-right">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Connexion</h1>
            <p className="text-foreground-muted">Accédez à votre compte TalentHub</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@example.com"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-foreground"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-foreground"
                required
              />
            </div>

            {/* Demo Credentials */}
            <div className="bg-primary-light p-3 rounded-lg text-sm">
              <p className="font-medium text-primary-dark mb-2">Identifiants de démonstration:</p>
              <div className="space-y-1 text-primary-dark/90">
                <p>
                  Admin: <span className="font-mono">admin@talenhub.tn</span>
                </p>
                <p>
                  Employé: <span className="font-mono">employee@talenhub.tn</span>
                </p>
                <p>
                  MDP: <span className="font-mono">demo123</span>
                </p>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <div className="text-center text-sm text-foreground-muted">
            <p>Besoin d'aide? Contactez l'administration</p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-white/80 text-sm">
          <p>© 2025 TalentHub - Système de Gestion RH pour la Tunisie</p>
        </div>
      </div>
    </div>
  )
}
