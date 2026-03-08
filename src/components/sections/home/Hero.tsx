"use client"

import { useRef } from "react"
import Image, { getImageProps } from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import "./Hero.css"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const blurredImageRef = useRef<HTMLDivElement>(null)

    // Refs for GSAP entry animations (replaces Framer Motion fadeUp)
    const eyebrowRef = useRef<HTMLParagraphElement>(null)
    const headlineRef = useRef<HTMLHeadingElement>(null)
    const subheadRef = useRef<HTMLParagraphElement>(null)
    const ctasRef = useRef<HTMLDivElement>(null)
    const formulaRef = useRef<HTMLDivElement>(null)

    const heroAlt = "Kossy - Structural Engineer reviewing blueprints"

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

    useGSAP(() => {
        const section = sectionRef.current
        const content = contentRef.current
        const blurredOverlay = blurredImageRef.current
        if (!section || !content || !blurredOverlay) return

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        // ── Phase A: Entry animations (replaces Framer Motion fadeUp) ──
        const entryTargets = [
            eyebrowRef.current,
            headlineRef.current,
            subheadRef.current,
            ctasRef.current,
            formulaRef.current,
        ].filter(Boolean) as HTMLElement[]

        if (reducedMotion) {
            // Show everything immediately, no blur
            gsap.set(entryTargets, { opacity: 1, y: 0 })
            gsap.set(blurredOverlay, { autoAlpha: 0 })
            return
        }

        // Staggered fade-up on load
        gsap.set(entryTargets, { opacity: 0, y: 28 })
        gsap.to(entryTargets, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.1,
        })

        // ── Phase B: Scroll-driven blur-to-clear + content fade ──
        gsap.set(blurredOverlay, { autoAlpha: 1 })

        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${window.innerHeight * 0.6}`,
                pin: true,
                pinSpacing: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        })

        // 1. Content (words) fades out quickly
        scrollTimeline.to(content, {
            autoAlpha: 0,
            ease: "power1.out",
            duration: 0.4,
        }, 0)

        // 2. Tint/Blur overlay fades out quickly, slightly trailing the words
        scrollTimeline.to(blurredOverlay, {
            autoAlpha: 0,
            ease: "none",
            duration: 0.4,
        }, 0.2)

        // 3. Pad the timeline to 1.0 so we get a "dead zone" of ~24vh where the clear image is held.
        scrollTimeline.set({}, {}, 1.0)
    }, { scope: sectionRef })

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="hero-section"
        >
            <div className="hero-bg" aria-hidden="true">
                <div className="hero-bg__image-wrap">
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

                    <div ref={blurredImageRef} className="hero-bg__blurred-overlay" style={{ position: "absolute", inset: 0 }}>
                        <picture>
                            <source media="(max-width: 767px)" srcSet="/images/hero/1deaMobile-blur.png" />
                            <Image
                                src="/images/hero/6dea-blur.png"
                                alt=""
                                fill
                                className="hero-bg__image"
                                priority
                                sizes="100vw"
                            />
                        </picture>
                    </div>
                </div>
            </div>

            <div className="hero-content">
                <div className="hero-content__container">
                    <div
                        ref={contentRef}
                        className="hero-content__inner"
                    >
                        <p
                            ref={eyebrowRef}
                            className="hero-eyebrow"
                        >
                            <span className="hero-eyebrow__index">01.0</span>
                            <span className="hero-eyebrow__sep" aria-hidden="true">
                                &nbsp;&nbsp;/&nbsp;&nbsp;
                            </span>
                            <span className="hero-eyebrow__role">THE ORCHESTRATOR</span>
                        </p>

                        <h1
                            ref={headlineRef}
                            className="hero-headline"
                        >
                            <span className="hero-headline__line hero-headline__line--minor hero-headline__line--lead">
                                I&nbsp;don&rsquo;t just build&nbsp;
                            </span>
                            <span className="hero-headline__line hero-headline__line--structures">
                                <span className="hero-muted hero-muted--structures">STRUCTURES.</span>
                            </span>
                            <br className="hero-line-break" />
                            <span className="hero-headline__line hero-headline__line--minor hero-headline__line--rest">
                                I&nbsp;build <span className="hero-highlight">alignment</span> between the people&nbsp;who&nbsp;make them&nbsp;possible.
                            </span>
                        </h1>

                        <p
                            ref={subheadRef}
                            className="hero-subhead"
                        >
                            Structural Engineer&nbsp;&nbsp;&middot;&nbsp;&nbsp;General Manager&nbsp;&nbsp;&middot;&nbsp;&nbsp;East Africa.
                        </p>

                        <div
                            ref={ctasRef}
                            className="hero-ctas"
                        >
                            <Link
                                href="/contact"
                                className="hero-cta hero-cta--primary"
                            >
                                Start A Conversation
                            </Link>
                            <Link
                                href="/work"
                                className="hero-cta hero-cta--secondary"
                            >
                                See How I Work
                            </Link>
                        </div>

                        <div
                            ref={formulaRef}
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
