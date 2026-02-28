import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
    title: "Expertise",
    description: "Structural engineering, EPS systems, operations management, and cost alignment. Explore the capability pillars that define Kossy's approach to building with precision.",
}

export default function ExpertiseLayout({
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
