import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
    title: {
        default: "Work & Case Studies | Kossy",
        template: "%s | Kossy",
    },
    description: "Real EPS 3D and structural engineering case studies across commercial, residential, hostel, and private residence delivery.",
}

export default function WorkLayout({
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
