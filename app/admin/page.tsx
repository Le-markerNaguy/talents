import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/dashboard"
import AdminLogin from "@/components/admin/login"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "Administration | 15K-Talents",
  description: "Espace d'administration de l'initiative 15K-Talents",
}

export default function AdminPage() {
  // Vérifier si l'utilisateur est connecté
  // Dans un cas réel, vous utiliseriez une solution d'authentification plus robuste
  const isLoggedIn = cookies().has("admin_session")

  return <div className="min-h-screen bg-mesh">{isLoggedIn ? <AdminDashboard /> : <AdminLogin />}</div>
}
