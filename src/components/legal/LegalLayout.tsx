"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import "./LegalPage.css"

gsap.registerPlugin(ScrollTrigger)

export interface LegalSection {
    id: string
    title: string
    content: React.ReactNode
}

interface LegalLayoutProps {
    title: string
    lastUpdated: string
    sections: LegalSection[]
}

export function LegalLayout({ title, lastUpdated, sections }: LegalLayoutProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const navLineRef = useRef<HTMLDivElement>(null)
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Reveal header
            gsap.from(".legal-header", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
            })

            // 2. Reveal text blocks sequentially on scroll
            gsap.utils.toArray<HTMLElement>(".l-reveal").forEach((el) => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                    },
                })
            })

            // 3. Setup ScrollTrigger for active section tracking
            const sectionElements = gsap.utils.toArray(".legal-section") as HTMLElement[]

            sectionElements.forEach((section) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 40%", // when top of section hits 40% from top of viewport
                    end: "bottom 40%",
                    onEnter: () => setActiveSection(section.id),
                    onEnterBack: () => setActiveSection(section.id),
                })
            })

            // 4. Animated vertical line progress
            if (navLineRef.current) {
                gsap.to(navLineRef.current, {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".legal-content-wrapper",
                        start: "top 30%",
                        end: "bottom 70%",
                        scrub: true,
                    }
                })
            }

        }, containerRef)

        return () => ctx.revert()
    }, [])

    // Handle smooth scrolling to internal links
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            // Account for fixed header height + some padding
            const y = element.getBoundingClientRect().top + window.scrollY - 100
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    return (
        <>
            <Header />
            <main ref={containerRef} className="legal-page">
                {/* Ambient background effect */}
                <div className="legal-ambient-glow" />
                <div className="texture-overlay" />

                <div className="legal-container">

                    {/* Sticky Sidebar Navigation (Desktop only) */}
                    <aside className="legal-sidebar">
                        <h3 className="legal-tracker-title">Contents</h3>
                        <ul className="legal-nav-list">
                            {/* Dynamic progress line */}
                            <div
                                ref={navLineRef}
                                className="legal-nav-progress"
                                style={{ transform: "scaleY(0)" }}
                            />

                            {sections.map((section) => (
                                <li key={`nav-${section.id}`} className="legal-nav-item">
                                    <a
                                        href={`#${section.id}`}
                                        onClick={(e) => handleNavClick(e, section.id)}
                                        className={`legal-nav-link ${activeSection === section.id ? "active" : ""}`}
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Glassmorphism Content Area */}
                    <article className="legal-content-wrapper">
                        <header className="legal-header">
                            <h1 className="legal-title">{title}</h1>
                            <p className="legal-updated">Last Updated: {lastUpdated}</p>
                        </header>

                        <div className="legal-sections">
                            {sections.map((section) => (
                                <section key={section.id} id={section.id} className="legal-section">
                                    <h2 className="legal-h2 l-reveal">{section.title}</h2>
                                    <div className="l-reveal">
                                        {section.content}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </article>

                </div>
            </main>
            <Footer />
        </>
    )
}
