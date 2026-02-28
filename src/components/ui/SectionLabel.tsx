import { cn } from "@/lib/utils"

interface SectionLabelProps {
    number?: string
    text: string
    className?: string
}

export function SectionLabel({ number, text, className }: SectionLabelProps) {
    return (
        <div className={cn("flex items-center gap-3 mb-4", className)}>
            {number && (
                <span className="font-sans text-xs font-medium text-muted tracking-[0.2em]">{number}</span>
            )}
            {number && <span className="text-muted/40">/</span>}
            <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted">{text}</span>
        </div>
    )
}
