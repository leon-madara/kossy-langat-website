import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost"
    size?: "sm" | "md" | "lg"
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                variant === "primary" && "bg-primary text-white hover:bg-primary/90 rounded-sm",
                variant === "secondary" && "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-sm",
                variant === "ghost" && "bg-transparent text-muted hover:text-primary",
                size === "sm" && "px-4 py-2 text-sm",
                size === "md" && "px-6 py-3 text-sm",
                size === "lg" && "px-8 py-4 text-base",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
