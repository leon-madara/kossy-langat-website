import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"
import { insights } from "@/data/insights"

const SITE_URL = "https://kossy.engineer"

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL, priority: 1.0, changeFrequency: "monthly" },
        { url: `${SITE_URL}/work`, priority: 0.9, changeFrequency: "monthly" },
        { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: "yearly" },
        { url: `${SITE_URL}/expertise`, priority: 0.8, changeFrequency: "yearly" },
        { url: `${SITE_URL}/insights`, priority: 0.7, changeFrequency: "weekly" },
        { url: `${SITE_URL}/mentorship`, priority: 0.7, changeFrequency: "yearly" },
        { url: `${SITE_URL}/contact`, priority: 0.6, changeFrequency: "yearly" },
    ]

    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${SITE_URL}/work/${p.slug}`,
        priority: 0.85,
        changeFrequency: "yearly",
    }))

    const insightRoutes: MetadataRoute.Sitemap = insights.map((i) => ({
        url: `${SITE_URL}/insights/${i.slug}`,
        priority: 0.75,
        changeFrequency: "yearly",
    }))

    return [...staticRoutes, ...projectRoutes, ...insightRoutes]
}
