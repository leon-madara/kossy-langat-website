import type { Metadata } from "next"
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout"

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms and conditions governing the use of this website, intellectual property rights, professional disclaimers, and mentorship parameters.",
}

const termsSections: LegalSection[] = [
    {
        id: "acceptance-of-terms",
        title: "1. Acceptance of Terms",
        content: (
            <>
                <p className="legal-body">
                    By accessing and utilizing this website, you accept and agree to be bound
                    by the terms and provisions outlined in this agreement. If you do not agree
                    to abide by these conditions, you are not authorized to use or access this
                    platform.
                </p>
            </>
        ),
    },
    {
        id: "intellectual-property",
        title: "2. Intellectual Property",
        content: (
            <>
                <p className="legal-body">
                    All content included on this site, such as structural observations, articles,
                    graphics, logos, and images, is the property of Naomi &quot;Kossy&quot; Lang&apos;at Chepkoskei
                    or its content suppliers and protected by international copyright laws.
                </p>
                <p className="legal-body">
                    The compilation of all content on this site is an exclusive asset and
                    may not be reproduced, duplicated, copied, or exploited for any commercial
                    purpose without express written consent.
                </p>
            </>
        ),
    },
    {
        id: "professional-disclaimer",
        title: "3. Professional Disclaimer",
        content: (
            <>
                <p className="legal-body">
                    The insights and articles provided on this website are intended for informational
                    and educational purposes only. They do not constitute formal engineering advice,
                    diagnostics, or professional consultation.
                </p>
                <p className="legal-body">
                    <strong>No Client Relationship:</strong> Communication initiated through
                    this website does not establish a formal engineer-client relationship until
                    a distinct contractual agreement is executed.
                </p>
            </>
        ),
    },
    {
        id: "mentorship-parameters",
        title: "4. Mentorship Parameters",
        content: (
            <>
                <p className="legal-body">
                    Mentorship inquiries submitted through this platform are subject to review
                    based on capacity and alignment. Submission of an inquiry does not guarantee
                    acceptance into a mentorship engagement. Mentorship terms, expectations, and
                    schedules will be established independently of this platform.
                </p>
            </>
        ),
    },
    {
        id: "limitations-of-liability",
        title: "5. Limitations of Liability",
        content: (
            <>
                <p className="legal-body">
                    In no event shall Naomi &quot;Kossy&quot; Lang&apos;at Chepkoskei be liable for any direct,
                    indirect, incidental, consequential, or punitive damages arising out of your
                    access to, or use of, this website. The platform is provided &quot;as is&quot; without
                    warranties of any kind, either expressed or implied.
                </p>
            </>
        ),
    },
    {
        id: "modifications",
        title: "6. Modifications",
        content: (
            <>
                <p className="legal-body">
                    We reserve the right to revise these Terms of Service at any time without
                    prior notice. By continuing to use this site following such modifications,
                    you agree to be bound by the revised terms.
                </p>
            </>
        ),
    },
]

export default function TermsOfServicePage() {
    return (
        <LegalLayout
            title="Terms of Service"
            lastUpdated="February 2026"
            sections={termsSections}
        />
    )
}
