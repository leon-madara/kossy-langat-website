import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import "./ProjectCard.css"

const ProjectCardGridWaves = dynamic(
    () => import("./ProjectCardGridWaves").then((mod) => mod.ProjectCardGridWaves),
    { ssr: false },
)

export interface Project {
    slug: string
    title: string
    location: string
    summary: string
    stage: string
    system: string
    overview: string
    challenge: string
    intervention: string
    result: string
    tags: string[]
    imageUrl?: string
    imageAlt?: string
    gallery?: Array<{
        src: string
        alt: string
        caption: string
    }>
}

interface ProjectCardProps {
    project: Project
    className?: string
    gridWaves?: boolean
}

export function ProjectCard({ project, className, gridWaves = false }: ProjectCardProps) {
    const imageSrc = project.imageUrl ? encodeURI(project.imageUrl) : undefined

    return (
        <article className={`project-card ${className || ""}`}>
            <div className="project-card-media">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={project.imageAlt || `${project.title} case study preview`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="project-card-media__image"
                    />
                ) : (
                    <div className="project-card-media__placeholder" aria-hidden="true" />
                )}

                <div className="project-card-media__gradient" aria-hidden="true" />
                <div className="project-card-media__grid" aria-hidden="true" />
                {gridWaves ? <ProjectCardGridWaves /> : null}
                <div className="project-card-tags">
                    {project.tags.map((tag) => (
                        <span key={tag} className="project-card-tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="project-card-content">
                <p className="project-card-location">{project.location}</p>
                <h3 className="project-card-title">
                    {project.title}
                </h3>

                <div className="project-card-intervention">
                    <span className="project-card-intervention-line" aria-hidden="true" />
                    <p className="project-card-block-label">Intervention</p>
                    <p className="project-card-intervention-text">{project.intervention}</p>
                </div>

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
                    <span className="project-card-link__text">View Case Study</span>
                    <span className="project-card-link__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                            <path
                                d="M5 12h12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                            />
                            <path
                                d="M13 6l6 6-6 6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </Link>
            </div>
        </article>
    )
}
