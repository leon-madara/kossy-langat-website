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

    const heroAlt = "Kossy — Structural Engineer reviewing blueprints"

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

                // Animation phases as percentages of scroll (0 to 1)
                const FADE_PHASE = 0.20      // 0% - 20%: Fade out content
                const HOLD_PHASE = 0.30      // 20% - 50%: Hold image static (10vh equivalent)
                const PARALLAX_PHASE = 0.50  // 50% - 100%: Image scrolls up, gap catches up

                // Initialize states
                if (imageWrapRef.current) {
                    gsap.set(imageWrapRef.current, {
                        yPercent: 0,
                        scale: 1,
                        transformOrigin: "50% 50%",
                    })
                }

                // Gap section starts below with offset for parallax catch-up effect
                if (gapSection) {
                    gsap.set(gapSection, { y: () => window.innerHeight * 0.15 })
                }

                if (gapContent) {
                    gsap.set(gapContent, { y: 60 })
                }

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=150%", // Extended scroll distance for full animation
                        scrub: 0.5,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                })

                // Phase 1: Fade out hero content (0% - 20%)
                if (contentRef.current) {
                    tl.to(contentRef.current, { 
                        opacity: 0, 
                        ease: "none", 
                        duration: FADE_PHASE 
                    }, 0)
                }

                if (overlayLeftRef.current) {
                    tl.to(overlayLeftRef.current, { 
                        opacity: 0, 
                        ease: "none", 
                        duration: FADE_PHASE 
                    }, 0)
                }

                if (overlayVignetteRef.current) {
                    tl.to(overlayVignetteRef.current, { 
                        opacity: 0, 
                        ease: "none", 
                        duration: FADE_PHASE 
                    }, 0)
                }

                if (textureRef.current) {
                    tl.to(textureRef.current, { 
                        opacity: 0, 
                        ease: "none", 
                        duration: FADE_PHASE 
                    }, 0)
                }

                // Phase 2: HOLD - Image stays static (20% - 50%)
                // No animation on imageWrapRef during this phase - it holds

                // Phase 3: PARALLAX - Image scrolls up while gap catches up (50% - 100%)
                
                // Hero image scrolls up and out of viewport
                if (imageWrapRef.current) {
                    tl.to(imageWrapRef.current, {
                        yPercent: -40, // Moves up out of view
                        scale: 1.05,
                        ease: "power2.in",
                        duration: PARALLAX_PHASE,
                    }, FADE_PHASE + HOLD_PHASE)
                }

                // Gap section catches up faster (parallax cover effect)
                if (gapSection) {
                    tl.to(
                        gapSection,
                        {
                            y: () => -window.innerHeight * 0.15,
                            ease: "power2.out",
                            duration: PARALLAX_PHASE * 0.7, // Faster than image
                        },
                        FADE_PHASE + HOLD_PHASE
                    )
                }

                // Gap content settles into place
                if (gapContent) {
                    tl.to(
                        gapContent, 
                        { 
                            y: 0, 
                            ease: "power2.out", 
                            duration: PARALLAX_PHASE 
                        }, 
                        FADE_PHASE + HOLD_PHASE
                    )
                }

                return () => {
                    ScrollTrigger.getAll().forEach(st => {
                        if (st.vars.trigger === section) st.kill()
                    })
                }
            })

            mm.add("(max-width: 1023px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=125%",
                        scrub: 0.5,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                })

                const FADE_PHASE = 0.25
                const HOLD_PHASE = 0.25
                const PARALLAX_PHASE = 0.50

                // Fade out content
                if (contentRef.current) {
                    tl.to(
                        contentRef.current,
                        { opacity: 0, y: -60, ease: "none", duration: FADE_PHASE },
                        0
                    )
                }

                if (overlayLeftRef.current) {
                    tl.to(overlayLeftRef.current, { opacity: 0.08, ease: "none", duration: FADE_PHASE }, 0)
                }

                if (overlayVignetteRef.current) {
                    tl.to(overlayVignetteRef.current, { opacity: 0, ease: "none", duration: FADE_PHASE }, 0)
                }

                // Hold phase - image stays

                // Parallax - image moves up, gap catches up
                if (imageWrapRef.current) {
                    tl.to(
                        imageWrapRef.current,
                        {
                            yPercent: -35,
                            scale: 1.03,
                            ease: "power2.in",
                            duration: PARALLAX_PHASE,
                        },
                        FADE_PHASE + HOLD_PHASE
                    )
                }

                const gapSection = document.getElementById("gap-problem")
                if (gapSection) {
                    gsap.set(gapSection, { y: window.innerHeight * 0.1 })
                    tl.to(
                        gapSection,
                        {
                            y: -window.innerHeight * 0.1,
                            ease: "power2.out",
                            duration: PARALLAX_PHASE * 0.7,
                        },
                        FADE_PHASE + HOLD_PHASE
                    )
                }

                return () => {
                    ScrollTrigger.getAll().forEach(st => {
                        if (st.vars.trigger === section) st.kill()
                    })
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
            {/* —— Background Photo ————————————————————————————— */}
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

            {/* —— Content ————————————————————————————————————— */}
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
                        Structural Engineer&nbsp;&nbsp;·&nbsp;&nbsp;General Manager&nbsp;&nbsp;·&nbsp;&nbsp;East Africa.
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
