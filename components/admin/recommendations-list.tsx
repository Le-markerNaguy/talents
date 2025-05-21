import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Recommendation {
  id: string
  recommenderName: string
  recommenderEmail: string
  talentName: string
  talentPhone: string
  categoryId: string
  sectorId: string
  talentTitle: string
  createdAt: string
}

export default function RecommendationsList({ searchQuery }: { searchQuery: string }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/recommendations")
      .then((res) => res.json())
      .then((data) => {
        let list = data.recommendations || []
        if (searchQuery) {
          list = list.filter((r: Recommendation) =>
            r.talentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.recommenderName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }
        setRecommendations(list)
        setLoading(false)
      })
  }, [searchQuery])

  if (loading) return <Skeleton className="h-32 w-full" />
  if (!recommendations.length) return <div className="text-center text-muted-foreground py-8">Aucune recommandation trouvée.</div>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Talent</th>
            <th className="px-4 py-2 text-left">Téléphone</th>
            <th className="px-4 py-2 text-left">Catégorie</th>
            <th className="px-4 py-2 text-left">Secteur</th>
            <th className="px-4 py-2 text-left">Titre</th>
            <th className="px-4 py-2 text-left">Recommandé par</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((rec) => (
            <tr key={rec.id} className="border-b hover:bg-muted/50">
              <td className="px-4 py-2">{rec.talentName}</td>
              <td className="px-4 py-2">{rec.talentPhone}</td>
              <td className="px-4 py-2">{rec.categoryId}</td>
              <td className="px-4 py-2">{rec.sectorId}</td>
              <td className="px-4 py-2">{rec.talentTitle}</td>
              <td className="px-4 py-2">{rec.recommenderName}</td>
              <td className="px-4 py-2">{rec.recommenderEmail}</td>
              <td className="px-4 py-2">{new Date(rec.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
