import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


export async function POST(request: Request) {
  try {
    const data = await request.json()
    const {
      recommenderName,
      recommenderEmail,
      recommenderPhone,
      relationship,
      talentName,
      talentEmail,
      talentPhone,
      talentLocation,
      categoryId,
      sectorId,
      talentTitle,
      talentDescription,
      talentAchievements,
      acceptedTerms
    } = data

    const newRecommendation = await prisma.recommendation.create({
      data: {
        recommenderName,
        recommenderEmail,
        recommenderPhone,
        relationship,
        talentName,
        talentEmail,
        talentPhone,
        talentLocation,
        categoryId,
        sectorId,
        talentTitle,
        talentDescription,
        talentAchievements,
        acceptedTerms
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Recommandation enregistrée avec succès",
        recommendation: newRecommendation,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'enregistrement de la recommandation",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const recommendations = await prisma.recommendation.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json({ recommendations })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Erreur lors de la récupération des recommandations."
    }, { status: 500 })
  }
}
