import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/home/Hero"
import { GapProblem } from "@/components/sections/home/GapProblem"
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects"
import { ImpactMetrics } from "@/components/sections/home/ImpactMetrics"
import { Representation } from "@/components/sections/home/Representation"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <GapProblem />
        <FeaturedProjects />
        <ImpactMetrics />
        <Representation />
      </main>
      <Footer />
    </>
  )
}
