"use client"

import { useEffect, useRef, type Ref } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./MentorshipPage.css"

gsap.registerPlugin(ScrollTrigger)

const ADVICE_ITEMS = [
    {
        number: "01",
        title: "Master Fundamentals",
        text: "Before seeking visibility, build an unshakeable technical foundation. Know your codes, your load paths, your material science. Competence is the only credential that cannot be questioned."
    },
    {
        number: "02",
        title: "Speak with Clarity",
        text: "In meetings, in reports, on-site. Communication is not a soft skill — it is a structural one. A misunderstood instruction on a construction site is a safety hazard."
    },
    {
        number: "03",
        title: "Understand Financial Language",
        text: "Budgets, lifecycle costing, ROI. Engineers who only speak in kN and MPa get sidelined. Learn the language of the boardroom to protect the integrity of the building."
    },
    {
        number: "04",
        title: "Build Physical Resilience",
        text: "Construction is physically demanding. The gym is not optional — it is a system for endurance, mental clarity, and stress conversion. Your body supports your mind."
    },
    {
        number: "05",
        title: "Develop a Disciplined Routine",
        text: "5:30 AM training. Structured workflows. Consistent review cycles. Discipline is not rigidity — it is freedom from chaos. It is how you remain composed when pressure builds."
    },
]

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

export default function MentorshipPage() {
    const pageRef = useRef<HTMLDivElement>(null)
    const heroImageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero parallax
            if (heroImageRef.current) {
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

            // Hero text entrance
            gsap.to(".m-reveal-hero", {
                y: 0,
                opacity: 1,
                duration: 1.5,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.3,
            })

            // Scroll-driven reveals for all content sections
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

            // Parallax on the reality image
            const realityImg = document.querySelector(".mentor-reality-image img")
            if (realityImg) {
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
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} className="mentorship-page">
            {/* ===== PARALLAX HERO ===== */}
            <section className="mentor-hero">
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

            <div className="texture-overlay" />

            {/* ===== SECTION 1: REALITY ===== */}
            <section className="mentor-reality">
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
                                The field will test you. That is not a warning — it is a briefing.
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

            {/* ===== SECTION 2: PRACTICAL ADVICE ===== */}
            <section className="mentor-advice">
                <div className="mentor-container">
                    <span className="mentor-section-label m-reveal">PRACTICAL ADVICE</span>
                    <h2 className="mentor-section-title m-reveal">
                        Five principles I wish someone had given me on day one.
                    </h2>
                    <div className="advice-grid">
                        {ADVICE_ITEMS.map((item) => (
                            <div key={item.number} className="advice-card m-reveal">
                                <span className="advice-number">{item.number}</span>
                                <h3 className="advice-title">{item.title}</h3>
                                <p className="advice-text">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SECTION 3: RESILIENCE SYSTEMS ===== */}
            <section className="mentor-resilience">
                <div className="mentor-container">
                    <span className="mentor-section-label m-reveal">BUILD YOUR OPERATING SYSTEM</span>
                    <h2 className="mentor-section-title m-reveal">
                        Resilience is not a personality trait. It is an engineered system.
                    </h2>
                    <p className="mentor-body-text m-reveal">
                        Just as a building requires redundancy systems to withstand unexpected loads, you need personal infrastructure to withstand the pressures of this career. These are not suggestions — they are structural requirements.
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

            {/* ===== SECTION 4: MENTORSHIP CTA ===== */}
            <section className="mentor-cta">
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
