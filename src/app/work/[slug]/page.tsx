"use client"

import { use, useEffect, useRef } from "react"
import Image from "next/image"
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

    const leadImageSrc = project.imageUrl ? encodeURI(project.imageUrl) : null

    return (
        <div ref={containerRef} className="case-study-page">
            <div className="case-study-container">
                <header className="case-study-header">
                    <Link href="/work" className="case-study-back-link cs-reveal">
                        <span className="case-study-back-link__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                                <path
                                    d="M19 12H5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M11 6l-6 6 6 6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
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

                <div className="case-study-lead cs-reveal">
                    {leadImageSrc ? (
                        <div className="case-study-lead-media">
                            <Image
                                src={leadImageSrc}
                                alt={project.imageAlt || `${project.title} lead project image`}
                                fill
                                sizes="(min-width: 1024px) 900px, 100vw"
                                className="case-study-lead-image"
                            />
                        </div>
                    ) : null}

                    <div className="case-study-facts">
                        <div>
                            <p className="case-study-block-label">Project Stage</p>
                            <p className="case-study-block-text">{project.stage}</p>
                        </div>
                        <div>
                            <p className="case-study-block-label">Structural System</p>
                            <p className="case-study-block-text">{project.system}</p>
                        </div>
                        <div className="case-study-facts__overview">
                            <p className="case-study-block-label">Overview</p>
                            <p className="case-study-block-text">{project.overview}</p>
                        </div>
                    </div>
                </div>

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

                {project.gallery?.length ? (
                    <section className="case-study-gallery cs-reveal">
                        <div className="case-study-gallery-heading">
                            <p className="case-study-block-label">Project Gallery</p>
                            <p className="case-study-gallery-intro">
                                Selected images from the project record, used here to keep the story tied to real site conditions and built outcomes.
                            </p>
                        </div>

                        <div className="case-study-gallery-grid">
                            {project.gallery.map((image) => (
                                <figure key={image.src} className="case-study-gallery-item">
                                    <div className="case-study-gallery-media">
                                        <Image
                                            src={encodeURI(image.src)}
                                            alt={image.alt}
                                            fill
                                            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
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
