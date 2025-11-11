"use client"

export default function EmployeeContractsPage() {
  const contracts = [
    {
      id: 1,
      type: "CDI",
      startDate: "2023-01-15",
      endDate: null,
      position: "Développeur Senior",
      salary: 4500,
      status: "Actif",
    },
  ]

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mes Contrats</h1>
        <p className="text-foreground-muted mt-2">Consultez vos contrats de travail</p>
      </div>

      {/* Contracts */}
      <div className="space-y-4">
        {contracts.map((contract) => (
          <div key={contract.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📄</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{contract.type}</h3>
                  <p className="text-sm text-foreground-muted">{contract.position}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-medium">
                {contract.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
              <div>
                <p className="text-foreground-muted text-sm">Date de Début</p>
                <p className="font-medium text-foreground">{contract.startDate}</p>
              </div>
              <div>
                <p className="text-foreground-muted text-sm">Date de Fin</p>
                <p className="font-medium text-foreground">{contract.endDate || "CDI - Durée indéterminée"}</p>
              </div>
              <div>
                <p className="text-foreground-muted text-sm">Salaire Mensuel</p>
                <p className="font-bold text-primary">{contract.salary.toLocaleString()} TND</p>
              </div>
            </div>

            <button className="px-4 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 text-sm font-medium">
              Télécharger PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
