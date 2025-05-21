import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/dashboard"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "Administration | 15K-Talents",
  description: "Espace d'administration de l'initiative 15K-Talents",
}

export default async function AdminPage() {
  // Vérifier si l'utilisateur est connecté (async)
  const cookieStore = cookies()
  const hasSession = (await cookieStore).has("admin_session")
  if (!hasSession) {
    redirect("/admin/login")
  }
  return <div className="min-h-screen bg-mesh"><AdminDashboard /></div>
}
