"use server"

// Fonction pour récupérer les catégories de talents
export async function getCategories() {
  // Dans un cas réel, cela viendrait d'une base de données
  return [
    { id: "art", name: "Art et Culture" },
    { id: "tech", name: "Technologie et Innovation" },
    { id: "science", name: "Science et Recherche" },
    { id: "business", name: "Entrepreneuriat" },
    { id: "education", name: "Éducation et Formation" },
    { id: "sport", name: "Sport et Performance" },
    { id: "social", name: "Impact Social" },
    { id: "craft", name: "Artisanat et Savoir-faire" },
  ]
}

// Fonction pour récupérer les secteurs d'activité
export async function getSectors() {
  // Dans un cas réel, cela viendrait d'une base de données
  return [
    { id: "agriculture", name: "Agriculture" },
    { id: "energy", name: "Énergie" },
    { id: "health", name: "Santé" },
    { id: "education", name: "Éducation" },
    { id: "digital", name: "Numérique" },
    { id: "tourism", name: "Tourisme" },
    { id: "culture", name: "Culture" },
    { id: "environment", name: "Environnement" },
    { id: "finance", name: "Finance" },
    { id: "transport", name: "Transport et Logistique" },
  ]
}
