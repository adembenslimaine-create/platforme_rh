interface StatCardProps {
  label: string
  value: string | number
  icon: string
  color: string
}

export default function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-foreground-muted text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
        </div>
        <div className={`${color} w-16 h-16 rounded-lg flex items-center justify-center text-2xl`}>{icon}</div>
      </div>
    </div>
  )
}
