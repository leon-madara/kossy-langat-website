import type { Metadata } from "next"
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your information. Our commitment to data integrity mirrors our commitment to structural integrity.",
}

const privacySections: LegalSection[] = [
    {
        id: "information-collection",
        title: "1. Information Collection",
        content: (
            <>
                <p className="legal-body">
                    We collect information from you when you voluntarily submit it through our
                    contact forms or communication channels. This includes, but is not limited
                    to, your name, email address, phone number, and any project-specific details
                    you choose to provide.
                </p>
                <p className="legal-body">
                    We do not indiscriminately harvest data. The information we gather is strictly
                    limited to what is necessary to evaluate inquiries, respond to mentorship
                    requests, or facilitate professional communication.
                </p>
            </>
        ),
    },
    {
        id: "use-of-information",
        title: "2. Use of Information",
        content: (
            <>
                <p className="legal-body">
                    The information we collect is utilized systematically to:
                </p>
                <ul className="legal-list">
                    <li>Assess the feasibility and alignment of proposed engineering projects.</li>
                    <li>Respond to inquiries regarding speaking engagements or consultancy.</li>
                    <li>Structure and organize mentorship communications.</li>
                    <li>Improve the functional experience of this website.</li>
                </ul>
                <p className="legal-body">
                    Your data is never sold, leased, or distributed to third-party marketing firms.
                    Our operations prioritize integrity over convenience, and this standard extends
                    to data management.
                </p>
            </>
        ),
    },
    {
        id: "data-security",
        title: "3. Data Security",
        content: (
            <>
                <p className="legal-body">
                    We implement standard security measures to protect the integrity of the
                    information you submit. However, no method of transmission over the Internet
                    is entirely secure. While we strive to protect your personal information,
                    we cannot guarantee its absolute security against systemic vulnerabilities.
                </p>
            </>
        ),
    },
    {
        id: "third-party-links",
        title: "4. Third-Party Links",
        content: (
            <>
                <p className="legal-body">
                    This website may contain links to external resources or platforms (e.g., LinkedIn).
                    We hold no responsibility for the privacy practices, content, or structural
                    integrity of these third-party websites. You are encouraged to review the privacy
                    policies of any external site you visit.
                </p>
            </>
        ),
    },
    {
        id: "contact-information",
        title: "5. Contact Information",
        content: (
            <>
                <p className="legal-body">
                    If you have questions regarding this Privacy Policy or require clarification on
                    how your data is handled, please submit a formal inquiry via the Contact page.
                </p>
            </>
        ),
    },
]

export default function PrivacyPolicyPage() {
    return (
        <LegalLayout
            title="Privacy Policy"
            lastUpdated="February 2026"
            sections={privacySections}
        />
    )
}
