"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

interface TalentFormProps {
  categories: Category[]
  sectors: Sector[]
}

export default function TalentForm({ categories, sectors }: TalentFormProps) {
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
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      gender: formData.get("gender"),
      nationality: formData.get("nationality"),
      categoryId: formData.get("category"),
      sectorId: formData.get("sector"),
      experience: formData.get("experience"),
      portfolio: formData.get("portfolio"),
      acceptedTerms: !!formData.get("terms"),
    }
    try {
      const res = await fetch("/api/talents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Erreur lors de l'envoi de la candidature")
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
        <h3 className="text-2xl font-bold mb-2">Inscription réussie !</h3>
        <p className="text-muted-foreground mb-6">
          Merci de vous être inscrit à l'initiative 15K-Talents. Nous avons bien reçu votre candidature et nous vous
          contacterons prochainement.
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
        <h3 className="text-xl font-semibold mb-6">Inscription talent</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fullName">
              Nom complet <span className="text-red-500">*</span>
            </Label>
            <Input id="fullName" name="fullName" className="modern-input" placeholder="Votre nom complet" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input id="email" name="email" className="modern-input" placeholder="Votre email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Téléphone <span className="text-red-500">*</span>
            </Label>
            <Input id="phone" name="phone" className="modern-input" placeholder="+241 XX XX XX XX" required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="city">
              Ville <span className="text-red-500">*</span>
            </Label>
            <Input id="city" name="city" className="modern-input" placeholder="Votre ville" required />
          </div>
          <div className="space-y-2">
            <Label>
              Genre <span className="text-red-500">*</span>
            </Label>
            <RadioGroup name="gender" defaultValue="homme" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="homme" id="homme" />
                <Label htmlFor="homme">Homme</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="femme" id="femme" />
                <Label htmlFor="femme">Femme</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="autre" id="autre" />
                <Label htmlFor="autre">Autre</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="nationality">
              Nationalité <span className="text-red-500">*</span>
            </Label>
            <Input id="nationality" name="nationality" className="modern-input" placeholder="Votre nationalité" required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="category">
              Catégorie <span className="text-red-500">*</span>
            </Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="sector">
              Secteur <span className="text-red-500">*</span>
            </Label>
            <Select name="sector" required>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez un secteur" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sec) => (
                  <SelectItem key={sec.id} value={sec.id}>{sec.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="experience">
              Expérience <span className="text-red-500">*</span>
            </Label>
            <Input id="experience" name="experience" className="modern-input" placeholder="Ex: 1-3 ans" required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="portfolio">
              Lien portfolio (facultatif)
            </Label>
            <Input id="portfolio" name="portfolio" className="modern-input" placeholder="https://..." />
          </div>
          <div className="flex items-center space-x-2 md:col-span-2">
            <Checkbox id="terms" name="terms" required />
            <Label htmlFor="terms" className="text-sm">
              J'accepte que mes informations soient utilisées dans le cadre de l'initiative 15K-Talents <span className="text-red-500">*</span>
            </Label>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <Button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Envoi en cours..." : "Soumettre ma candidature"}
          </Button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  )
}
