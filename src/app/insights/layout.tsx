import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
    title: "Insights — EPS 3D & Structural Engineering",
    description: "Engineering thought leadership, structural analysis, EPS education, and reflections on women in STEM. Articles that demonstrate structured reasoning and calm authority.",
}

export default function InsightsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}
