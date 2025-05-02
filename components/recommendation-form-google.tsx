"use client"

import { useState } from "react"

export default function RecommendationFormGoogle() {
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
        <div className="form-title">Recommander un talent</div>
        <div className="form-description">
          Vous connaissez quelqu'un d'exceptionnel ? Aidez-nous à découvrir les talents cachés du Gabon
        </div>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfuNtkN6Exyozt8-m5xz3fuNwavKtCOIuaGzcNpbeWHTYartw/viewform?embedded=true"
          className="google-form"
          style={{ opacity: isLoading ? 0.3 : 1 }}
          onLoad={() => setIsLoading(false)}
          title="Formulaire de recommandation"
        >
          Chargement…
        </iframe>
      </div>
    </div>
  )
}
