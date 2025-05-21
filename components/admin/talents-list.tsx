import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Talent {
  id: string
  fullName: string
  email: string
  phone: string
  city: string
  gender: string
  nationality: string
  categoryId: string
  sectorId: string
  experience: string
  portfolio?: string
  acceptedTerms: boolean
  createdAt: string
}

export default function TalentsList({ searchQuery }: { searchQuery: string }) {
  const [talents, setTalents] = useState<Talent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/talents")
      .then((res) => res.json())
      .then((data) => {
        let list = data.talents || []
        if (searchQuery) {
          list = list.filter((t: Talent) =>
            t.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }
        setTalents(list)
        setLoading(false)
      })
  }, [searchQuery])

  if (loading) return <Skeleton className="h-32 w-full" />
  if (!talents.length) return <div className="text-center text-muted-foreground py-8">Aucun talent trouvé.</div>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Téléphone</th>
            <th className="px-4 py-2 text-left">Catégorie</th>
            <th className="px-4 py-2 text-left">Secteur</th>
            <th className="px-4 py-2 text-left">Expérience</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {talents.map((talent) => (
            <tr key={talent.id} className="border-b hover:bg-muted/50">
              <td className="px-4 py-2">{talent.fullName}</td>
              <td className="px-4 py-2">{talent.email}</td>
              <td className="px-4 py-2">{talent.phone}</td>
              <td className="px-4 py-2">{talent.categoryId}</td>
              <td className="px-4 py-2">{talent.sectorId}</td>
              <td className="px-4 py-2">{talent.experience}</td>
              <td className="px-4 py-2">{new Date(talent.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
