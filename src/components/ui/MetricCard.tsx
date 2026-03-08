import type { Ref } from "react"
import "./MetricCard.css"

export interface Metric {
    value: string
    label: string
    context?: string
}

interface MetricCardProps {
    metric: Metric
    className?: string
    valueRef?: Ref<HTMLSpanElement>
}

export function MetricCard({ metric, className, valueRef }: MetricCardProps) {
    return (
        <div className={`metric-card ${className || ""}`}>
            <span ref={valueRef} className="metric-value">
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
