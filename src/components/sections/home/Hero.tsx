"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./Hero.css"

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.85,
        ease: EASE_OUT,
        delay,
    },
})

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imageWrapRef = useRef<HTMLDivElement>(null)
    const overlayLeftRef = useRef<HTMLDivElement>(null)
    const overlayVignetteRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reducedMotion) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            })

            if (contentRef.current) {
                tl.to(
                    contentRef.current,
                    { opacity: 0, y: -110, ease: "none", duration: 0.35 },
                    0
                )
            }

            if (overlayLeftRef.current) {
                tl.to(overlayLeftRef.current, { opacity: 0.08, ease: "none", duration: 0.35 }, 0)
            }

            if (overlayVignetteRef.current) {
                tl.to(overlayVignetteRef.current, { opacity: 0, ease: "none", duration: 0.35 }, 0)
            }

            if (imageWrapRef.current) {
                tl.to(
                    imageWrapRef.current,
                    {
                        yPercent: 12,
                        scale: 1.08,
                        transformOrigin: "50% 50%",
                        ease: "none",
                        duration: 1,
                    },
                    0
                )
            }

            const gapSection = document.getElementById("gap-problem")
            const gapContent = (gapSection?.lastElementChild as HTMLElement | null) ?? null

            if (gapSection && gapContent) {
                gsap.fromTo(
                    gapContent,
                    { y: 140 },
                    {
                        y: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: gapSection,
                            start: "top bottom",
                            end: "top 55%",
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="hero-section"
        >
            {/* ── Background Photo ─────────────────────────────── */}
            <div className="hero-bg" aria-hidden="true">
                <div ref={imageWrapRef} className="hero-bg__image-wrap will-change-transform">
                <Image
                    src="/images/hero/hero-photo.png"
                    alt="Kossy — Structural Engineer reviewing blueprints"
                    fill
                    priority
                    className="hero-bg__image"
                    sizes="100vw"
                />
                </div>
                {/* Left gradient overlay — darkens the left so the text is legible */}
                <div
                    ref={overlayLeftRef}
                    className="hero-bg__overlay hero-bg__overlay--left will-change-opacity"
                />
                {/* Bottom vignette */}
                <div
                    ref={overlayVignetteRef}
                    className="hero-bg__overlay hero-bg__overlay--vignette will-change-opacity"
                />
            </div>

            {/* ── Content ──────────────────────────────────────── */}
            <div className="texture-overlay hero-texture" aria-hidden="true" />

            <div className="hero-content">
                <div className="hero-content__container">
                    <div
                        ref={contentRef}
                        className="hero-content__inner will-change-transform will-change-opacity"
                    >

                    {/* Eyebrow */}
                    <motion.p
                        {...fadeUp(0.1)}
                        className="hero-eyebrow"
                    >
                        01.0&nbsp;&nbsp;/&nbsp;&nbsp;THE ORCHESTRATOR
                    </motion.p>

                    {/* Headline */}
                    <motion.h1
                        {...fadeUp(0.25)}
                        className="hero-headline"
                    >
                        I&nbsp;don&rsquo;t just build&nbsp;<span className="hero-muted">structures</span>.{" "}
                        <br className="hero-line-break" />
                        I&nbsp;build{" "}
                        <span className="hero-highlight">alignment</span>{" "}
                        between the people&nbsp;who&nbsp;make them&nbsp;possible.
                    </motion.h1>

                    {/* Sub-heading */}
                    <motion.p
                        {...fadeUp(0.4)}
                        className="hero-subhead"
                    >
                        Structural Engineer&nbsp;&nbsp;·&nbsp;&nbsp;General Manager&nbsp;&nbsp;·&nbsp;&nbsp;East Africa.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        {...fadeUp(0.55)}
                        className="hero-ctas"
                    >
                        <Link
                            href="/contact"
                            className="hero-cta hero-cta--primary"
                        >
                            Start a Conversation
                        </Link>
                        <Link
                            href="/work"
                            className="hero-cta hero-cta--secondary"
                        >
                            See How I Work
                        </Link>
                    </motion.div>

                    {/* Tagline formula */}
                    <motion.p
                        {...fadeUp(0.7)}
                        className="hero-formula"
                    >
                        Engineering excellence&nbsp;&nbsp;+&nbsp;&nbsp;Business pragmatism
                        <br />
                        +&nbsp;&nbsp;Worker welfare.
                    </motion.p>
                    </div>
                </div>
            </div>
        </section>
    )
}
