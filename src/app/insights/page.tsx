"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { insights } from "@/data/insights"
import { SectionLabel } from "@/components/ui/SectionLabel"
import "./InsightsPage.css"

export default function InsightsPage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".ins-reveal", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.1
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="insights-page">
            <div className="texture-overlay" />

            <div className="insights-container">
                <header className="insights-header">
                    <div className="ins-reveal">
                        <SectionLabel number="04" text="INSIGHTS & ARTICLES" className="mb-8" />
                    </div>
                    <h1 className="insights-headline ins-reveal">
                        Thoughts on <span className="highlight">Scale,</span> Systems, and Structural Integrity.
                    </h1>
                </header>

                <div className="insights-list">
                    {insights.map((insight) => (
                        <Link
                            key={insight.slug}
                            href={`/insights/${insight.slug}`}
                            className="insight-card ins-reveal"
                        >
                            <div className="insight-meta">
                                <span className="insight-category">{insight.category}</span>
                                <span className="insight-date">{new Date(insight.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span className="insight-read-time">• {insight.readingTime}</span>
                            </div>
                            <h2 className="insight-title">{insight.title}</h2>
                            <p className="insight-excerpt">{insight.excerpt}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
