"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { services } from "@/data/expertise"
import { SectionLabel } from "@/components/ui/SectionLabel"
import "./ExpertisePage.css"

export default function ExpertisePage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".exp-reveal", {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="expertise-page">
            <div className="texture-overlay" />

            <div className="expertise-container">
                <header className="expertise-header">
                    <div className="exp-reveal">
                        <SectionLabel number="03" text="OUR EXPERTISE" className="mb-8" />
                    </div>
                    <h1 className="expertise-headline exp-reveal">
                        Precision as a <span className="highlight">Habit.</span><br />
                        Delivery as a <span className="highlight">Mandate.</span>
                    </h1>
                </header>

                <div className="services-grid">
                    {services.map((service, i) => (
                        <div key={service.id} className="service-card exp-reveal">
                            <span className="service-number">0{i + 1}.0</span>
                            <h2 className="service-title">{service.title}</h2>
                            <p className="service-description">{service.description}</p>

                            <div className="capability-list">
                                {service.capabilities.map((cap, j) => (
                                    <div key={j} className="capability-item">
                                        <div className="capability-dot" />
                                        <span>{cap}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
