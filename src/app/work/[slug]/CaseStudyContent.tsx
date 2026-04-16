"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Project } from "@/components/ui/ProjectCard"
import "./CaseStudy.css"

const SITE_URL = "https://kossy.engineer"

interface Props {
    project: Project
}

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function CaseStudyContent({ project }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main title stagger
            const titleChars = document.querySelectorAll(".case-study-title .char");
            if (titleChars.length > 0) {
                gsap.from(titleChars, {
                    y: 40,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.04,
                    ease: "power4.out",
                    delay: 0.1
                });
            } else {
                 gsap.from(".case-study-title", {
                    y: 40,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    delay: 0.1
                });
            }

            // Initial load animations for header elements
            gsap.to(".cs-reveal-header", {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.3
            })

            // ScrollTrigger for content blocks
            const revealBlocks = gsap.utils.toArray(".cs-scroll-reveal") as HTMLElement[];
            revealBlocks.forEach((block) => {
                gsap.fromTo(block,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: block,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });

            // Image Parallax
            const images = gsap.utils.toArray(".cs-parallax-image") as HTMLElement[];
            images.forEach((img) => {
                gsap.to(img, {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5
                    }
                });
            });

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
                    <div className="case-study-header-top cs-reveal-header">
                        <Link href="/work" className="case-study-back-link">
                            <span className="case-study-back-link__arrow" aria-hidden="true">←</span>
                            <span className="case-study-back-link__text">Back</span>
                        </Link>
                        <p className="case-study-location">{project.location}</p>
                    </div>

                    <h1 className="case-study-title" aria-label={project.title}>
                        {project.title.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }} aria-hidden="true">
                                {word.split('').map((char, charIndex) => (
                                    <span key={charIndex} className="char" style={{ display: 'inline-block' }}>
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <div className="case-study-header-meta cs-reveal-header">
                        <div className="case-study-tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="case-study-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="case-study-content-split">
                    {/* Editorial overview — left column */}
                    <div className="case-study-overview-column">
                        <p className="case-study-summary cs-reveal-header">{project.summary}</p>
                        <p className="case-study-overview cs-scroll-reveal">{project.overview}</p>
                    </div>

                    {/* Ruled meta strip — right column sidebar */}
                    <div className="case-study-meta-sidebar cs-scroll-reveal">
                        <div className="case-study-meta-item">
                            <span className="case-study-meta-label">Stage</span>
                            <span className="case-study-meta-value">{project.stage}</span>
                        </div>
                        <div className="case-study-meta-item">
                            <span className="case-study-meta-label">System</span>
                            <span className="case-study-meta-value">{project.system}</span>
                        </div>
                    </div>
                </div>

                {/* Lead image — full width, no container box */}
                {leadImageSrc ? (
                    <div className="case-study-lead-media cs-scroll-reveal">
                        <div className="cs-parallax-container">
                            <Image
                                src={leadImageSrc}
                                alt={project.imageAlt || `${project.title} lead project image`}
                                fill
                                sizes="(min-width: 1024px) 1200px, 100vw"
                                className="case-study-lead-image cs-parallax-image"
                            />
                        </div>
                    </div>
                ) : null}

                {/* Challenge / Intervention  */}
                <div className="case-study-details-grid">
                    <div className="case-study-detail-block cs-scroll-reveal">
                        <h3 className="case-study-block-heading">The Challenge</h3>
                        <p className="case-study-block-text">{project.challenge}</p>
                    </div>

                    <div className="case-study-detail-block cs-scroll-reveal">
                        <h3 className="case-study-block-heading">Our Intervention</h3>
                        <p className="case-study-block-text">{project.intervention}</p>
                    </div>
                </div>

                {/* Result - Standout block */}
                <div className="case-study-result-wrapper cs-scroll-reveal">
                    <div className="case-study-result-block">
                        <span className="case-study-result-label">Executive Result</span>
                        <p className="case-study-result-text">&quot;{project.result}&quot;</p>
                    </div>
                </div>

                {/* Gallery — asymmetrical masonry style */}
                {project.gallery?.length ? (
                    <section className="case-study-gallery">
                        <div className="case-study-gallery-header cs-scroll-reveal">
                            <h3 className="case-study-block-heading">Site Record</h3>
                        </div>
                        <div className="case-study-masonry-grid">
                            {project.gallery.map((image, i) => {
                                const isWide = i % 3 === 0;
                                return (
                                    <figure
                                        key={image.src}
                                        className={`case-study-masonry-item cs-scroll-reveal ${isWide ? 'masonry-wide' : 'masonry-standard'}`}
                                    >
                                        <div className="case-study-gallery-media">
                                            <div className="cs-parallax-container">
                                                <Image
                                                    src={encodeURI(image.src)}
                                                    alt={image.alt}
                                                    fill
                                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                                    className="case-study-gallery-image"
                                                />
                                            </div>
                                        </div>
                                        <figcaption className="case-study-gallery-caption">{image.caption}</figcaption>
                                    </figure>
                                );
                            })}
                        </div>
                    </section>
                ) : null}

                {/* Footer Back Link */}
                <footer className="case-study-footer cs-scroll-reveal">
                    <Link href="/work" className="case-study-back-link">
                        <span className="case-study-back-link__arrow" aria-hidden="true">←</span>
                        <span className="case-study-back-link__text">Back to All Work</span>
                    </Link>
                </footer>

            </div>
        </div>
    )
}
