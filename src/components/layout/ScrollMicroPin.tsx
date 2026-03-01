"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const getHoldDistance = (vh: number) => () => `+=${Math.round(window.innerHeight * (vh / 100))}`

export function ScrollMicroPin() {
    const pathname = usePathname()

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reducedMotion) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            const collectSections = () => {
                const directChildren = Array.from(document.querySelectorAll<HTMLElement>("main > section"))
                const sections = directChildren.length
                    ? directChildren
                    : Array.from(document.querySelectorAll<HTMLElement>("main section"))

                return sections.filter((section) => section.getAttribute("data-micro-pin") !== "off")
            }

            const createPins = (holdVh: number, opts?: { skipIds?: string[] }) => {
                const sections = collectSections()
                const skipIds = new Set(opts?.skipIds ?? [])

                sections.forEach((section, index) => {
                    if (skipIds.has(section.id)) return
                    ScrollTrigger.create({
                        id: `micro-pin:${index}`,
                        trigger: section,
                        start: "top top",
                        end: getHoldDistance(holdVh),
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 0.6,
                        invalidateOnRefresh: true,
                    })
                })
            }

            mm.add("(min-width: 1024px)", () => {
                // Desktop hero uses its own pinned GSAP sequence.
                createPins(6, { skipIds: ["hero"] })
            })

            mm.add("(max-width: 1023px)", () => {
                // Mobile should feel more subtle.
                createPins(3, { skipIds: ["hero"] })
            })

            return () => mm.revert()
        })

        return () => ctx.revert()
    }, [pathname])

    return null
}
