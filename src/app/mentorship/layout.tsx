import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
    title: "For Young Women in Engineering",
    description: "Competence is protection. Practical advice, resilience systems, and structured mentorship guidance for young women navigating careers in structural engineering.",
}

export default function MentorshipLayout({
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
