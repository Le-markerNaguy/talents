import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./iframe-styles.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "15K-Talents | Révélez l'excellence gabonaise cachée",
  description: "Ensemble, donnons vie à une communauté de 15 000 talents d'exception pour façonner le Gabon de demain.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
