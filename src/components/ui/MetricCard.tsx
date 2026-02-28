import "./MetricCard.css"

export interface Metric {
    value: string
    label: string
    context?: string
}

interface MetricCardProps {
    metric: Metric
    className?: string
}

export function MetricCard({ metric, className }: MetricCardProps) {
    return (
        <div className={`metric-card ${className || ""}`}>
            <span className="metric-value">
                {metric.value}
            </span>
            <span className="metric-label">
                {metric.label}
            </span>
            {metric.context && (
                <span className="metric-context">
                    {metric.context}
                </span>
            )}
        </div>
    )
}
