import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
    title: "Structural Engineering Expertise",
    description: "Structural engineering, EPS systems, operations management, and cost alignment. Explore the capability pillars that define Kossy's approach to building with precision.",
}

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is an EPS 3D panel system?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "An EPS 3D panel system is a structural building technology that uses a rigid expanded polystyrene (EPS) core encased in welded steel wire mesh on both faces. A shotcrete or micro-concrete layer is applied over the mesh, creating a composite structural element that performs like a reinforced concrete slab at significantly reduced dead weight. It is used for walls, slabs, and roofs across residential and commercial projects in Kenya."
            }
        },
        {
            "@type": "Question",
            "name": "How does EPS 3D construction compare to conventional concrete in Kenya?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "EPS 3D panels reduce structural dead load, require less scaffolding and propping, and can be installed faster than conventional RC slab construction. The composite panel system delivers equivalent structural performance to a conventional reinforced concrete slab for typical residential and commercial spans, while enabling a faster construction programme. It has been installed on residential developments and commercial projects including BBS Mall in Eastleigh, Nairobi."
            }
        },
        {
            "@type": "Question",
            "name": "What structural engineering services does Kossy provide in Nairobi?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kossy — operating as General Manager at EPS Manufacturing & Supply Kenya — provides structural engineering leadership, EPS 3D panel system installation and coordination, operations management, and cost alignment for residential and commercial construction projects across Nairobi and East Africa. Services include technical oversight, dynamic load analysis, workforce coordination, and structural value engineering."
            }
        },
        {
            "@type": "Question",
            "name": "Is EPS 3D structurally strong enough for multi-storey buildings?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. EPS 3D panel systems are engineered to meet the same structural performance criteria as conventional reinforced concrete slabs of equivalent span and load conditions. The system has been independently tested and deployed on multi-storey residential and commercial developments in Kenya, including hostel developments and the BBS Mall commercial project in Eastleigh, Nairobi."
            }
        },
        {
            "@type": "Question",
            "name": "Does EPS panel material pose a fire risk in buildings?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In a correctly installed EPS 3D panel, the EPS core is fully encapsulated by the concrete shell on both faces. The fire performance of the composite system meets standard construction fire resistance requirements when properly detailed. The encased EPS core presents no greater fire risk than a timber-framed wall with a plaster finish."
            }
        }
    ]
}

export default function ExpertiseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}
