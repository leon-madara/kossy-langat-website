"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import MentorshipSubNav from "@/components/layout/MentorshipSubNav"
import PracticalAdviceSlider from "@/components/sections/PracticalAdviceSlider"
import "./MentorshipPage.css"

gsap.registerPlugin(ScrollTrigger, SplitText)

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const RESILIENCE_SYSTEMS = [
    {
        icon: "T",
        title: "Technical Study Routines",
        text: "Continuous learning, certification pursuit, and staying current with international standards. The industry evolves — you must evolve faster."
    },
    {
        icon: "F",
        title: "Fitness Discipline",
        text: "Physical endurance directly supports mental endurance. Progressive overload in the gym mirrors structural load principles. Controlled stress builds strength."
    },
    {
        icon: "N",
        title: "Professional Networks",
        text: "Find mentors. Build peer circles. Join industry associations. Isolation accelerates burnout. Connection accelerates growth."
    },
    {
        icon: "R",
        title: "Continuous Refinement",
        text: "Never stop sharpening the saw. Review past projects critically. Identify patterns. Extract lessons. Apply them to the next system you build."
    },
]

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function MentorshipPage() {
    const pageRef = useRef<HTMLDivElement>(null)
    const heroImageWrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

            // ── Hero parallax ──
            if (heroImageWrapRef.current && !reducedMotion) {
                gsap.to(heroImageWrapRef.current.querySelector("img"), {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".mentor-hero",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                })
            }

            // ── Generic scroll-reveals ──
            gsap.to(".m-reveal-hero", {
                y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power3.out", delay: 0.3,
            })

            gsap.utils.toArray<HTMLElement>(".m-reveal").forEach((el) => {
                gsap.to(el, {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 85%" }
                })
            })

            // ── Intro title SplitText animation ──
            const introTitle = document.querySelector<HTMLElement>(".cs-intro-title")
            if (introTitle && !reducedMotion) {
                const childSplit = new SplitText(introTitle, {
                    type: "lines",
                    linesClass: "split-child",
                })
                new SplitText(introTitle, {
                    type: "lines",
                    linesClass: "split-line",
                })

                gsap.set(childSplit.lines, { yPercent: 100, opacity: 0 })

                gsap.to(childSplit.lines, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".cs-intro",
                        start: "top 70%",
                    }
                })
            }

            // ── Reality image parallax ──
            const realityImg = document.querySelector(".reality-img-wrap img")
            if (realityImg && !reducedMotion) {
                gsap.to(realityImg, {
                    yPercent: -10, ease: "none",
                    scrollTrigger: {
                        trigger: ".reality-img-wrap",
                        start: "top bottom", end: "bottom top", scrub: true,
                    }
                })
            }
        }, pageRef)

        return () => { ctx.revert() }
    }, [])

    return (
        <div ref={pageRef} className="mentorship-page">

            {/* ── HERO ── */}
            <section className="mentor-hero" data-micro-pin="off">
                <div className="mentor-hero-bg" ref={heroImageWrapRef}>
                    <Image
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80"
                        alt="Woman engineer reviewing blueprints"
                        fill priority
                        style={{ objectFit: "cover" }}
                        unoptimized
                    />
                </div>

                {/* Sub-nav sits inside the hero, below the global header */}
                <MentorshipSubNav />

                <div className="mentor-hero-content">
                    <p className="mentor-hero-eyebrow m-reveal-hero">
                        [ A briefing for the women who follow ]
                    </p>
                    <h1 className="mentor-hero-headline m-reveal-hero">
                        Mentorship as a<br />
                        <em>load-bearing</em> structure.
                    </h1>
                    <p className="mentor-hero-sub m-reveal-hero">
                        Five lessons I wish someone had given me on day one. Engineered honestly, delivered without softening.
                    </p>
                    <div className="mentor-hero-scroll m-reveal-hero">
                        <span className="scroll-line" />
                        Scroll to begin
                    </div>
                </div>
            </section>

            {/* ── REALITY ── */}
            <section className="mentor-reality" data-micro-pin="off">
                <div className="mentor-container">
                    <div className="reality-grid">
                        {/* Left column */}
                        <div className="reality-left">
                            <p className="reality-eyebrow m-reveal">
                                [ The Reality / 01 ]
                            </p>
                            <h2 className="reality-title m-reveal">
                                The field will test you.<br />
                                <em>That is not a warning</em> — it is a briefing.
                            </h2>
                            <figure className="reality-figure m-reveal">
                                <div className="reality-img-wrap">
                                    <Image
                                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                                        alt="Woman working at engineering desk"
                                        width={480}
                                        height={640}
                                        className="reality-img"
                                        unoptimized
                                    />
                                </div>
                                <figcaption className="reality-caption">
                                    — On site, year nine
                                </figcaption>
                            </figure>
                        </div>

                        {/* Right column */}
                        <div className="reality-right">
                            <div className="reality-body m-reveal">
                                <p>
                                    In structural engineering and construction management, you will walk onto sites where you are the only woman. You will offer technically sound solutions that are questioned not because of their merit, but because of who presented them. You will face scrutiny your male colleagues never encounter.
                                </p>
                                <p>
                                    This is not meant to discourage you. It is meant to prepare you.<br />
                                    Awareness is the first structural element of resilience.
                                </p>
                            </div>
                            <figure className="reality-quote m-reveal">
                                <blockquote>
                                    &ldquo;When I walk onto a site, I am not there to negotiate structural physics. I am there to mandate safety. Competence gave me that right.&rdquo;
                                </blockquote>
                                <figcaption>
                                    — Field note, year nine
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRACTICAL ADVICE — CINEMATIC SLIDER ── */}
            <section className="mentor-advice" data-micro-pin="off">
                {/* Intro — scrolls naturally before pin */}
                <div className="cs-intro">
                    <div className="mentor-container">
                        <span className="mentor-section-label m-reveal">PRACTICAL ADVICE</span>
                        <h2 className="cs-intro-title m-reveal">
                            Five principles I wish someone had given me on day one.
                        </h2>
                    </div>
                </div>

                {/* Pinned slider stage */}
                <PracticalAdviceSlider />
            </section>

            {/* ── RESILIENCE ── */}
            <section className="mentor-resilience" data-micro-pin="off">
                <div className="mentor-container">
                    <span className="mentor-section-label m-reveal">BUILD YOUR OPERATING SYSTEM</span>
                    <h2 className="mentor-section-title m-reveal">
                        Resilience is not a personality trait. It is an engineered system.
                    </h2>
                    <p className="mentor-body-text m-reveal">
                        Just as a building requires redundancy systems to withstand unexpected loads, you need personal infrastructure to withstand the pressures of this career.
                    </p>
                    <div className="resilience-grid">
                        {RESILIENCE_SYSTEMS.map((item) => (
                            <div key={item.icon} className="resilience-item m-reveal">
                                <div className="resilience-icon">{item.icon}</div>
                                <div>
                                    <h3 className="resilience-title">{item.title}</h3>
                                    <p className="resilience-text">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="mentor-cta" data-micro-pin="off">
                <div className="mentor-container">
                    <h2 className="mentor-cta-headline m-reveal">
                        If you are serious about engineering, I am serious about helping you.
                    </h2>
                    <p className="mentor-cta-text m-reveal">
                        I offer structured mentorship guidance for young women navigating the early stages of their engineering careers. This is not general advice — it is a focused, disciplined engagement based on your specific challenges and goals.
                    </p>
                    <div className="m-reveal">
                        <Link href="/contact?type=mentorship" className="mentor-cta-button">
                            Request Mentorship
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}
