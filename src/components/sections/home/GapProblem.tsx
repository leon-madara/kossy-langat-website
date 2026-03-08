"use client"

import { AnimatedReveal } from "@/components/shared/AnimatedReveal"
import "./GapProblem.css"

const GAP_POINTS = [
    {
        title: "Technical vs. Executive",
        description: "Bridging the gap between engineering precision and management decision-making.",
        number: "01",
    },
    {
        title: "Integrity vs. Instant Gain",
        description: "Protecting long-term structural truth against short-term budget shortcuts.",
        number: "02",
    },
    {
        title: "Human Welfare vs. Pure Metrics",
        description: "Aligning workforce morale with peak project performance.",
        number: "03",
    },
    {
        title: "Vision vs. Feasibility",
        description: "Anchoring client expectations in structural reality.",
        number: "04",
    },
]

export function GapProblem() {
    return (
        <section
            id="gap-problem"
            className="gap-problem"
            data-micro-pin="off"
        >
            <div className="gap-problem__container">
                <AnimatedReveal direction="up">
                    <div className="gap-problem__eyebrow">
                        <span className="gap-problem__eyebrow-number">03.0</span>
                        <span className="gap-problem__eyebrow-separator" aria-hidden="true">
                            /
                        </span>
                        <span className="gap-problem__eyebrow-text">THE GAP</span>
                    </div>
                </AnimatedReveal>

                <div className="gap-problem__grid">
                    <AnimatedReveal direction="up" delay={0.1}>
                        <h2 className="gap-problem__headline">
                            Most projects fail in the <span className="gap-problem__headline-emphasis">spaces</span> between people.
                        </h2>
                    </AnimatedReveal>

                    <div className="gap-problem__points">
                        {GAP_POINTS.map((point, index) => (
                            <AnimatedReveal
                                key={point.title}
                                direction="up"
                                delay={0.2 + index * 0.1}
                            >
                                <article className="gap-problem__point">
                                    <span className="gap-problem__point-number">{point.number}</span>
                                    <h3 className="gap-problem__point-title">{point.title}</h3>
                                    <p className="gap-problem__point-description">{point.description}</p>
                                </article>
                            </AnimatedReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
