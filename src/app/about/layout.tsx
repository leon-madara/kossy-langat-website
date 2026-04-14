import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
    title: "About — Structural Engineer Kenya",
    description: "Naomi 'Kossy' Lang'at Chepkoskei — structural engineer, General Manager, and systems orchestrator. Discover the discipline, leadership, and resilience behind the work.",
}

export default function AboutLayout({
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
