"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SectionLabel } from "@/components/ui/SectionLabel"
import "./Representation.css"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const REP_POINTS = [
    {
        title: "The Reality",
        content: "Scarcity is a metric, not a limit.",
        description: "In an industry where women represent less than 15% of the structural workforce, presence becomes a strategic asset."
    },
    {
        title: "The Objective",
        content: "Visible competence is the ultimate authority.",
        description: "Authority isn't found in titles, but in the structural alignment of the teams we lead and the buildings we deliver."
    },
    {
        title: "The Mission",
        content: "Excellence as the baseline.",
        description: "Every project is an opportunity to prove that technical mastery and human coordination are the same discipline."
    }
]

export function Representation() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".rep-reveal", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="representation" className="representation-section">
            <div className="texture-overlay" />

            <div ref={containerRef} className="representation-container">
                <div className="representation-main">
                    <div className="rep-reveal">
                        <SectionLabel number="05.0" text="REPRESENTATION" className="mb-12" />
                    </div>

                    <h2 className="representation-headline rep-reveal">
                        Representation is <span className="highlight">structural.</span>
                    </h2>

                    <p className="representation-intro rep-reveal">
                        Being the only woman at the table or on-site isn&apos;t about being an exception.
                        It&apos;s about being the standard for how engineering, management, and humans
                        intersect to build the future.
                    </p>
                </div>

                <div className="representation-list">
                    {REP_POINTS.map((point, i) => (
                        <div key={i} className="representation-item rep-reveal">
                            <span className="item-title">{point.title}</span>
                            <h3 className="item-content">{point.content}</h3>
                            <p className="item-description">{point.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
