"use client"

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rapports & Analytiques</h1>
        <p className="text-foreground-muted mt-2">Générez et consultez les rapports RH</p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Rapport Paie Mensuelle", icon: "💰" },
          { title: "Rapport Présence", icon: "📋" },
          { title: "Analyse Turnover", icon: "📊" },
          { title: "Rapport Congés", icon: "📅" },
          { title: "Analyse Compétences", icon: "🎓" },
          { title: "Rapport Recrutement", icon: "🎯" },
        ].map((report, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">{report.icon}</div>
            <h3 className="text-lg font-bold text-foreground mb-2">{report.title}</h3>
            <button className="text-primary font-medium hover:underline">Générer →</button>
          </div>
        ))}
      </div>
    </div>
  )
}
