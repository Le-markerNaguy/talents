"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { Users, UserPlus, BarChart3, Settings, LogOut, Search, Download, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import TalentsList from "@/components/admin/talents-list"
import RecommendationsList from "@/components/admin/recommendations-list"
import AdminStats from "@/components/admin/stats"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dashboardStats, setDashboardStats] = useState<{ talentsCount: number; recommendationsCount: number; conversionRate: number } | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setDashboardStats(data)
        setLoadingStats(false)
      })
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && !document.cookie.includes("admin_session=true")) {
      router.replace("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    // Supprimer le cookie de session
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    // Rafraîchir la page pour afficher l'écran de connexion
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/50 border-b">
        <div className="container flex h-16 items-center justify-between">
          <Logo size="md" variant="full" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingStats ? (
                  <div className="animate-pulse text-muted-foreground">Chargement...</div>
                ) : dashboardStats ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Talents inscrits :</span>
                      <span className="font-bold">{dashboardStats.talentsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recommandations :</span>
                      <span className="font-bold">{dashboardStats.recommendationsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taux de conversion :</span>
                      <span className="font-bold">{dashboardStats.conversionRate}%</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground">Aucune statistique.</div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#dashboard">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Tableau de bord
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#talents">
                      <Users className="mr-2 h-5 w-5" />
                      Talents
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#recommendations">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Recommandations
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#settings">
                      <Settings className="mr-2 h-5 w-5" />
                      Paramètres
                    </a>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
                <TabsTrigger value="talents">Talents</TabsTrigger>
                <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bienvenue dans l'administration 15K-Talents</CardTitle>
                      <CardDescription>
                        Gérez les talents, les recommandations et suivez les statistiques de l'initiative.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Talents inscrits</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-3xl font-bold">127</p>
                            <p className="text-sm text-muted-foreground">+12 cette semaine</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Recommandations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-3xl font-bold">85</p>
                            <p className="text-sm text-muted-foreground">+8 cette semaine</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Taux de conversion</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-3xl font-bold">68%</p>
                            <p className="text-sm text-muted-foreground">+5% ce mois-ci</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Talents Tab */}
              <TabsContent value="talents">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Liste des talents</CardTitle>
                      <CardDescription>Gérez les talents inscrits sur la plateforme</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Rechercher..."
                          className="pl-8 w-[200px] md:w-[300px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                        <span className="sr-only">Filtrer</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Exporter</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TalentsList searchQuery={searchQuery} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Recommendations Tab */}
              <TabsContent value="recommendations">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Liste des recommandations</CardTitle>
                      <CardDescription>Gérez les recommandations reçues</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Rechercher..."
                          className="pl-8 w-[200px] md:w-[300px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                        <span className="sr-only">Filtrer</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Exporter</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <RecommendationsList searchQuery={searchQuery} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
