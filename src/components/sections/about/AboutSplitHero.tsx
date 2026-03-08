"use client"

import { useEffect, useRef } from "react"
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
    const imageColorLayerRef = useRef<HTMLDivElement | null>(null)
    const imageVeilRef = useRef<HTMLDivElement | null>(null)
    const imageOverlayGroupRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const root = rootRef.current
        if (!root) return

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reducedMotion) return

        const ctx = gsap.context(() => {
            const PANEL_DUR = 0.8
            const PANEL_EASE = "power2.inOut"
            const textTargets = gsap.utils.toArray<HTMLElement>(".about-split-hero__reveal-text")

            const tl = gsap.timeline({
                delay: 0.1, 
                defaults: { ease: PANEL_EASE },
            })

            // 1. Initial Setup (Set states immediately to avoid flash)
            gsap.set(textTargets, { opacity: 0, y: 18 })

            // 2. Build Timeline
            
            // Left Bar: Top -> Bottom (inset: top right bottom left)
            // Starts at 100% bottom inset (clipped from bottom up to top)
            if (leftPanelRef.current) {
                tl.fromTo(leftPanelRef.current,
                    { clipPath: "inset(0 0 100% 0)", webkitClipPath: "inset(0 0 100% 0)" },
                    { clipPath: "inset(0 0 0% 0)", webkitClipPath: "inset(0 0 0% 0)", duration: PANEL_DUR },
                    0
                )
            }

            // Accent Bar: Top -> Bottom
            if (accentPanelRef.current) {
                tl.fromTo(accentPanelRef.current,
                    { clipPath: "inset(0 0 100% 0)", webkitClipPath: "inset(0 0 100% 0)" },
                    { clipPath: "inset(0 0 0% 0)", webkitClipPath: "inset(0 0 0% 0)", duration: PANEL_DUR },
                    0
                )
            }

            // Right Bar: Bottom -> Top
            // Starts at 100% top inset (clipped from top down to bottom)
            if (copyPanelRef.current) {
                tl.fromTo(copyPanelRef.current,
                    { clipPath: "inset(100% 0 0 0)", webkitClipPath: "inset(100% 0 0 0)" },
                    { clipPath: "inset(0% 0 0 0)", webkitClipPath: "inset(0% 0 0 0)", duration: PANEL_DUR },
                    0
                )
            }

            // Center Panel (Main Container): Center -> Out
            if (imagePanelRef.current) {
                tl.fromTo(imagePanelRef.current,
                    { clipPath: "inset(50% 0 50% 0)", webkitClipPath: "inset(50% 0 50% 0)" },
                    { clipPath: "inset(0% 0 0% 0)", webkitClipPath: "inset(0% 0 0% 0)", duration: PANEL_DUR },
                    0
                )
            }

            // Color Image Reveal (Over Grayscale): Center -> Out
            if (imageColorLayerRef.current) {
                tl.fromTo(imageColorLayerRef.current,
                    { clipPath: "inset(50% 0 50% 0)", webkitClipPath: "inset(50% 0 50% 0)" },
                    { clipPath: "inset(0% 0 0% 0)", webkitClipPath: "inset(0% 0 0% 0)", duration: PANEL_DUR },
                    0
                )
            }

            // Image Motion (Subtle scale)
            if (imageMotionRef.current) {
                tl.fromTo(imageMotionRef.current,
                    { scale: 1.06 },
                    { scale: 1, duration: PANEL_DUR },
                    0
                )
            }

            // Horizontal Rule
            if (ruleRef.current) {
                tl.fromTo(ruleRef.current,
                    { scaleX: 0, transformOrigin: "0% 50%" },
                    { scaleX: 1, duration: PANEL_DUR },
                    0
                )
            }

            // Veil Fade
            if (imageVeilRef.current) {
                tl.fromTo(imageVeilRef.current,
                    { opacity: 1, scaleY: 0.5, transformOrigin: "50% 50%" },
                    { opacity: 0, scaleY: 1.2, duration: PANEL_DUR },
                    0
                )
            }

            // 3. Text Stagger (Starts after panels finish)
            if (textTargets.length) {
                tl.to(textTargets,
                    { opacity: 1, y: 0, duration: 0.72, ease: "power3.out", stagger: 0.09 },
                    PANEL_DUR
                )
            }

            // 4. Vertical Name Reveal (Left Bar)
            const nameChars = gsap.utils.toArray<HTMLElement>(".about-split-hero__name-char")
            if (nameChars.length) {
                tl.to(nameChars, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.025
                }, PANEL_DUR + 0.3)
            }

            // 5. Hover Animation Setup (Desktop/Tablet)
            if (imagePanelRef.current && imageOverlayGroupRef.current) {
                const group = imageOverlayGroupRef.current
                
                // Initialize mask stops
                gsap.set(group, { 
                    '--mask-p1': '50%', 
                    '--mask-p2': '50%',
                    '--mask-opacity': 1 
                })

                const hoverTl = gsap.timeline({ paused: true })
                hoverTl.to(group, {
                    '--mask-p1': '0%',
                    '--mask-p2': '100%',
                    '--mask-opacity': 0,
                    duration: 0.8,
                    ease: "power2.inOut"
                })

                const onEnter = () => {
                    if (window.innerWidth > 900) hoverTl.play()
                }
                const onLeave = () => {
                    if (window.innerWidth > 900) hoverTl.reverse()
                }

                const panel = imagePanelRef.current
                panel.addEventListener('mouseenter', onEnter)
                panel.addEventListener('mouseleave', onLeave)
                
                return () => {
                    panel.removeEventListener('mouseenter', onEnter)
                    panel.removeEventListener('mouseleave', onLeave)
                }
            }
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={rootRef} className="about-split-hero" aria-label="About intro">
            <div className="about-split-hero__grid">
                <div ref={leftPanelRef} className="about-split-hero__panel about-split-hero__panel--left">
                    <div className="about-split-hero__panel-inner">
                        <div className="mesh-gradient about-split-hero__mesh" aria-hidden="true" />
                        
                        <div className="about-split-hero__name-wrap">
                            <div className="about-split-hero__name-line">
                                {"NAOMI".split("").map((char, i) => (
                                    <span key={i} className="about-split-hero__name-char">
                                        {char}
                                    </span>
                                ))}
                            </div>
                            <div className="about-split-hero__name-line">
                                {"LANGAT".split("").map((char, i) => (
                                    <span key={i} className="about-split-hero__name-char">
                                        {char}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={accentPanelRef} className="about-split-hero__panel about-split-hero__panel--accent">
                    <div className="about-split-hero__panel-inner" />
                </div>

                <div ref={imagePanelRef} className="about-split-hero__panel about-split-hero__panel--image">
                    <div className="about-split-hero__panel-inner">
                        <div ref={imageMotionRef} className="about-split-hero__image-motion">
                            {/* 
                                Background layer: Fixed Grayscale 
                                This remains visible while the color layer expands over it.
                            */}
                            <Image
                                src="/images/about/About.jpeg"
                                alt=""
                                fill
                                sizes="(max-width: 900px) 100vw, 46vw"
                                className="about-split-hero__image about-split-hero__image--gray"
                                priority
                            />
                            
                            {/* 
                                Reveal layer: Color Image
                                Animates from middle-out to "remove" the grayscale.
                            */}
                            <div
                                ref={imageColorLayerRef}
                                className="about-split-hero__image-layer"
                                aria-hidden="true"
                            >
                                <Image
                                    src="/images/about/About.jpeg"
                                    alt="Kossy reviewing structural drawings"
                                    fill
                                    sizes="(max-width: 900px) 100vw, 46vw"
                                    className="about-split-hero__image about-split-hero__image--color"
                                />
                            </div>
                            
                            <div ref={imageVeilRef} className="about-split-hero__veil" aria-hidden="true" />
                            <div ref={imageOverlayGroupRef} className="about-split-hero__overlay-group">
                                <div className="about-split-hero__veil about-split-hero__veil--inner" aria-hidden="true" />
                                <div className="about-split-hero__image-overlay" aria-hidden="true" />
                            </div>
                            <div ref={ruleRef} className="about-split-hero__rule" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                <div ref={copyPanelRef} className="about-split-hero__panel about-split-hero__panel--copy">
                    <div className="about-split-hero__panel-inner">
                        <div className="about-split-hero__copy">
                            <div className="about-split-hero__reveal-text">
                                <div className="about-split-hero__label" aria-label="Section 01: The Philosophy">
                                    <span className="about-split-hero__label-num">01</span>
                                    <span className="about-split-hero__label-sep" aria-hidden="true">
                                        /
                                    </span>
                                    <span className="about-split-hero__label-text">THE PHILOSOPHY</span>
                                </div>
                            </div>
                            <h1 className="about-split-hero__headline about-split-hero__reveal-text">
                                <span className="about-split-hero__headline-line">
                                    I treat ambition as a structural requirement:
                                </span>
                                <span className="about-split-hero__headline-line">
                                    engineered into my workflow through <span className="about-split-hero__highlight">discipline</span> and human alignment.
                                </span>
                            </h1>
                            <p className="about-split-hero__sub about-split-hero__reveal-text">
                                Structural Engineer &middot; General Manager &middot; East Africa
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
