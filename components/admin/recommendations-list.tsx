"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Données fictives pour les recommandations
const mockRecommendations = [
  {
    id: "1",
    recommenderName: "Alain Mboumba",
    recommenderEmail: "alain.mboumba@example.com",
    talentName: "Carine Nzengue",
    talentContact: "+241 66 12 34 56",
    category: "Art et Culture",
    sector: "Culture",
    title: "Chanteuse traditionnelle",
    status: "pending",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    recommenderName: "Sylvie Oyono",
    recommenderEmail: "sylvie.oyono@example.com",
    talentName: "Marc Evouna",
    talentContact: "+241 77 98 76 54",
    category: "Artisanat et Savoir-faire",
    sector: "Artisanat",
    title: "Sculpteur sur bois",
    status: "approved",
    createdAt: "2023-05-18T14:20:00Z",
  },
  {
    id: "3",
    recommenderName: "Patrick Nguema",
    recommenderEmail: "patrick.nguema@example.com",
    talentName: "Jeanne Bivigou",
    talentContact: "+241 65 45 67 89",
    category: "Impact Social",
    sector: "Environnement",
    title: "Activiste environnemental",
    status: "rejected",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: "4",
    recommenderName: "Estelle Makaya",
    recommenderEmail: "estelle.makaya@example.com",
    talentName: "Robert Ndong",
    talentContact: "+241 74 23 45 67",
    category: "Technologie et Innovation",
    sector: "Numérique",
    title: "Développeur d'applications mobiles",
    status: "pending",
    createdAt: "2023-05-22T16:40:00Z",
  },
  {
    id: "5",
    recommenderName: "François Ondo",
    recommenderEmail: "francois.ondo@example.com",
    talentName: "Pauline Mba",
    talentContact: "+241 66 87 65 43",
    category: "Éducation et Formation",
    sector: "Éducation",
    title: "Formatrice en langues locales",
    status: "approved",
    createdAt: "2023-05-25T11:10:00Z",
  },
]

interface RecommendationsListProps {
  searchQuery: string
}

export default function RecommendationsList({ searchQuery }: RecommendationsListProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filtrer les recommandations en fonction de la recherche
  const filteredRecommendations = mockRecommendations.filter(
    (recommendation) =>
      recommendation.recommenderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recommendation.talentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recommendation.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewRecommendation = (recommendation: any) => {
    setSelectedRecommendation(recommendation)
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approuvée</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            En attente
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejetée</Badge>
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
            <TableHead>Recommandeur</TableHead>
            <TableHead>Talent recommandé</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((recommendation) => (
              <TableRow key={recommendation.id}>
                <TableCell className="font-medium">{recommendation.recommenderName}</TableCell>
                <TableCell>{recommendation.talentName}</TableCell>
                <TableCell>{recommendation.category}</TableCell>
                <TableCell>{getStatusBadge(recommendation.status)}</TableCell>
                <TableCell>{formatDate(recommendation.createdAt)}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleViewRecommendation(recommendation)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Approuver
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        Rejeter
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
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
                Aucune recommandation trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog pour afficher les détails d'une recommandation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la recommandation</DialogTitle>
            <DialogDescription>Informations complètes sur la recommandation sélectionnée</DialogDescription>
          </DialogHeader>
          {selectedRecommendation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Recommandeur</p>
                <p>{selectedRecommendation.recommenderName}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Email du recommandeur</p>
                <p>{selectedRecommendation.recommenderEmail}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Talent recommandé</p>
                <p>{selectedRecommendation.talentName}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Contact du talent</p>
                <p>{selectedRecommendation.talentContact}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Catégorie</p>
                <p>{selectedRecommendation.category}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Secteur</p>
                <p>{selectedRecommendation.sector}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Titre</p>
                <p>{selectedRecommendation.title}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Statut</p>
                <p>{getStatusBadge(selectedRecommendation.status)}</p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approuver
                </Button>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  <XCircle className="mr-2 h-4 w-4" />
                  Rejeter
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
