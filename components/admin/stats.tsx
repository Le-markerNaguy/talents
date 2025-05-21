import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminStats() {
  const [stats, setStats] = useState<{ talentsCount: number; recommendationsCount: number; conversionRate: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <Skeleton className="h-20 w-full" />
  if (!stats) return <div className="text-center text-muted-foreground py-4">Aucune statistique.</div>

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Talents inscrits :</span>
        <span className="font-bold">{stats.talentsCount}</span>
      </div>
      <div className="flex justify-between">
        <span>Recommandations :</span>
        <span className="font-bold">{stats.recommendationsCount}</span>
      </div>
      <div className="flex justify-between">
        <span>Taux de conversion :</span>
        <span className="font-bold">{stats.conversionRate}%</span>
      </div>
    </div>
  )
}
