"use client"

import { useEffect, useState } from "react"

export default function RecruitmentPage() {
  const [candidates, setCandidates] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/recruitment")
        const data = await res.json()
        setCandidates(Array.isArray(data) ? data : [])
      } catch {
        setCandidates([])
      }
    }
    load()
  }, [])

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion du Recrutement</h1>
          <p className="text-foreground-muted mt-2">Gérez les candidatures et le recrutement</p>
        </div>
        <button onClick={async () => {
          const title = window.prompt('Titre de l\'offre', 'Nouveau Poste')
          if (!title) return
          try {
            await fetch('/api/recruitment/postings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) })
            alert('Offre publiée')
          } catch (e) { alert('Échec de publication') }
        }} className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary-dark">
          Publier une Offre
        </button>
      </div>

      {/* Jobs Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Offres Ouvertes</p>
          <p className="text-3xl font-bold text-foreground">5</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Candidatures</p>
          <p className="text-3xl font-bold text-primary">28</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">En Entretien</p>
          <p className="text-3xl font-bold text-accent">7</p>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-variant border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-bold text-foreground">Candidat</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Poste</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Date Candidature</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Évaluation</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Statut</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((cand) => (
                <tr key={cand.id} className="border-b border-border-light hover:bg-surface-variant transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{cand.name}</td>
                  <td className="px-6 py-4 text-foreground">{cand.position}</td>
                  <td className="px-6 py-4 text-foreground text-sm">{cand.appliedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(cand.rating || 0) ? "★" : "☆"} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
                      {cand.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="px-3 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 text-xs font-medium">
                      CV
                    </button>
                    <button className="px-3 py-1 bg-secondary/20 text-secondary rounded hover:bg-secondary/30 text-xs font-medium">
                      Entretien
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
