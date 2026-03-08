"use client"

import { use, useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { insights } from "@/data/insights"
import "./InsightDetail.css"

export default function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const insight = insights.find((i) => i.slug === slug)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!insight) return

        const ctx = gsap.context(() => {
            gsap.to(".ins-detail-reveal", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.2
            })
        }, containerRef)

        return () => ctx.revert()
    }, [insight])

    if (!insight) return <div className="insight-detail-page">Insight not found</div>

    return (
        <article ref={containerRef} className="insight-detail-page">
            <div className="insight-detail-container">
                <Link href="/insights" className="ins-detail-reveal font-sans text-sm text-accent hover:underline mb-12 block">
                    ← Back to Insights
                </Link>

                <header className="insight-detail-header">
                    <div className="insight-detail-meta ins-detail-reveal">
                        <span className="insight-detail-category">{insight.category}</span>
                        <span className="insight-detail-date">{new Date(insight.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="insight-detail-read-time">{insight.readingTime}</span>
                    </div>
                    <h1 className="insight-detail-title ins-detail-reveal">{insight.title}</h1>
                    <div className="insight-divider ins-detail-reveal" />
                </header>

                <div className="insight-content ins-detail-reveal">
                    <p className="font-playfair text-2xl italic opacity-80 mb-8 border-l-2 border-accent pl-6">
                        {insight.excerpt}
                    </p>
                    <p>
                        The gap between engineering precision and management decision-making is often where budgets explode and timelines collapse. When a structural model is handed over to a project management team that prioritizes speed over curing times, or cost over high-yield steel, the integrity of the entire structure is compromised.
                    </p>
                    <p>
                        It is not enough to design a perfect structure in isolation. The engineer must act as the primary translator between the physics of the building and the economics of the boardroom. Misalignment here is not just a communication error; it is a structural failure waiting to happen.
                    </p>
                    <p>
                        True engineering isn&apos;t just about managing loads—it&apos;s about managing people. By inserting technical oversight directly into the operational hierarchy, we close the fatal gap. We ensure that every financial decision is structurally sound, and every structural decision is financially viable.
                    </p>
                    {/* Note: This is placeholder body content for demonstration. In a real CMS, this would be rich text or MDX. */}
                </div>
            </div>
        </article>
    )
}
