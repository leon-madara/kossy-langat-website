"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionLabel } from "@/components/ui/SectionLabel"
import "./WorkPage.css"

export default function WorkPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardVariants = ["featured", "highlight", "standard", "standard"]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".work-reveal", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="work-page">
            <div className="work-container">
                <header className="work-header">
                    <div className="work-reveal">
                        <SectionLabel number="02" text="ALL WORK" className="mb-8" />
                    </div>
                    <h1 className="work-headline work-reveal">
                        Real projects. Real sites. <span className="italic">Structural delivery</span> that holds up under scrutiny.
                    </h1>
                    <p className="work-subcopy work-reveal">
                        This body of work moves across private residences, commercial construction, hostel development, and live EPS 3D slab installation. Every project below is drawn from built client work, not placeholder narratives.
                    </p>
                </header>

                <div className="work-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project.slug}
                            className={`work-card work-card--${cardVariants[index] ?? "standard"} work-reveal`}
                        >
                            <ProjectCard
                                project={project}
                                gridWaves
                                className={`work-card-frame work-card-frame--${cardVariants[index] ?? "standard"}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
