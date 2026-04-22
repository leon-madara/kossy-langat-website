"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

const THEME_STORAGE_KEY = "kossy-theme"

function resolveCurrentTheme(): "dark" | "light" {
    const stored = document.documentElement.dataset.theme
    if (stored === "dark" || stored === "light") return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
    duration?: number
}

export function AnimatedThemeToggler({
    className,
    duration = 400,
    ...props
}: AnimatedThemeTogglerProps) {
    const [isDark, setIsDark] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const updateTheme = () => {
            setIsDark(resolveCurrentTheme() === "dark")
        }

        updateTheme()

        const observer = new MutationObserver(updateTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        })

        return () => observer.disconnect()
    }, [])

    const toggleTheme = useCallback(() => {
        const button = buttonRef.current
        if (!button) return

        const { top, left, width, height } = button.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const viewportWidth = window.visualViewport?.width ?? window.innerWidth
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight
        const maxRadius = Math.hypot(
            Math.max(x, viewportWidth - x),
            Math.max(y, viewportHeight - y)
        )

        const applyTheme = () => {
            const next = resolveCurrentTheme() === "dark" ? "light" : "dark"
            setIsDark(next === "dark")
            document.documentElement.setAttribute("data-theme", next)
            try {
                localStorage.setItem(THEME_STORAGE_KEY, next)
            } catch {
                // no-op
            }
        }

        if (typeof document.startViewTransition !== "function") {
            applyTheme()
            return
        }

        const transition = document.startViewTransition(() => {
            flushSync(applyTheme)
        })

        const ready = transition?.ready
        if (ready && typeof ready.then === "function") {
            ready.then(() => {
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${maxRadius}px at ${x}px ${y}px)`,
                        ],
                    },
                    {
                        duration,
                        easing: "ease-in-out",
                        pseudoElement: "::view-transition-new(root)",
                    }
                )
            })
        }
    }, [duration])

    return (
        <button
            type="button"
            ref={buttonRef}
            onClick={toggleTheme}
            className={cn(className)}
            aria-label="Toggle theme"
            {...props}
        >
            {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
