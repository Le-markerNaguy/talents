"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Données fictives pour les talents
const mockTalents = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+241 77 12 34 56",
    category: "Art et Culture",
    sector: "Culture",
    title: "Artiste peintre",
    status: "approved",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Marie Koumba",
    email: "marie.koumba@example.com",
    phone: "+241 66 98 76 54",
    category: "Technologie et Innovation",
    sector: "Numérique",
    title: "Développeuse web",
    status: "pending",
    createdAt: "2023-05-18T14:20:00Z",
  },
  {
    id: "3",
    name: "Pierre Moussavou",
    email: "pierre.moussavou@example.com",
    phone: "+241 74 45 67 89",
    category: "Science et Recherche",
    sector: "Santé",
    title: "Chercheur en biologie",
    status: "approved",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: "4",
    name: "Sophie Ndong",
    email: "sophie.ndong@example.com",
    phone: "+241 65 23 45 67",
    category: "Entrepreneuriat",
    sector: "Agriculture",
    title: "Fondatrice d'une startup agricole",
    status: "rejected",
    createdAt: "2023-05-22T16:40:00Z",
  },
  {
    id: "5",
    name: "Thomas Obiang",
    email: "thomas.obiang@example.com",
    phone: "+241 77 87 65 43",
    category: "Sport et Performance",
    sector: "Sport",
    title: "Coach sportif",
    status: "pending",
    createdAt: "2023-05-25T11:10:00Z",
  },
]

interface TalentsListProps {
  searchQuery: string
}

export default function TalentsList({ searchQuery }: TalentsListProps) {
  const [selectedTalent, setSelectedTalent] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filtrer les talents en fonction de la recherche
  const filteredTalents = mockTalents.filter(
    (talent) =>
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewTalent = (talent: any) => {
    setSelectedTalent(talent)
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approuvé</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            En attente
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejeté</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d'inscription</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTalents.length > 0 ? (
            filteredTalents.map((talent) => (
              <TableRow key={talent.id}>
                <TableCell className="font-medium">{talent.name}</TableCell>
                <TableCell>{talent.category}</TableCell>
                <TableCell>{talent.title}</TableCell>
                <TableCell>{getStatusBadge(talent.status)}</TableCell>
                <TableCell>{formatDate(talent.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleViewTalent(talent)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Aucun talent trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog pour afficher les détails d'un talent */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du talent</DialogTitle>
            <DialogDescription>Informations complètes sur le talent sélectionné</DialogDescription>
          </DialogHeader>
          {selectedTalent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Nom complet</p>
                <p>{selectedTalent.name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{selectedTalent.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                <p>{selectedTalent.phone}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Catégorie</p>
                <p>{selectedTalent.category}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Secteur</p>
                <p>{selectedTalent.sector}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Titre</p>
                <p>{selectedTalent.title}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Statut</p>
                <p>{getStatusBadge(selectedTalent.status)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Date d'inscription</p>
                <p>{formatDate(selectedTalent.createdAt)}</p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
