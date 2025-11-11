"use client"

export default function EmployeeDocumentsPage() {
  const documents = [
    { id: 1, name: "Contrat de Travail", date: "2023-01-15", type: "PDF", size: "2.4 MB" },
    { id: 2, name: "Attestation d'Emploi", date: "2025-09-01", type: "PDF", size: "1.2 MB" },
    { id: 3, name: "Bulletin de Paie Août", date: "2025-09-01", type: "PDF", size: "856 KB" },
    { id: 4, name: "Bulletin de Paie Juillet", date: "2025-08-01", type: "PDF", size: "856 KB" },
  ]

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mes Documents</h1>
        <p className="text-foreground-muted mt-2">Accédez à vos documents professionnels</p>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-variant border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-bold text-foreground">Nom du Document</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Type</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Taille</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Date</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-border-light hover:bg-surface-variant transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📄</span>
                      <span className="font-medium text-foreground">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{doc.type}</td>
                  <td className="px-6 py-4 text-foreground-muted text-sm">{doc.size}</td>
                  <td className="px-6 py-4 text-foreground text-sm">{doc.date}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="px-3 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 text-xs font-medium">
                      Télécharger
                    </button>
                    <button className="px-3 py-1 bg-secondary/20 text-secondary rounded hover:bg-secondary/30 text-xs font-medium">
                      Aperçu
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
