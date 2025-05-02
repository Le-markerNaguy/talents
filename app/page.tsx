import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Sparkles, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import TalentForm from "@/components/talent-form"
import RecommendationForm from "@/components/recommendation-form"
import Carousel from "@/components/carousel"
import { Logo } from "@/components/logo"
import { getCategories, getSectors } from "./actions"
import { seedInitialData } from "./seed-data"

export default async function Home() {
  // Initialiser les données si nécessaire
  await seedInitialData()

  // Récupérer les catégories et secteurs
  const categories = await getCategories()
  const sectors = await getSectors()

  // Images pour le carrousel avec des dimensions plus grandes
  const carouselImages = [
    "/agriculture.avif?height=1200&width=2000",
    "/cuisi.jpeg?height=1200&width=2000",
    "/danse.jpg?height=1200&width=2000",
    "/gé.jpg?height=1200&width=2000",
    "/humouriste.webp?height=1200&width=2000",
    "/ingenieur.jpg?height=1200&width=2000",
    "/invention1.webp?height=1200&width=2000",
    "/ingé.jpg?height=1200&width=2000",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/50 border-b">
        <div className="container flex h-16 items-center justify-between">
          <Logo size="md" variant="full" />
          <nav className="hidden md:flex gap-8">
            <Link
              href="#manifeste"
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              Manifeste
            </Link>
            <Link href="#faq" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">
              FAQ
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              Contact
            </Link>
            <Link href="/admin" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 hero-section">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-white leading-tight">
                    Révélez l'excellence <br />
                    <span className="text-accent">gabonaise</span> cachée
                  </h1>
                  <div className=" my-6 italic">
                    <p className="text-lg md:text-xl text-white/90">
                      "L'avenir appartient à ceux qui croient en la beauté de leurs rêves et en la force de leurs
                      talents."
                    </p>
                  </div>
                  <p className="text-white/80 md:text-xl max-w-xl">
                    Ensemble, donnons vie à une communauté de 15 000 talents d'exception pour façonner le Gabon de
                    demain.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button className="primary-button group" asChild>
                    <a href="#inscription">
                      Je suis un talent
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button className="outline-button border-white text-white hover:bg-white/10" asChild>
                    <a href="#inscription">Je recommande un talent</a>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-xl overflow-hidden ">
                <Carousel images={carouselImages} />
              </div>
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section id="inscription" className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="gradient-text">Rejoignez le mouvement</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Faites partie de cette initiative qui transforme le Gabon en valorisant ses talents exceptionnels.
                Inscrivez-vous ou recommandez un talent en quelques minutes.
              </p>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <Tabs defaultValue="talent" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-full max-w-md grid-cols-2 p-1 rounded-full bg-muted">
                    <TabsTrigger
                      value="recommendation"
                      className="rounded-full py-3 px-4 data-[state=active]:form-tab-active data-[state=inactive]:form-tab-inactive"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <span>Recommander</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="talent"
                      className="rounded-full py-3 px-4 data-[state=active]:form-tab-active data-[state=inactive]:form-tab-inactive"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        <span>M'inscrire</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="talent" className="mt-6">
                  <TalentForm categories={categories} sectors={sectors} />
                </TabsContent>
                <TabsContent value="recommendation" className="mt-6">
                  <RecommendationForm categories={categories} sectors={sectors} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Manifesto Section */}
        <section id="manifeste" className="w-full py-16 md:py-24 lg:py-32 accent-section">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h2 className="text-foreground">Notre Vision</h2>
                  <p className="text-foreground/80 md:text-lg">
                    Le Gabon regorge de talents exceptionnels qui, malgré leur impact significatif, restent dans
                    l'ombre. Notre mission est de révéler ces pépites, de les connecter et de créer un écosystème
                    d'innovation et d'excellence qui transformera notre nation.
                  </p>
                  <p className="text-foreground/80 md:text-lg mt-4">
                    Chaque talent compte. Chaque histoire inspire. Ensemble, nous écrivons un nouveau chapitre pour le
                    Gabon.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/talent.jpg?height=1200&width=2000"
                    alt="Talents gabonais"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="gradient-text">Questions fréquentes</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Tout ce que vous devez savoir sur l'initiative 15K-Talents
              </p>
            </div>

            <div className="mt-12 max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-border">
                  <AccordionTrigger className="text-xl text-foreground hover:text-primary">
                    Qui peut rejoindre 15K-Talents ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Tout citoyen gabonais ou résident au Gabon ayant développé une expertise remarquable, un
                    savoir-faire unique ou un impact significatif dans son domaine, mais qui manque de visibilité ou de
                    reconnaissance institutionnelle.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-border">
                  <AccordionTrigger className="text-xl text-foreground hover:text-primary">
                    Comment fonctionne la recommandation ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Si vous connaissez une personne talentueuse qui mérite d'être reconnue, vous pouvez la recommander
                    en quelques clics. Nous prendrons contact avec elle pour confirmer son intérêt et finaliser son
                    profil.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-border">
                  <AccordionTrigger className="text-xl text-foreground hover:text-primary">
                    Que se passe-t-il après l'inscription ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Après validation de votre profil, vous rejoignez officiellement la communauté 15K-Talents. Vous
                    bénéficierez d'opportunités de mise en réseau, de formations exclusives et de possibilités de
                    collaboration avec d'autres talents exceptionnels.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-border">
                  <AccordionTrigger className="text-xl text-foreground hover:text-primary">
                    Mes données sont-elles protégées ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolument. Nous respectons scrupuleusement la réglementation RGPD. Vos données personnelles sont
                    sécurisées et ne seront jamais partagées avec des tiers sans votre consentement explicite.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-border">
                  <AccordionTrigger className="text-xl text-foreground hover:text-primary">
                    Quel est l'objectif final de cette initiative ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Notre ambition est de créer un réseau puissant de talents gabonais, de valoriser leur expertise et
                    de les intégrer dans un programme d'impact citoyen qui contribuera au développement durable et
                    inclusif du Gabon.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="w-full py-8 md:py-12 bg-gradient-to-r from-primary to-secondary">
        <div className="container flex flex-col gap-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="md" variant="full" className="text-white" />
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-white/80 hover:text-white">
                Mentions légales
              </Link>
              <Link href="#" className="text-sm text-white/80 hover:text-white">
                Confidentialité
              </Link>
              <Link href="mailto:contact@15ktalents.ga" className="text-sm text-white/80 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8">
            <p className="text-sm text-white/70 text-center">
              &copy; {new Date().getFullYear()} Initiative 15K-Talents. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
