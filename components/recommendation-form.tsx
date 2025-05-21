"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle } from "lucide-react"

interface Category {
  id: string
  name: string
}

interface Sector {
  id: string
  name: string
}

interface RecommendationFormProps {
  categories: Category[]
  sectors: Sector[]
}

export default function RecommendationForm({ categories, sectors }: RecommendationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const payload = {
      recommenderName: formData.get("yourName"),
      recommenderEmail: formData.get("yourEmail"),
      recommenderPhone: formData.get("yourPhone"),
      relationship: formData.get("relationship"),
      talentName: formData.get("talentName"),
      talentEmail: formData.get("talentEmail"),
      talentPhone: formData.get("talentPhone"),
      talentLocation: formData.get("talentLocation"),
      categoryId: formData.get("category"),
      sectorId: formData.get("sector"),
      talentTitle: formData.get("talentTitle"),
      talentDescription: formData.get("talentDescription"),
      talentAchievements: formData.get("talentAchievements"),
      acceptedTerms: !!formData.get("terms"),
    }
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Erreur lors de l'envoi de la recommandation")
      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.message || "Erreur inconnue")
    } finally {
      setLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="form-container p-8 flex flex-col items-center justify-center text-center">
        <CheckCircle className="h-16 w-16 text-primary mb-4" />
        <h3 className="text-2xl font-bold mb-2">Recommandation envoyée !</h3>
        <p className="text-muted-foreground mb-6">
          Merci d'avoir recommandé un talent pour l'initiative 15K-Talents. Nous allons examiner votre recommandation et
          contacter la personne concernée.
        </p>
        <Button className="primary-button" onClick={() => setIsSubmitted(false)}>
          Retour à l'accueil
        </Button>
      </div>
    )
  }

  return (
    <div className="form-container p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-6">Vos informations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="yourName">
                Votre nom <span className="text-red-500">*</span>
              </Label>
              <Input id="yourName" className="modern-input" placeholder="Votre nom complet" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yourEmail">
                Votre email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="yourEmail"
                type="email"
                className="modern-input"
                placeholder="votre.email@exemple.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yourPhone">
                Votre téléphone <span className="text-red-500">*</span>
              </Label>
              <Input id="yourPhone" className="modern-input" placeholder="+241 XX XX XX XX" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship">
                Relation avec le talent <span className="text-red-500">*</span>
              </Label>
              <Select name="relationship" required>
                <SelectTrigger className="modern-select modern-select-trigger">
                  <SelectValue placeholder="Sélectionnez votre relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Famille</SelectItem>
                  <SelectItem value="friend">Ami(e)</SelectItem>
                  <SelectItem value="colleague">Collègue</SelectItem>
                  <SelectItem value="manager">Supérieur hiérarchique</SelectItem>
                  <SelectItem value="teacher">Enseignant</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-6">Informations sur le talent recommandé</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="talentName">
                Nom du talent <span className="text-red-500">*</span>
              </Label>
              <Input id="talentName" className="modern-input" placeholder="Nom complet du talent" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="talentEmail">Email du talent</Label>
              <Input id="talentEmail" type="email" className="modern-input" placeholder="email.du.talent@exemple.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="talentPhone">
                Téléphone du talent <span className="text-red-500">*</span>
              </Label>
              <Input id="talentPhone" className="modern-input" placeholder="+241 XX XX XX XX" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="talentLocation">
                Localisation du talent <span className="text-red-500">*</span>
              </Label>
              <Input id="talentLocation" className="modern-input" placeholder="Ville, Pays" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">
                Catégorie de talent <span className="text-red-500">*</span>
              </Label>
              <Select name="category" required>
                <SelectTrigger className="modern-select modern-select-trigger">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector">
                Secteur d'activité <span className="text-red-500">*</span>
              </Label>
              <Select name="sector" required>
                <SelectTrigger className="modern-select modern-select-trigger">
                  <SelectValue placeholder="Sélectionnez un secteur" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="talentTitle">
                Titre/Spécialité du talent <span className="text-red-500">*</span>
              </Label>
              <Input
                id="talentTitle"
                className="modern-input"
                placeholder="Ex: Artisan innovant, Développeur web, Artiste peintre..."
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="talentDescription">
                Pourquoi recommandez-vous ce talent ? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="talentDescription"
                className="modern-textarea min-h-[150px]"
                placeholder="Décrivez les compétences, réalisations et qualités exceptionnelles de cette personne..."
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="talentAchievements">Principales réalisations du talent</Label>
              <Textarea
                id="talentAchievements"
                className="modern-textarea min-h-[100px]"
                placeholder="Mentionnez les réalisations notables, prix, reconnaissances..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" name="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  Je confirme avoir informé cette personne de ma recommandation et j'accepte que mes informations soient
                  utilisées dans le cadre de l'initiative 15K-Talents <span className="text-red-500">*</span>
                </Label>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <Button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Envoi en cours..." : "Envoyer ma recommandation"}
            </Button>
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          {loading && (
            <div className="text-primary text-sm mb-4">Envoi en cours...</div>
          )}
        </div>
      </form>
    </div>
  )
}
