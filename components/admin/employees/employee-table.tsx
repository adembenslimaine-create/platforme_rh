interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  department: string
  job: string
  salary: number
  hireDate: string
  status: string
}

interface Props {
  employees: Employee[]
}

export default function EmployeeTable({ employees }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-variant border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 font-bold text-foreground">Nom</th>
              <th className="text-left px-6 py-4 font-bold text-foreground">Email</th>
              <th className="text-left px-6 py-4 font-bold text-foreground">Département</th>
              <th className="text-left px-6 py-4 font-bold text-foreground">Poste</th>
              <th className="text-left px-6 py-4 font-bold text-foreground">Salaire (TND)</th>
              <th className="text-left px-6 py-4 font-bold text-foreground">Embauche</th>
              <th className="text-left px-6 py-4 font-bold text-foreground">Statut</th>
              <th className="text-left px-6 py-4 font-bold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={idx} className="border-b border-border-light hover:bg-surface-variant transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">
                  {emp.firstName} {emp.lastName}
                </td>
                <td className="px-6 py-4 text-foreground-muted text-sm">{emp.email}</td>
                <td className="px-6 py-4 text-foreground">{emp.department}</td>
                <td className="px-6 py-4 text-foreground">{emp.job}</td>
                <td className="px-6 py-4 font-bold text-primary">{emp.salary.toLocaleString()} TND</td>
                <td className="px-6 py-4 text-foreground text-sm">{emp.hireDate}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-medium">
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="px-3 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 text-xs font-medium">
                    Éditer
                  </button>
                  <button className="px-3 py-1 bg-error/20 text-error rounded hover:bg-error/30 text-xs font-medium">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
