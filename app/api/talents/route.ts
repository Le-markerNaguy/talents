import { NextResponse } from "next/server"
import { PrismaClient } from "@/generated/prisma"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const talents = await prisma.talent.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json({ talents })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Erreur lors de la récupération des talents."
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const {
      fullName,
      email,
      phone,
      city,
      gender,
      nationality,
      categoryId,
      sectorId,
      experience,
      portfolio,
      acceptedTerms
    } = data

    // Validation stricte
    let accepted = acceptedTerms
    if (typeof acceptedTerms === "string") {
      accepted = acceptedTerms === "true" || acceptedTerms === "on"
    }

    if (
      !fullName || !email || !phone || !city || !gender || !nationality ||
      !categoryId || !sectorId || !experience || accepted !== true
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Champs obligatoires manquants ou invalides.",
        },
        { status: 400 },
      )
    }

    const newTalent = await prisma.talent.create({
      data: {
        fullName,
        email,
        phone,
        city,
        gender,
        nationality,
        categoryId,
        sectorId,
        experience,
        portfolio,
        acceptedTerms: accepted
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Talent enregistré avec succès",
        talent: newTalent,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'enregistrement du talent",
      },
      { status: 500 },
    )
  }
}
