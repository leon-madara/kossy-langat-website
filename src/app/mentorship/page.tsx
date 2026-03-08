"use client"

import { useEffect, useRef, useState, type Ref } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./MentorshipPage.css"

gsap.registerPlugin(ScrollTrigger)

type AdviceItem = {
    number: string
    strapline: string
    title: string
    text: string
    image: string
    imageAlt: string
    layout: "split-right" | "split-left" | "feature-right"
    numberSide: "left" | "right"
    imagePosition: string
    motionDirection: number
    scaleStart: number
    scaleEnd: number
    detail?: string
}

const ADVICE_ITEMS: AdviceItem[] = [
    {
        number: "01",
        strapline: "Technical Depth First",
        title: "Master Fundamentals",
        text: "Before seeking visibility, build an unshakeable technical foundation. Know your codes, your load paths, your material science. Competence is the only credential that cannot be questioned.",
        image: "/images/mentorship/horizontalScroll1.png",
        imageAlt: "Woman engineer studying structural drawings and technical references at a desk",
        layout: "split-right",
        numberSide: "right",
        imagePosition: "30% center",
        motionDirection: 1,
        scaleStart: 1.15,
        scaleEnd: 1.02,
    },
    {
        number: "02",
        strapline: "Lead Through Language",
        title: "Speak with Clarity",
        text: "In meetings, in reports, on-site. Communication is not a soft skill - it is a structural one. A misunderstood instruction on a construction site is a safety hazard.",
        image: "/images/mentorship/horizontalScroll2c.png",
        imageAlt: "Woman engineer briefing a team on a construction site",
        layout: "split-left",
        numberSide: "left",
        imagePosition: "62% center",
        motionDirection: -1,
        scaleStart: 1.05,
        scaleEnd: 1.18,
    },
    {
        number: "03",
        strapline: "Commercial Fluency",
        title: "Understand Financial Language",
        text: "Budgets, lifecycle costing, ROI. Engineers who only speak in kN and MPa get sidelined. Learn the language of the boardroom to protect the integrity of the building.",
        image: "/images/mentorship/horizontalScroll3.png",
        imageAlt: "Engineer reviewing financial and technical documents across a boardroom table",
        layout: "feature-right",
        numberSide: "left",
        imagePosition: "42% center",
        motionDirection: 1,
        scaleStart: 1.12,
        scaleEnd: 1.0,
        detail: "Boardroom fluency matters as much as technical fluency.",
    },
    {
        number: "04",
        strapline: "Endurance Under Load",
        title: "Build Physical Resilience",
        text: "Construction is physically demanding. The gym is not optional - it is a system for endurance, mental clarity, and stress conversion. Your body supports your mind.",
        image: "/images/mentorship/horizontalScroll4.png",
        imageAlt: "Woman engineer training with controlled strength in a gym",
        layout: "split-left",
        numberSide: "left",
        imagePosition: "70% center",
        motionDirection: -1,
        scaleStart: 1.0,
        scaleEnd: 1.14,
    },
    {
        number: "05",
        strapline: "Systems Over Chaos",
        title: "Develop a Disciplined Routine",
        text: "5:30 AM training. Structured workflows. Consistent review cycles. Discipline is not rigidity - it is freedom from chaos. It is how you remain composed when pressure builds.",
        image: "/images/mentorship/horizontalScroll5c.png",
        imageAlt: "Woman engineer planning her day at an orderly desk in soft morning light",
        layout: "split-left",
        numberSide: "left",
        imagePosition: "68% center",
        motionDirection: -1,
        scaleStart: 1.16,
        scaleEnd: 1.04,
    },
]

const RESILIENCE_SYSTEMS = [
    {
        icon: "T",
        title: "Technical Study Routines",
        text: "Continuous learning, certification pursuit, and staying current with international standards. The industry evolves - you must evolve faster."
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

const formatProgressValue = (value: number) => value.toString().padStart(2, "0")

export default function MentorshipPage() {
    const pageRef = useRef<HTMLDivElement>(null)
    const heroImageRef = useRef<HTMLImageElement>(null)
    const advicePinWrapperRef = useRef<HTMLDivElement>(null)
    const adviceStageRef = useRef<HTMLDivElement>(null)
    const adviceTrackRef = useRef<HTMLDivElement>(null)
    const [activeAdviceIndex, setActiveAdviceIndex] = useState(0)

    const adviceCount = ADVICE_ITEMS.length

    useEffect(() => {
        const ctx = gsap.context(() => {
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

            if (heroImageRef.current && !reducedMotion) {
                gsap.to(heroImageRef.current, {
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

            gsap.to(".m-reveal-hero", {
                y: 0,
                opacity: 1,
                duration: 1.5,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.3,
            })

            gsap.utils.toArray<HTMLElement>(".m-reveal").forEach((el) => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    }
                })
            })

            const realityImg = document.querySelector(".mentor-reality-image img")
            if (realityImg && !reducedMotion) {
                gsap.to(realityImg, {
                    yPercent: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".mentor-reality-image",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                })
            }

            const mm = gsap.matchMedia()

            mm.add("(min-width: 1024px)", () => {
                const advicePinWrapper = advicePinWrapperRef.current
                const adviceStage = adviceStageRef.current
                const adviceTrack = adviceTrackRef.current

                if (!advicePinWrapper || !adviceStage || !adviceTrack || reducedMotion) return

                const panels = Array.from(adviceTrack.querySelectorAll<HTMLElement>(".advice-panel"))
                if (panels.length < 1) return

                const getHeaderOffset = () => {
                    const header = document.querySelector<HTMLElement>(".site-header")
                    const headerHeight = header?.getBoundingClientRect().height ?? 0
                    return Math.round(headerHeight + 24)
                }

                const getTravelDistance = () => Math.max(0, adviceTrack.scrollWidth - adviceStage.clientWidth)

                const trackTween = gsap.to(adviceTrack, {
                    x: () => -getTravelDistance(),
                    ease: "none",
                    scrollTrigger: {
                        id: "mentor-advice-horizontal",
                        trigger: advicePinWrapper,
                        start: () => `top top+=${getHeaderOffset()}`,
                        end: () => `+=${Math.max(getTravelDistance(), window.innerWidth * (adviceCount - 1) * 1.1)}`,
                        pin: true,
                        pinSpacing: true,
                        scrub: 0.5,
                        snap: adviceCount > 1 ? {
                            snapTo: 1 / (adviceCount - 1),
                            duration: { min: 0.4, max: 0.7 },
                            delay: 0.2,
                            ease: "power1.inOut",
                        } : undefined,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const nextIndex = Math.min(
                                adviceCount - 1,
                                Math.max(0, Math.round(self.progress * (adviceCount - 1)))
                            )

                            setActiveAdviceIndex((currentIndex) => (
                                currentIndex === nextIndex ? currentIndex : nextIndex
                            ))
                        },
                    },
                })

                // First panel entrance animation (before horizontal scroll)
                const firstPanel = panels[0]
                if (firstPanel) {
                    const firstMedia = firstPanel.querySelector<HTMLElement>(".advice-panel-media")
                    const firstCardShell = firstPanel.querySelector<HTMLElement>(".advice-panel-card-shell")
                    const firstNumber = firstPanel.querySelector<HTMLElement>(".advice-panel-number")

                    if (firstMedia) {
                        gsap.fromTo(
                            firstMedia,
                            { xPercent: -40, scale: 0.85, opacity: 0 },
                            {
                                xPercent: 0,
                                scale: 1.15,
                                opacity: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: advicePinWrapper,
                                    start: "top bottom",
                                    end: "top center",
                                    scrub: 1,
                                },
                            }
                        )
                    }

                    if (firstCardShell) {
                        gsap.fromTo(
                            firstCardShell,
                            { xPercent: 40, scale: 0.85, opacity: 0 },
                            {
                                xPercent: 0,
                                scale: 1,
                                opacity: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: advicePinWrapper,
                                    start: "top bottom",
                                    end: "top center",
                                    scrub: 1,
                                },
                            }
                        )
                    }

                    if (firstNumber) {
                        gsap.fromTo(
                            firstNumber,
                            { opacity: 0, scale: 0.7 },
                            {
                                opacity: 1,
                                scale: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: advicePinWrapper,
                                    start: "top bottom",
                                    end: "top center",
                                    scrub: 1,
                                },
                            }
                        )
                    }
                }

                // Horizontal scroll parallax for all panels
                panels.forEach((panel, index) => {
                    const direction = Number(panel.dataset.motionDirection ?? "-1")
                    const scaleStart = Number(panel.dataset.scaleStart ?? "1.08")
                    const scaleEnd = Number(panel.dataset.scaleEnd ?? "1")
                    const media = panel.querySelector<HTMLElement>(".advice-panel-media")
                    const cardShell = panel.querySelector<HTMLElement>(".advice-panel-card-shell")
                    const number = panel.querySelector<HTMLElement>(".advice-panel-number")
                    const detail = panel.querySelector<HTMLElement>(".advice-panel-detail")

                    if (media) {
                        gsap.fromTo(
                            media,
                            { xPercent: -6 * direction, scale: scaleStart },
                            {
                                xPercent: 6 * direction,
                                scale: scaleEnd,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: trackTween,
                                    start: "left right",
                                    end: "right left",
                                    scrub: 0.5,
                                },
                            }
                        )
                    }

                    if (cardShell) {
                        gsap.fromTo(
                            cardShell,
                            { xPercent: 14 * direction, yPercent: 10, opacity: 0.7 },
                            {
                                xPercent: -8 * direction,
                                yPercent: -6,
                                opacity: 1,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: trackTween,
                                    start: "left right",
                                    end: "right left",
                                    scrub: 0.5,
                                },
                            }
                        )
                    }

                    if (number) {
                        gsap.fromTo(
                            number,
                            { xPercent: 5 * direction, yPercent: -8, opacity: 0.5 },
                            {
                                xPercent: -5 * direction,
                                yPercent: 5,
                                opacity: 1,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: trackTween,
                                    start: "left right",
                                    end: "right left",
                                    scrub: 0.5,
                                },
                            }
                        )
                    }

                    if (detail) {
                        gsap.fromTo(
                            detail,
                            { xPercent: 12, yPercent: -6, opacity: 0.4 },
                            {
                                xPercent: -10,
                                yPercent: 6,
                                opacity: 1,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: trackTween,
                                    start: "left right",
                                    end: "right left",
                                    scrub: 0.5,
                                },
                            }
                        )
                    }
                })
            })

            mm.add("(max-width: 1023px)", () => {
                setActiveAdviceIndex(0)
            })

            return () => {
                mm.revert()
            }
        }, pageRef)

        return () => {
            ctx.revert()
        }
    }, [adviceCount])

    return (
        <div ref={pageRef} className="mentorship-page">
            <section className="mentor-hero" data-micro-pin="off">
                <div className="mentor-hero-bg">
                    <Image
                        ref={heroImageRef as unknown as Ref<HTMLImageElement>}
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80"
                        alt="Woman engineer reviewing blueprints"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                        unoptimized
                    />
                </div>
                <div className="mentor-hero-content">
                    <p className="mentor-hero-eyebrow m-reveal-hero">FOR YOUNG WOMEN IN ENGINEERING</p>
                    <h1 className="mentor-hero-headline m-reveal-hero">
                        Competence Is
                        <span className="highlight">Protection.</span>
                    </h1>
                    <p className="mentor-hero-sub m-reveal-hero">
                        Engineering is demanding. Bias exists. Scrutiny is real. But preparation builds authority, and authority cannot be taken from you.
                    </p>
                </div>
            </section>

            <section className="mentor-reality" data-micro-pin="off">
                <div className="mentor-container">
                    <div className="mentor-reality-grid">
                        <div className="mentor-reality-image m-reveal">
                            <Image
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                                alt="Woman working at engineering desk"
                                fill
                                style={{ objectFit: "cover" }}
                                unoptimized
                            />
                        </div>
                        <div>
                            <span className="mentor-section-label m-reveal">THE REALITY</span>
                            <h2 className="mentor-section-title m-reveal">
                                The field will test you. That is not a warning - it is a briefing.
                            </h2>
                            <p className="mentor-body-text m-reveal">
                                In structural engineering and construction management, you will walk onto sites where you are the only woman. You will offer technically sound solutions that are questioned not because of their merit, but because of who presented them. You will face scrutiny that your male colleagues never encounter.
                            </p>
                            <p className="mentor-body-text m-reveal">
                                This is not meant to discourage you. This is meant to prepare you. Awareness is the first structural element of resilience.
                            </p>
                            <blockquote className="mentor-quote m-reveal">
                                &ldquo;When I walk onto a site, I am not there to negotiate structural physics. I am there to mandate safety. Competence gave me that right.&rdquo;
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mentor-advice" data-micro-pin="off">
                <div ref={advicePinWrapperRef} className="advice-pin-wrapper">
                    <div className="advice-heading-bar">
                        <div className="mentor-container">
                            <div className="advice-heading-group">
                                <span className="mentor-section-label m-reveal">PRACTICAL ADVICE</span>
                                <h2 className="mentor-section-title m-reveal">
                                    Five principles I wish someone had given me on day one.
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="advice-stage-shell">
                        <div ref={adviceStageRef} className="advice-stage-viewport">
                            <div ref={adviceTrackRef} className="advice-track">
                                {ADVICE_ITEMS.map((item, index) => (
                                    <article
                                        key={item.number}
                                        className={`advice-panel advice-panel--${item.layout} advice-panel--number-${item.numberSide}`}
                                        data-motion-direction={item.motionDirection}
                                        data-scale-start={item.scaleStart}
                                        data-scale-end={item.scaleEnd}
                                    >
                                        <div className="advice-panel-media">
                                            <Image
                                                src={item.image}
                                                alt={item.imageAlt}
                                                fill
                                                priority={index === 0}
                                                sizes="100vw"
                                                className="advice-panel-image"
                                                style={{ objectPosition: item.imagePosition }}
                                            />
                                        </div>

                                        <div className="advice-panel-safe-area">
                                            {item.detail ? (
                                                <p className="advice-panel-detail">{item.detail}</p>
                                            ) : null}

                                            <div className="advice-panel-card-shell">
                                                <span className="advice-panel-number" aria-hidden="true">
                                                    {item.number}
                                                </span>
                                                <div className="advice-panel-card">
                                                    <p className="advice-panel-kicker">{item.strapline}</p>
                                                    <h3 className="advice-panel-title">{item.title}</h3>
                                                    <div className="advice-panel-line" aria-hidden="true" />
                                                    <p className="advice-panel-text">{item.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="advice-progress-shell" aria-live="polite">
                            <div className="advice-progress-rail" aria-hidden="true">
                                {ADVICE_ITEMS.map((item, index) => (
                                    <span
                                        key={item.number}
                                        className={`advice-progress-dot${index === activeAdviceIndex ? " is-active" : ""}`}
                                    />
                                ))}
                            </div>
                            <p className="advice-progress-value">
                                {formatProgressValue(activeAdviceIndex + 1)} / {formatProgressValue(adviceCount)}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mentor-resilience" data-micro-pin="off">
                <div className="mentor-container">
                    <span className="mentor-section-label m-reveal">BUILD YOUR OPERATING SYSTEM</span>
                    <h2 className="mentor-section-title m-reveal">
                        Resilience is not a personality trait. It is an engineered system.
                    </h2>
                    <p className="mentor-body-text m-reveal">
                        Just as a building requires redundancy systems to withstand unexpected loads, you need personal infrastructure to withstand the pressures of this career. These are not suggestions - they are structural requirements.
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

            <section className="mentor-cta" data-micro-pin="off">
                <div className="mentor-container">
                    <h2 className="mentor-cta-headline m-reveal">
                        If you are serious about engineering, I am serious about helping you.
                    </h2>
                    <p className="mentor-cta-text m-reveal">
                        I offer structured mentorship guidance for young women navigating the early stages of their engineering careers. This is not general advice - it is a focused, disciplined engagement based on your specific challenges and goals.
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
