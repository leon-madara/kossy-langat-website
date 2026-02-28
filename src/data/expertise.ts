export interface Service {
    id: string;
    title: string;
    description: string;
    capabilities: string[];
}

export const services: Service[] = [
    {
        id: "structural-engineering",
        title: "Structural Engineering",
        description: "Technical precision meeting structural integrity. We don't just design buildings; we architect reliability.",
        capabilities: [
            "Rigorous Safety Compliance",
            "Dynamic Load Analysis",
            "Technical Oversight",
            "Material Optimization"
        ]
    },
    {
        id: "eps-systems",
        title: "EPS Panel Systems",
        description: "Advancing construction through lightweight, high-insulation structural solutions that reduce costs without compromising strength.",
        capabilities: [
            "Cost-Efficient Structural Design",
            "Thermal Efficiency Planning",
            "Rapid Implementation Protocols",
            "Resource Scarcity Solutions"
        ]
    },
    {
        id: "operations-management",
        title: "Operations Management",
        description: "Bridging the fatal gap between engineering intent and site execution. We manage the humans who build the machines.",
        capabilities: [
            "Workforce Coordination",
            "Strategic Scheduling",
            "Stakeholder Mediation",
            "Zero-Failure Execution"
        ]
    },
    {
        id: "cost-alignment",
        title: "Cost Alignment",
        description: "Structural engineering is a financial discipline. We realign budgets to ensure safety never becomes a variable of cost.",
        capabilities: [
            "Budget Realignment",
            "Resource Allocation Strategy",
            "Contractor Reconciliation",
            "Structural Value Engineering"
        ]
    }
];
