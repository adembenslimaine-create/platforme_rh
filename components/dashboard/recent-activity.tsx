"use client"

import { useEffect, useState } from "react"

export default function RecentActivity() {
  const [activities, setActivities] = useState<
    { type: string; desc: string; time: string }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/recent-activity")
        const data = await res.json()
        setActivities(data)
      } catch (e) {
        setActivities([])
      }
    }
    fetchData()
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Activités Récentes</h3>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="text-sm text-foreground-muted">Aucune activité récente</div>
        ) : (
          activities.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 hover:bg-surface-variant rounded-lg transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{activity.type}</p>
                <p className="text-xs text-foreground-muted">{activity.desc}</p>
              </div>
              <span className="text-xs text-foreground-light">{activity.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
