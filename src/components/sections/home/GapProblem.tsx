import { SectionLabel } from "@/components/ui/SectionLabel"
import { AnimatedReveal } from "@/components/shared/AnimatedReveal"

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
        <section id="gap-problem" className="relative py-24 md:py-32 bg-[#1A3636] overflow-hidden">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/textures/grid-pattern.svg')] bg-repeat" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                <AnimatedReveal direction="up">
                    <SectionLabel number="02.0" text="THE GAP" className="mb-8" />
                </AnimatedReveal>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    <AnimatedReveal direction="up" delay={0.1}>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-xl">
                            Most projects fail in the <span className="italic text-powder-petal">spaces</span> between people.
                        </h2>
                    </AnimatedReveal>

                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16">
                        {GAP_POINTS.map((point, index) => (
                            <AnimatedReveal
                                key={point.title}
                                direction="up"
                                delay={0.2 + index * 0.1}
                            >
                                <div className="group">
                                    <span className="block font-sans text-xs font-semibold text-powder-petal/40 mb-4 tracking-widest">
                                        {point.number}
                                    </span>
                                    <h3 className="font-serif text-xl text-white mb-3 group-hover:text-gold-accent transition-colors duration-300">
                                        {point.title}
                                    </h3>
                                    <p className="font-sans text-sm leading-relaxed text-[#DECFC7]/70">
                                        {point.description}
                                    </p>
                                </div>
                            </AnimatedReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
