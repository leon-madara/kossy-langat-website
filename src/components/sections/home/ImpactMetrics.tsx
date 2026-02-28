"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { metrics } from "@/data/metrics"
import { MetricCard } from "@/components/ui/MetricCard"
import { SectionLabel } from "@/components/ui/SectionLabel"
import "./ImpactMetrics.css"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export function ImpactMetrics() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered reveal for metrics
            gsap.from(".gsap-reveal", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power2.out",
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="impact-metrics" className="impact-metrics-section">
            <div className="texture-overlay" />

            <div ref={containerRef} className="impact-metrics-container">
                <div className="gsap-reveal">
                    <SectionLabel number="04.0" text="IMPACT" className="mb-8" />
                </div>

                <div className="gsap-reveal">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1] max-w-2xl mb-12">
                        Quantifiable integrity. <span className="italic">Measurable</span> results.
                    </h2>
                </div>

                <div className="metrics-grid">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="gsap-reveal">
                            <MetricCard metric={metric} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
