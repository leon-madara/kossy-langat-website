"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { metrics } from "@/data/metrics"
import { MetricCard } from "@/components/ui/MetricCard"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { AnimatedReveal } from "@/components/shared/AnimatedReveal"
import "./ImpactMetrics.css"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const parseMetricValue = (value: string) => {
    const match = value.trim().match(/^(\d+)([A-Za-z]+)?(\+)?$/)
    if (!match) return null

    return {
        end: Number(match[1]),
        unit: match[2] ?? "",
        suffix: match[3] ?? "",
    }
}

const formatMetricValue = (value: number, unit: string, suffix: string) =>
    `${Math.round(value)}${unit}${suffix}`

export function ImpactMetrics() {
    const sectionRef = useRef<HTMLElement>(null)
    const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

    useGSAP(() => {
        const section = sectionRef.current
        if (!section) return

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reducedMotion) return

        const counters = metrics
            .map((metric, index) => {
                const node = valueRefs.current[index]
                const parsed = parseMetricValue(metric.value)
                if (!node || !parsed) return null

                return { node, parsed }
            })
            .filter((counter): counter is { node: HTMLSpanElement; parsed: NonNullable<ReturnType<typeof parseMetricValue>> } => Boolean(counter))

        if (counters.length === 0) return

        counters.forEach(({ node, parsed }) => {
            node.textContent = formatMetricValue(0, parsed.unit, parsed.suffix)
        })

        ScrollTrigger.create({
            trigger: section,
            start: "top 72%",
            once: true,
            onEnter: () => {
                const timeline = gsap.timeline({
                    defaults: {
                        duration: 1.2,
                        ease: "power2.out",
                    },
                })

                counters.forEach(({ node, parsed }, index) => {
                    const counter = { value: 0 }

                    timeline.to(counter, {
                        value: parsed.end,
                        snap: { value: 1 },
                        onUpdate: () => {
                            node.textContent = formatMetricValue(counter.value, parsed.unit, parsed.suffix)
                        },
                        onComplete: () => {
                            node.textContent = formatMetricValue(parsed.end, parsed.unit, parsed.suffix)
                        },
                    }, index * 0.08)
                })
            },
        })
    }, { scope: sectionRef })

    return (
        <section
            ref={sectionRef}
            id="impact-metrics"
            className="impact-metrics-section"
            data-micro-pin="off"
        >
            <div className="impact-metrics-container">
                <AnimatedReveal direction="up">
                    <SectionLabel number="04.0" text="IMPACT" className="mb-8" />
                </AnimatedReveal>

                <AnimatedReveal direction="up" delay={0.1}>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1] max-w-2xl mb-12">
                        Quantifiable integrity. <span className="italic">Measurable</span> results.
                    </h2>
                </AnimatedReveal>

                <div className="metrics-grid">
                    {metrics.map((metric, index) => (
                        <AnimatedReveal
                            key={metric.label}
                            direction="up"
                            delay={0.2 + index * 0.1}
                        >
                            <MetricCard
                                metric={metric}
                                valueRef={(node) => {
                                    valueRefs.current[index] = node
                                }}
                            />
                        </AnimatedReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
