import Link from "next/link"
import "./ProjectCard.css"

export interface Project {
    slug: string
    title: string
    location: string
    challenge: string
    intervention: string
    result: string
    tags: string[]
    imageUrl?: string
}

interface ProjectCardProps {
    project: Project
    className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
    return (
        <article className={`project-card ${className || ""}`}>
            {/* Image Placeholder */}
            <div className="project-card-image-wrapper">
                <div className="project-card-gradient" />
                <div className="project-card-tags">
                    {project.tags.map((tag) => (
                        <span key={tag} className="project-card-tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="project-card-content">
                <p className="project-card-location">{project.location}</p>
                <h3 className="project-card-title">
                    {project.title}
                </h3>

                <div className="project-card-details">
                    <div>
                        <p className="project-card-block-label">Challenge</p>
                        <p className="project-card-block-text">{project.challenge}</p>
                    </div>
                    <div>
                        <p className="project-card-block-label">Result</p>
                        <p className="project-card-block-text">{project.result}</p>
                    </div>
                </div>

                <Link
                    href={`/work/${project.slug}`}
                    className="project-card-link"
                >
                    View Case Study <span>→</span>
                </Link>
            </div>
        </article>
    )
}
