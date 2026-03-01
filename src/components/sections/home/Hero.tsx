"use client"

import { useEffect, useRef } from "react"
import { getImageProps } from "next/image"
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
    const textureRef = useRef<HTMLDivElement>(null)
    const overlayLeftRef = useRef<HTMLDivElement>(null)
    const overlayVignetteRef = useRef<HTMLDivElement>(null)

    const heroAlt = "Kossy â€” Structural Engineer reviewing blueprints"

    const { props: desktopImageProps } = getImageProps({
        src: "/images/hero/6dea.png",
        alt: heroAlt,
        width: 1308,
        height: 852,
        sizes: "100vw",
        priority: true,
    })

    const { props: mobileImageProps } = getImageProps({
        src: "/images/hero/1deaMobile.png",
        alt: heroAlt,
        width: 561,
        height: 1024,
        sizes: "100vw",
        priority: true,
    })

    const { srcSet: desktopSrcSet, ...desktopImgProps } = desktopImageProps
    const { srcSet: mobileSrcSet } = mobileImageProps

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reducedMotion) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add("(min-width: 1024px)", () => {
                const gapSection = document.getElementById("gap-problem")
                const gapContent = (gapSection?.lastElementChild as HTMLElement | null) ?? null

                // Desktop hero: no pin — image scrolls naturally while the next section "catches up" (parallax cover)
                const FADE_DURATION = 0.28
                const COVER_CATCHUP = 0.34
                const COVER_SETTLE = 0.66

                if (imageWrapRef.current) {
                    gsap.set(imageWrapRef.current, {
                        yPercent: 0,
                        scale: 1,
                        transformOrigin: "50% 50%",
                    })
                }

                if (gapContent) {
                    gsap.set(gapContent, { y: 140 })
                }

                if (gapSection) {
                    gsap.set(gapSection, { y: () => Math.round(window.innerHeight * 0.12) })
                }

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                })

                // Phase A — fade foreground + overlays, keep image static
                if (contentRef.current) {
                    tl.to(contentRef.current, { opacity: 0, ease: "none", duration: FADE_DURATION }, 0)
                }

                if (overlayLeftRef.current) {
                    tl.to(overlayLeftRef.current, { opacity: 0, ease: "none", duration: FADE_DURATION }, 0)
                }

                if (overlayVignetteRef.current) {
                    tl.to(overlayVignetteRef.current, { opacity: 0, ease: "none", duration: FADE_DURATION }, 0)
                }

                if (textureRef.current) {
                    tl.to(textureRef.current, { opacity: 0, ease: "none", duration: FADE_DURATION }, 0)
                }

                if (gapSection) {
                    tl.to(
                        gapSection,
                        {
                            y: () => -Math.round(window.innerHeight * 0.12),
                            ease: "power2.out",
                            duration: COVER_CATCHUP,
                        },
                        FADE_DURATION
                    )
                    tl.to(gapSection, { y: 0, ease: "none", duration: COVER_SETTLE })
                }

                if (gapContent) {
                    tl.to(gapContent, { y: 0, ease: "none", duration: COVER_CATCHUP + COVER_SETTLE }, FADE_DURATION)
                }
            })

            mm.add("(max-width: 1023px)", () => {
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
                            yPercent: 0,
                            scale: 1,
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
            })

            return () => mm.revert()
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="hero-section"
        >
            {/* â”€â”€ Background Photo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div className="hero-bg" aria-hidden="true">
                <div ref={imageWrapRef} className="hero-bg__image-wrap will-change-transform">
                    <picture className="hero-bg__picture">
                        <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
                        <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
                        <img
                            {...desktopImgProps}
                            className="hero-bg__image"
                            alt={heroAlt}
                            loading="eager"
                            fetchPriority="high"
                        />
                    </picture>
                </div>
                {/* Left gradient overlay â€” darkens the left so the text is legible */}
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

            {/* â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div ref={textureRef} className="texture-overlay hero-texture will-change-opacity" aria-hidden="true" />

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
                        <span className="hero-eyebrow__index">01.0</span>
                        <span className="hero-eyebrow__sep" aria-hidden="true">
                            &nbsp;&nbsp;/&nbsp;&nbsp;
                        </span>
                        <span className="hero-eyebrow__role">THE ORCHESTRATOR</span>
                    </motion.p>

                    {/* Headline */}
                    <motion.h1
                        {...fadeUp(0.25)}
                        className="hero-headline"
                    >
                        <span className="hero-headline__line hero-headline__line--minor hero-headline__line--lead">
                            I&nbsp;don&rsquo;t just build&nbsp;
                        </span>
                        <span className="hero-headline__line hero-headline__line--structures">
                            <span className="hero-muted hero-muted--structures">STRUCTURES</span>.
                        </span>
                        <br className="hero-line-break" />
                        <span className="hero-headline__line hero-headline__line--minor hero-headline__line--rest">
                            I&nbsp;build <span className="hero-highlight">alignment</span> between the people&nbsp;who&nbsp;make them&nbsp;possible.
                        </span>
                    </motion.h1>

                    {/* Sub-heading */}
                    <motion.p
                        {...fadeUp(0.4)}
                        className="hero-subhead"
                    >
                        Structural Engineer&nbsp;&nbsp;Â·&nbsp;&nbsp;General Manager&nbsp;&nbsp;Â·&nbsp;&nbsp;East Africa.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        {...fadeUp(0.55)}
                        className="hero-ctas"
                    >
                        <Link
                            href="/contact"
                            className="hero-cta hero-cta--primary cta-conic-border"
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
                    <motion.div
                        {...fadeUp(0.7)}
                        className="hero-formula"
                    >
                        <ul className="hero-formula__list" aria-label="Core formula">
                            <li className="hero-formula__item">
                                <span className="hero-formula__term">Engineering excellence</span>
                            </li>
                            <li className="hero-formula__item">
                                <span className="hero-formula__term">Business pragmatism</span>
                            </li>
                            <li className="hero-formula__item">
                                <span className="hero-formula__term">Worker welfare</span>
                            </li>
                        </ul>
                    </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
