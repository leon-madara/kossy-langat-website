import Link from "next/link"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { AnimatedReveal } from "@/components/shared/AnimatedReveal"
import "./FeaturedProjects.css"

export function FeaturedProjects() {
    return (
        <section id="featured-projects" className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
                    <div className="max-w-2xl">
                        <AnimatedReveal direction="up">
                            <SectionLabel number="03.0" text="FEATURED WORK" className="mb-6" />
                        </AnimatedReveal>
                        <AnimatedReveal direction="up" delay={0.1}>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1]">
                                Execution over <span className="italic">abstraction</span>.
                            </h2>
                        </AnimatedReveal>
                    </div>
                    <AnimatedReveal direction="up" delay={0.2}>
                        <Link
                            href="/work"
                            className="group font-sans text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-2"
                        >
                            View all case studies
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </AnimatedReveal>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {projects.slice(0, 3).map((project, index) => (
                        <AnimatedReveal
                            key={project.slug}
                            direction="up"
                            delay={0.3 + index * 0.1}
                        >
                            <ProjectCard project={project} className="h-full" />
                        </AnimatedReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
