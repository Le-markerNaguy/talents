"use client"

import { useState } from "react"

export default function TalentFormGoogle() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="form-container p-4 md:p-6">
      <div className="form-iframe-container">
        {isLoading && (
          <div className="form-loading">
            <div className="flex flex-col items-center">
              <div className="loading-spinner"></div>
              <p className="mt-4 text-sm text-primary font-medium">Chargement du formulaire...</p>
            </div>
          </div>
        )}
        <div className="form-title">Inscription en tant que talent</div>
        <div className="form-description">
          Partagez vos compétences et votre expertise pour rejoindre la communauté des 15K-Talents
        </div>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf1-MTBPplKDkh8ygATfl67AHfzIrrT6ovS0O36RgYax61c9g/viewform?embedded=true"
          className="google-form"
          style={{ opacity: isLoading ? 0.3 : 1 }}
          onLoad={() => setIsLoading(false)}
          title="Formulaire d'inscription talent"
        >
          Chargement…
        </iframe>
      </div>
    </div>
  )
}
