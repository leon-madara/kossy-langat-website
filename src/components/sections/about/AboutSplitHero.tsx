"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import Image from "next/image"
import "./AboutSplitHero.css"

export function AboutSplitHero() {
    const rootRef = useRef<HTMLElement | null>(null)
    const leftPanelRef = useRef<HTMLDivElement | null>(null)
    const accentPanelRef = useRef<HTMLDivElement | null>(null)
    const imagePanelRef = useRef<HTMLDivElement | null>(null)
    const copyPanelRef = useRef<HTMLDivElement | null>(null)
    const ruleRef = useRef<HTMLDivElement | null>(null)
    const imageMotionRef = useRef<HTMLDivElement | null>(null)
    const imageGrayLayerRef = useRef<HTMLDivElement | null>(null)
    const imageVeilRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reducedMotion) return

        const ctx = gsap.context(() => {
            const PANEL_DUR = 0.95
            const PANEL_EASE = "power2.inOut"
            const textTargets = gsap.utils.toArray<HTMLElement>(".about-split-hero__reveal-text")

            // Start states (set in layout effect to avoid flashes)
            if (leftPanelRef.current) {
                gsap.set(leftPanelRef.current, {
                    clipPath: "inset(0 0 100% 0)",
                    webkitClipPath: "inset(0 0 100% 0)",
                })
            }

            if (accentPanelRef.current) {
                gsap.set(accentPanelRef.current, {
                    clipPath: "inset(0 0 100% 0)",
                    webkitClipPath: "inset(0 0 100% 0)",
                })
            }

            // Middle panel: bottom → top reveal (opposite direction)
            if (imagePanelRef.current) {
                gsap.set(imagePanelRef.current, {
                    clipPath: "inset(100% 0 0 0)",
                    webkitClipPath: "inset(100% 0 0 0)",
                })
            }

            if (copyPanelRef.current) {
                gsap.set(copyPanelRef.current, {
                    clipPath: "inset(0 0 100% 0)",
                    webkitClipPath: "inset(0 0 100% 0)",
                })
            }

            if (ruleRef.current) {
                gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "0% 50%" })
            }

            if (imageMotionRef.current) {
                gsap.set(imageMotionRef.current, { scale: 1.06, transformOrigin: "50% 50%" })
            }

            // Grayscale starts on, then wipes away bottom → top into color
            if (imageGrayLayerRef.current) {
                gsap.set(imageGrayLayerRef.current, {
                    opacity: 1,
                    clipPath: "inset(0 0 0 0)",
                    webkitClipPath: "inset(0 0 0 0)",
                })
            }

            if (imageVeilRef.current) {
                gsap.set(imageVeilRef.current, { opacity: 1, yPercent: 0 })
            }

            if (textTargets.length) {
                gsap.set(textTargets, { opacity: 0, y: 18 })
            }

            const tl = gsap.timeline({
                delay: 0.05,
                defaults: { ease: PANEL_EASE },
            })

            // Panels move at the same speed; directions alternate (T→B, B→T, T→B).
            tl.to(
                [leftPanelRef.current, accentPanelRef.current, copyPanelRef.current].filter(Boolean),
                { clipPath: "inset(0 0 0% 0)", webkitClipPath: "inset(0 0 0% 0)", duration: PANEL_DUR },
                0
            )
                .to(
                    imagePanelRef.current,
                    { clipPath: "inset(0 0 0% 0)", webkitClipPath: "inset(0 0 0% 0)", duration: PANEL_DUR },
                    0
                )
                .to(imageMotionRef.current, { scale: 1, duration: PANEL_DUR }, 0)
                .to(ruleRef.current, { scaleX: 1, duration: PANEL_DUR, ease: PANEL_EASE }, 0)
                .to(
                    imageGrayLayerRef.current,
                    { clipPath: "inset(0 0 100% 0)", webkitClipPath: "inset(0 0 100% 0)", duration: PANEL_DUR },
                    0
                )
                .set(imageGrayLayerRef.current, { opacity: 0 }, PANEL_DUR + 0.01)
                .to(imageVeilRef.current, { yPercent: -105, opacity: 0, duration: PANEL_DUR }, 0)
                // Text reveals after all panels conclude (stagger allowed)
                .to(
                    textTargets,
                    { opacity: 1, y: 0, duration: 0.72, ease: "power3.out", stagger: 0.09 },
                    PANEL_DUR
                )
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={rootRef} className="about-split-hero" aria-label="About intro">
            <div className="texture-overlay about-split-hero__texture" aria-hidden="true" />
            <div className="about-split-hero__grid">
                <div ref={leftPanelRef} className="about-split-hero__panel about-split-hero__panel--left">
                    <div className="about-split-hero__panel-inner">
                        <div className="mesh-gradient about-split-hero__mesh" aria-hidden="true" />
                    </div>
                </div>

                <div ref={accentPanelRef} className="about-split-hero__panel about-split-hero__panel--accent">
                    <div className="about-split-hero__panel-inner" />
                </div>

                <div ref={imagePanelRef} className="about-split-hero__panel about-split-hero__panel--image">
                    <div className="about-split-hero__panel-inner">
                        <div ref={imageMotionRef} className="about-split-hero__image-motion">
                            <Image
                                src="/images/hero/6dea.png"
                                alt="Kossy reviewing structural drawings"
                                fill
                                priority
                                sizes="(max-width: 900px) 100vw, 46vw"
                                className="about-split-hero__image about-split-hero__image--color"
                            />
                            <div
                                ref={imageGrayLayerRef}
                                className="about-split-hero__image-layer about-split-hero__image-layer--gray"
                                aria-hidden="true"
                            >
                                <Image
                                    src="/images/hero/6dea.png"
                                    alt=""
                                    fill
                                    sizes="(max-width: 900px) 100vw, 46vw"
                                    className="about-split-hero__image about-split-hero__image--gray"
                                />
                            </div>
                            <div ref={imageVeilRef} className="about-split-hero__veil" aria-hidden="true" />
                            <div className="about-split-hero__image-overlay" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                <div ref={copyPanelRef} className="about-split-hero__panel about-split-hero__panel--copy">
                    <div className="about-split-hero__panel-inner">
                        <div className="about-split-hero__copy">
                            <div className="about-split-hero__reveal-text">
                                <div className="about-split-hero__label" aria-label="Section 01: The Engineer">
                                    <span className="about-split-hero__label-num">01</span>
                                    <span className="about-split-hero__label-sep" aria-hidden="true">
                                        /
                                    </span>
                                    <span className="about-split-hero__label-text">THE ENGINEER</span>
                                </div>
                            </div>
                            <h1 className="about-split-hero__headline about-split-hero__reveal-text">
                                <span className="about-split-hero__headline-line">
                                    I don&rsquo;t just build structures.
                                </span>
                                <span className="about-split-hero__headline-line">
                                    I build <span className="about-split-hero__highlight">alignment</span> between the people who make them possible.
                                </span>
                            </h1>
                            <p className="about-split-hero__sub about-split-hero__reveal-text">
                                Structural Engineer &middot; General Manager &middot; East Africa
                            </p>
                        </div>
                    </div>
                </div>

                <div ref={ruleRef} className="about-split-hero__rule" aria-hidden="true" />
            </div>
        </section>
    )
}
