import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import { SHARE_IMAGE_METADATA, SITE_URL } from "@/lib/siteMetadata"
import CaseStudyContent from "./CaseStudyContent"

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)
    if (!project) return {}
    return {
        title: project.title,
        description: project.summary,
        openGraph: {
            title: `${project.title} | Kossy`,
            description: project.summary,
            url: new URL(`/work/${project.slug}`, SITE_URL),
            images: [SHARE_IMAGE_METADATA],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | Kossy`,
            description: project.summary,
            images: [SHARE_IMAGE_METADATA],
        },
    }
}

export default async function CaseStudyPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)
    if (!project) notFound()
    return <CaseStudyContent project={project} />
}
