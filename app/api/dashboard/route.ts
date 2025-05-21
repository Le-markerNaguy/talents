import { NextResponse } from "next/server"
import { PrismaClient } from "@/generated/prisma"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const talentsCount = await prisma.talent.count()
    const recommendationsCount = await prisma.recommendation.count()
    // Exemple de taux de conversion fictif
    const conversionRate = talentsCount > 0 ? Math.round((recommendationsCount / talentsCount) * 100) : 0
    return NextResponse.json({
      talentsCount,
      recommendationsCount,
      conversionRate
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Erreur lors de la récupération des statistiques."
    }, { status: 500 })
  }
}
