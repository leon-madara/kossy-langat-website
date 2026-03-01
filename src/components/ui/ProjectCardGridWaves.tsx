"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./ProjectCardGridWaves.css"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export function ProjectCardGridWaves() {
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = rootRef.current
        if (!root) return

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reducedMotion) return

        const card = root.closest(".project-card")
        if (!(card instanceof HTMLElement)) return

        const xBand = root.querySelector(".project-card-grid-wave--x .project-card-grid-wave__band")
        const yBand = root.querySelector(".project-card-grid-wave--y .project-card-grid-wave__band")

        if (!(xBand instanceof HTMLElement) || !(yBand instanceof HTMLElement)) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add("(min-width: 1024px)", () => {
                const xTween = gsap.fromTo(
                    xBand,
                    { xPercent: -160 },
                    { xPercent: 160, duration: 18, ease: "none", repeat: -1, paused: true },
                )

                const yTween = gsap.fromTo(
                    yBand,
                    { yPercent: -160 },
                    { yPercent: 160, duration: 22, ease: "none", repeat: -1, paused: true, delay: 1.2 },
                )

                const st = ScrollTrigger.create({
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    onEnter: () => {
                        xTween.play()
                        yTween.play()
                    },
                    onEnterBack: () => {
                        xTween.play()
                        yTween.play()
                    },
                    onLeave: () => {
                        xTween.pause()
                        yTween.pause()
                    },
                    onLeaveBack: () => {
                        xTween.pause()
                        yTween.pause()
                    },
                })

                if (st.isActive) {
                    xTween.play()
                    yTween.play()
                }

                return () => {
                    st.kill()
                    xTween.kill()
                    yTween.kill()
                }
            })

            mm.add("(max-width: 1023px)", () => {
                const tl = gsap.timeline({ paused: true })

                gsap.set([xBand, yBand], { opacity: 0 })

                tl.fromTo(
                    xBand,
                    { xPercent: -150, opacity: 0 },
                    { xPercent: 150, opacity: 0.22, duration: 2.6, ease: "none" },
                    0,
                )
                tl.to(xBand, { opacity: 0, duration: 0.3, ease: "power1.in" }, 2.2)

                tl.fromTo(
                    yBand,
                    { yPercent: -150, opacity: 0 },
                    { yPercent: 150, opacity: 0.18, duration: 2.9, ease: "none" },
                    0.15,
                )
                tl.to(yBand, { opacity: 0, duration: 0.3, ease: "power1.in" }, 2.55)

                const st = ScrollTrigger.create({
                    trigger: card,
                    start: "top 92%",
                    end: "bottom top",
                    onEnter: () => tl.restart(true),
                    onEnterBack: () => tl.restart(true),
                    onLeave: () => {
                        tl.pause(0)
                        gsap.set([xBand, yBand], { opacity: 0 })
                    },
                    onLeaveBack: () => {
                        tl.pause(0)
                        gsap.set([xBand, yBand], { opacity: 0 })
                    },
                })

                if (st.isActive) {
                    tl.restart(true)
                }

                return () => {
                    st.kill()
                    tl.kill()
                }
            })

            return () => mm.revert()
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={rootRef} className="project-card-grid-waves" aria-hidden="true">
            <span className="project-card-grid-wave project-card-grid-wave--x">
                <span className="project-card-grid-wave__band" />
            </span>
            <span className="project-card-grid-wave project-card-grid-wave--y">
                <span className="project-card-grid-wave__band" />
            </span>
        </div>
    )
}
