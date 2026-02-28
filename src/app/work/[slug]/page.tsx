"use client"

import { use, useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { projects } from "@/data/projects"
import "./CaseStudy.css"

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const project = projects.find((p) => p.slug === slug)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!project) return

        const ctx = gsap.context(() => {
            gsap.to(".cs-reveal", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            })
        }, containerRef)

        return () => ctx.revert()
    }, [project])

    if (!project) return <div className="case-study-page">Project not found</div>

    return (
        <div ref={containerRef} className="case-study-page">
            <div className="texture-overlay" />

            <div className="case-study-container">
                <header className="case-study-header">
                    <Link href="/work" className="cs-reveal font-sans text-sm text-accent hover:underline mb-8 block">
                        ← Back to All Work
                    </Link>
                    <p className="case-study-location cs-reveal">{project.location}</p>
                    <h1 className="case-study-title cs-reveal">{project.title}</h1>
                    <div className="case-study-tags cs-reveal">
                        {project.tags.map((tag) => (
                            <span key={tag} className="case-study-tag">{tag}</span>
                        ))}
                    </div>
                </header>

                <div className="case-study-grid">
                    <div className="cs-reveal">
                        <p className="case-study-block-label">The Challenge</p>
                        <p className="case-study-block-text">{project.challenge}</p>
                    </div>

                    <div className="cs-reveal">
                        <p className="case-study-block-label">Our Intervention</p>
                        <p className="case-study-block-text">{project.intervention}</p>
                    </div>

                    <div className="case-study-result-block cs-reveal">
                        <p className="case-study-block-label case-study-result-label">Executive Result</p>
                        <p className="case-study-result-text">{project.result}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
