import { NextResponse } from "next/server"
import { PrismaClient } from "@/generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// Créer un nouvel admin
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email et mot de passe requis." }, { status: 400 })
    }
    const existing = await prisma.admin.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ success: false, message: "Cet email est déjà utilisé." }, { status: 409 })
    }
    const hashed = await bcrypt.hash(password, 10)
    const admin = await prisma.admin.create({ data: { email, password: hashed } })
    return NextResponse.json({ success: true, admin: { id: admin.id, email: admin.email } }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erreur lors de la création de l'admin." }, { status: 500 })
  }
}

// Connexion admin
export async function PUT(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email et mot de passe requis." }, { status: 400 })
    }
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) {
      return NextResponse.json({ success: false, message: "Identifiants incorrects." }, { status: 401 })
    }
    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) {
      return NextResponse.json({ success: false, message: "Identifiants incorrects." }, { status: 401 })
    }
    // Définir le cookie de session dans la réponse HTTP
    const response = NextResponse.json({ success: true, admin: { id: admin.id, email: admin.email } })
    response.headers.set(
      "Set-Cookie",
      `admin_session=true; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`
    )
    return response
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erreur lors de la connexion." }, { status: 500 })
  }
}
