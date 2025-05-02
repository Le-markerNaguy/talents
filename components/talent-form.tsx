"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  const [formStep, setFormStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous pourriez ajouter la logique pour envoyer les données à votre API
    // Par exemple: await fetch('/api/talents', { method: 'POST', body: JSON.stringify(formData) })
    setIsSubmitted(true)
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
        {formStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">Informations personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  Prénom <span className="text-red-500">*</span>
                </Label>
                <Input id="firstName" className="modern-input" placeholder="Votre prénom" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Nom <span className="text-red-500">*</span>
                </Label>
                <Input id="lastName" className="modern-input" placeholder="Votre nom" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="modern-input"
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Téléphone <span className="text-red-500">*</span>
                </Label>
                <Input id="phone" className="modern-input" placeholder="+241 XX XX XX XX" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">
                  Adresse <span className="text-red-500">*</span>
                </Label>
                <Input id="address" className="modern-input" placeholder="Votre adresse" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="city">
                  Ville <span className="text-red-500">*</span>
                </Label>
                <Input id="city" className="modern-input" placeholder="Votre ville" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>
                  Genre <span className="text-red-500">*</span>
                </Label>
                <RadioGroup defaultValue="homme" className="flex space-x-4">
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
              <div className="space-y-2">
                <Label htmlFor="birthdate">
                  Date de naissance <span className="text-red-500">*</span>
                </Label>
                <Input id="birthdate" type="date" className="modern-input" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">
                  Nationalité <span className="text-red-500">*</span>
                </Label>
                <Input id="nationality" className="modern-input" placeholder="Votre nationalité" required />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button type="button" className="primary-button" onClick={() => setFormStep(2)}>
                Continuer
              </Button>
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">Votre talent</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">
                  Catégorie de talent <span className="text-red-500">*</span>
                </Label>
                <Select required>
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
                <Select required>
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
                  Titre de votre talent <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="talentTitle"
                  className="modern-input"
                  placeholder="Ex: Artisan innovant, Développeur web, Artiste peintre..."
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="experience">
                  Années d'expérience <span className="text-red-500">*</span>
                </Label>
                <Select required>
                  <SelectTrigger className="modern-select modern-select-trigger">
                    <SelectValue placeholder="Sélectionnez votre expérience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 ans</SelectItem>
                    <SelectItem value="3-5">3-5 ans</SelectItem>
                    <SelectItem value="6-10">6-10 ans</SelectItem>
                    <SelectItem value="10+">Plus de 10 ans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">
                  Description de votre talent <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  className="modern-textarea min-h-[150px]"
                  placeholder="Décrivez votre talent, vos réalisations et ce qui vous rend unique..."
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="achievements">Principales réalisations</Label>
                <Textarea
                  id="achievements"
                  className="modern-textarea min-h-[100px]"
                  placeholder="Décrivez vos principales réalisations, prix, reconnaissances..."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="portfolio">Lien vers votre portfolio/site web/profil LinkedIn</Label>
                <Input id="portfolio" className="modern-input" placeholder="https://..." />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    J'accepte que mes informations soient utilisées dans le cadre de l'initiative 15K-Talents{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={() => setFormStep(1)}>
                Retour
              </Button>
              <Button type="submit" className="primary-button">
                Soumettre ma candidature
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
