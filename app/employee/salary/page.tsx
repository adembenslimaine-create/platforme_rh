"use client"

export default function EmployeeSalaryPage() {
  const salaryHistory = [
    {
      month: "Septembre 2025",
      basic: 4500,
      bonus: 500,
      deductions: 450,
      netSalary: 4550,
      status: "Payé",
    },
    {
      month: "Août 2025",
      basic: 4500,
      bonus: 0,
      deductions: 450,
      netSalary: 4050,
      status: "Payé",
    },
    {
      month: "Juillet 2025",
      basic: 4500,
      bonus: 300,
      deductions: 450,
      netSalary: 4350,
      status: "Payé",
    },
  ]

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mon Salaire</h1>
        <p className="text-foreground-muted mt-2">Consultez l'historique de vos salaires</p>
      </div>

      {/* Current Month Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Salaire de Base</p>
          <p className="text-2xl font-bold text-foreground mt-2">4 500 TND</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Prime/Bonus</p>
          <p className="text-2xl font-bold text-success mt-2">500 TND</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Déductions</p>
          <p className="text-2xl font-bold text-error mt-2">-450 TND</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-foreground-muted text-sm">Salaire Net</p>
          <p className="text-2xl font-bold text-primary mt-2">4 550 TND</p>
        </div>
      </div>

      {/* Salary History Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Historique des Salaires</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-variant border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-bold text-foreground">Mois</th>
                <th className="text-right px-6 py-4 font-bold text-foreground">Salaire de Base</th>
                <th className="text-right px-6 py-4 font-bold text-foreground">Prime</th>
                <th className="text-right px-6 py-4 font-bold text-foreground">Déductions</th>
                <th className="text-right px-6 py-4 font-bold text-foreground">Salaire Net</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Statut</th>
                <th className="text-left px-6 py-4 font-bold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaryHistory.map((item, idx) => (
                <tr key={idx} className="border-b border-border-light hover:bg-surface-variant transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{item.month}</td>
                  <td className="px-6 py-4 text-right text-foreground">{item.basic.toLocaleString()} TND</td>
                  <td className="px-6 py-4 text-right text-success font-medium">{item.bonus.toLocaleString()} TND</td>
                  <td className="px-6 py-4 text-right text-error font-medium">
                    {item.deductions.toLocaleString()} TND
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-primary">{item.netSalary.toLocaleString()} TND</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-medium">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 text-xs font-medium">
                      Télécharger
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
