"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionLabel } from "@/components/ui/SectionLabel"
import "./WorkPage.css"

export default function WorkPage() {
    const containerRef = useRef<HTMLDivElement>(null)

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
            <div className="texture-overlay" />

            <div className="work-container">
                <header className="work-header">
                    <div className="work-reveal">
                        <SectionLabel number="02" text="ALL WORK" className="mb-8" />
                    </div>
                    <h1 className="work-headline work-reveal">
                        Engineering the gap between <span className="italic">vision</span> and reality.
                    </h1>
                </header>

                <div className="work-grid">
                    {projects.map((project) => (
                        <div key={project.slug} className="work-reveal">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
