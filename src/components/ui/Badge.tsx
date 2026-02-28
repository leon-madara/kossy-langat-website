import { cn } from "@/lib/utils"

interface BadgeProps {
    label: string
    className?: string
}

export function Badge({ label, className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-muted",
                className
            )}
        >
            {label}
        </span>
    )
}
