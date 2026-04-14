"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import type { Project } from "@/components/ui/ProjectCard"
import "./CaseStudy.css"

const SITE_URL = "https://kossy.engineer"

interface Props {
    project: Project
}

export default function CaseStudyContent({ project }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
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
    }, [])

    const leadImageSrc = project.imageUrl ? encodeURI(project.imageUrl) : null

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Work",
                "item": `${SITE_URL}/work`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": project.title,
                "item": `${SITE_URL}/work/${project.slug}`
            }
        ]
    }

    return (
        <div ref={containerRef} className="case-study-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="case-study-container">

                {/* Header */}
                <header className="case-study-header">
                    <Link href="/work" className="case-study-back-link cs-reveal">
                        <span className="case-study-back-link__arrow" aria-hidden="true">←</span>
                        <span className="case-study-back-link__text">Back to All Work</span>
                    </Link>
                    <p className="case-study-location cs-reveal">{project.location}</p>
                    <h1 className="case-study-title cs-reveal">{project.title}</h1>
                    <div className="case-study-tags cs-reveal">
                        {project.tags.map((tag) => (
                            <span key={tag} className="case-study-tag">{tag}</span>
                        ))}
                    </div>
                    <p className="case-study-summary cs-reveal">{project.summary}</p>
                </header>

                {/* Editorial overview — full-width lede paragraph */}
                <p className="case-study-overview cs-reveal">{project.overview}</p>

                {/* Ruled meta strip — Stage / System */}
                <div className="case-study-meta cs-reveal">
                    <div className="case-study-meta-item">
                        <span className="case-study-meta-label">Stage</span>
                        <span className="case-study-meta-value">{project.stage}</span>
                    </div>
                    <div className="case-study-meta-item">
                        <span className="case-study-meta-label">System</span>
                        <span className="case-study-meta-value">{project.system}</span>
                    </div>
                </div>

                {/* Lead image — full width, no container box */}
                {leadImageSrc ? (
                    <div className="case-study-lead-media cs-reveal">
                        <Image
                            src={leadImageSrc}
                            alt={project.imageAlt || `${project.title} lead project image`}
                            fill
                            sizes="(min-width: 1024px) 900px, 100vw"
                            className="case-study-lead-image"
                        />
                    </div>
                ) : null}

                {/* Challenge / Intervention / Result */}
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

                {/* Gallery — lead full-width, remainder 2-up */}
                {project.gallery?.length ? (
                    <section className="case-study-gallery cs-reveal">
                        <p className="case-study-block-label">Site Record</p>
                        <div className="case-study-gallery-grid">
                            {project.gallery.map((image, i) => (
                                <figure
                                    key={image.src}
                                    className={`case-study-gallery-item${i === 0 ? " case-study-gallery-item--lead" : ""}`}
                                >
                                    <div className="case-study-gallery-media">
                                        <Image
                                            src={encodeURI(image.src)}
                                            alt={image.alt}
                                            fill
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                            className="case-study-gallery-image"
                                        />
                                    </div>
                                    <figcaption className="case-study-gallery-caption">{image.caption}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>
                ) : null}

            </div>
        </div>
    )
}
