"use client"

import { SectionLabel } from "@/components/ui/SectionLabel"
import { AnimatedReveal } from "@/components/shared/AnimatedReveal"
import "./Representation.css"

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
    return (
        <section id="representation" className="representation-section">
            <div className="representation-container">
                <div className="representation-main">
                    <AnimatedReveal direction="up">
                        <SectionLabel number="05.0" text="REPRESENTATION" className="mb-12" />
                    </AnimatedReveal>

                    <AnimatedReveal direction="up" delay={0.1}>
                        <h2 className="representation-headline">
                            Representation is <span className="highlight">structural.</span>
                        </h2>
                    </AnimatedReveal>

                    <AnimatedReveal direction="up" delay={0.2}>
                        <p className="representation-intro">
                            Being the only woman at the table or on-site isn&apos;t about being an exception.
                            It&apos;s about being the standard for how engineering, management, and humans
                            intersect to build the future.
                        </p>
                    </AnimatedReveal>
                </div>

                <div className="representation-list">
                    {REP_POINTS.map((point, i) => (
                        <AnimatedReveal
                            key={i}
                            direction="up"
                            delay={0.3 + i * 0.1}
                        >
                            <div className="representation-item">
                                <span className="item-title">{point.title}</span>
                                <h3 className="item-content">{point.content}</h3>
                                <p className="item-description">{point.description}</p>
                            </div>
                        </AnimatedReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
