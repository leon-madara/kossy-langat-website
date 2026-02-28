export interface Insight {
    slug: string
    title: string
    category: string
    excerpt: string
    publishedAt: string
    readingTime: string
}

export const insights: Insight[] = [
    {
        slug: "why-most-projects-fail-in-the-gaps",
        title: "Why Most Projects Fail in the Gaps Between People",
        category: "Systems Thinking",
        excerpt:
            "The gap between engineering precision and management decision-making is where budgets explode and timelines collapse. Here is how to close it.",
        publishedAt: "2025-11-15",
        readingTime: "5 min read",
    },
    {
        slug: "eps-panels-misconceptions",
        title: "EPS Panels: Addressing 5 Common Misconceptions in East African Construction",
        category: "EPS Education",
        excerpt:
            "Concerns around strength, fire resistance, and durability are holding back a material that could transform affordable, sustainable construction in the region.",
        publishedAt: "2025-12-02",
        readingTime: "7 min read",
    },
    {
        slug: "women-in-engineering-competence-is-protection",
        title: "Competence Is Protection: A Note to Young Women in Engineering",
        category: "Women in Engineering",
        excerpt:
            "Bias exists. Scrutiny is real. But a technically unassailable engineer in a male-dominated room holds a power that no amount of networking can replicate.",
        publishedAt: "2026-01-20",
        readingTime: "4 min read",
    },
]
