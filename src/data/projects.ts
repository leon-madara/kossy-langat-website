import { Project } from "@/components/ui/ProjectCard"

export const projects: Project[] = [
    {
        slug: "applewood-hospital",
        title: "Applewood Hospital",
        location: "Nairobi, Kenya",
        tags: ["Structural", "Healthcare", "Operations"],
        challenge:
            "A funding misalignment between the developer and contractor threatened structural safety mid-project.",
        intervention:
            "Mediated between stakeholders to realign the budget, revised the structural plan, and maintained safety compliance without stopping progress.",
        result:
            "Project delivered on time with zero structural failures and full regulatory compliance.",
    },
    {
        slug: "kiambu-residential-complex",
        title: "Kiambu Residential Complex",
        location: "Kiambu, Kenya",
        tags: ["Residential", "EPS Systems", "Cost Alignment"],
        challenge:
            "Structural budget was depleted by 30% due to poor resource allocation and an inadequate lead engineer.",
        intervention:
            "Introduced EPS panel systems to reduce material costs, restructured the construction timeline, and assumed technical oversight.",
        result:
            "Recovered 22% of the lost budget through material optimisation, completing the complex within a revised feasible scope.",
    },
    {
        slug: "abc-logistics-hub",
        title: "ABC Logistics Hub",
        location: "Mombasa, Kenya",
        tags: ["Industrial", "Operations", "Port Logistics"],
        challenge:
            "Strategic coordination failures between on-site workers, port authorities, and management led to severe delays and increased costs.",
        intervention:
            "Implemented a structured communication protocol, co-ordinated directly with port logistics, and restructured workforce scheduling.",
        result:
            "Reduced operational delays by 40%, restoring client confidence and bringing the project to profitable completion.",
    },
]
