"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { AnimatedReveal } from "@/components/shared/AnimatedReveal"
import "./FeaturedProjects.css"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText)
}

export function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement>(null)
    const labelRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const railLineRef = useRef<HTMLSpanElement>(null)
    const ctaRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const heading = headingRef.current
        if (!section || !heading) return

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        if (reducedMotion) return

        const isMobile = window.innerWidth <= 640

        const ctx = gsap.context(() => {
            /* ── Phase A: Section label + SplitText word reveal ──── */

            const split = new SplitText(heading, {
                type: "words",
            })

            const phaseA = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            })

            // Label fades up first
            if (labelRef.current) {
                phaseA.from(labelRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power3.out",
                })
            }

            // Words stagger in, slightly overlapping with label
            phaseA.from(
                split.words,
                {
                    y: 40,
                    opacity: 0,
                    stagger: 0.08,
                    duration: 0.6,
                    ease: "power3.out",
                },
                "-=0.25"
            )

            /* ── Phase B + C: Scrubbed rail line + CTA (desktop only) */

            if (!isMobile && railLineRef.current && ctaRef.current) {
                const railTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        end: "top 40%",
                        scrub: 1,
                        once: true,
                    },
                })

                // Phase B — rail line draws left → right
                railTimeline.to(railLineRef.current, {
                    scaleX: 1,
                    duration: 1,
                    ease: "none",
                })

                // Phase C — CTA reveals at end of rail
                railTimeline.to(
                    ctaRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.15,
                        ease: "power2.out",
                    },
                    0.85
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="featured-projects" className="py-24 md:py-32">
            <div className="featured-projects-grid" aria-hidden="true" />
            <div className="texture-overlay featured-projects-texture" aria-hidden="true" />
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col justify-between gap-4 mb-12 md:mb-16">
                    <div className="max-w-2xl">
                        <div ref={labelRef}>
                            <SectionLabel number="03.0" text="FEATURED WORK" className="mb-6" />
                        </div>
                        <h2
                            ref={headingRef}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1]"
                        >
                            Execution over <span className="italic">abstraction</span>.
                        </h2>
                    </div>
                    <div className="featured-projects-rail">
                        <span
                            ref={railLineRef}
                            className="featured-projects-rail__line"
                            aria-hidden="true"
                        />
                        <Link
                            ref={ctaRef}
                            href="/work"
                            className="featured-projects-rail__cta"
                        >
                            <span className="featured-projects-rail__cta-text">View all case studies</span>
                            <span className="featured-projects-rail__cta-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                                    <path
                                        d="M5 12h12"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M13 6l6 6-6 6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {projects.slice(0, 3).map((project, index) => (
                        <AnimatedReveal
                            key={project.slug}
                            direction="up"
                            delay={0.3 + index * 0.1}
                        >
                            <ProjectCard project={project} className="h-full" />
                        </AnimatedReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
