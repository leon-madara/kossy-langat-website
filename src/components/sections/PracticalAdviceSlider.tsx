"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./PracticalAdviceSlider.css"

gsap.registerPlugin(ScrollTrigger)

type Principle = {
    number: string
    eyebrow: string
    title: string
    body: string
    imageDark: string
    imageLight: string
}

const principles: Principle[] = [
    {
        number: "01",
        eyebrow: "Technical Depth First",
        title: "Master the fundamentals.",
        body: "Before visibility, build an unshakeable technical foundation. Know your codes, your load paths, your material science. Competence is the only credential that cannot be questioned.",
        imageDark: "/images/mentorship/concept/01-fundamentals.jpg",
        imageLight: "/images/mentorship/concept/01-fundamentals-light.jpg",
    },
    {
        number: "02",
        eyebrow: "Lead Through Language",
        title: "Speak with clarity.",
        body: "In meetings, in reports, on-site — communication is not a soft skill, it is a structural one. A misunderstood instruction on a construction site is a safety hazard.",
        imageDark: "/images/mentorship/concept/02-clarity-dark.jpg",
        imageLight: "/images/mentorship/concept/02-clarity.jpg",
    },
    {
        number: "03",
        eyebrow: "Commercial Fluency",
        title: "Learn the language of money.",
        body: "Budgets, lifecycle costing, ROI. Engineers who only speak in kN and MPa get sidelined. Speak the language of the boardroom to protect the integrity of the building.",
        imageDark: "/images/mentorship/concept/03-commercial.jpg",
        imageLight: "/images/mentorship/concept/03-commercial-light.jpg",
    },
    {
        number: "04",
        eyebrow: "Endurance Under Load",
        title: "Build physical resilience.",
        body: "Construction is physically demanding. The gym is not optional — it is a system for endurance, mental clarity, and stress conversion. Your body supports your mind.",
        imageDark: "/images/mentorship/concept/04-endurance.jpg",
        imageLight: "/images/mentorship/concept/04-endurance-light.jpg",
    },
    {
        number: "05",
        eyebrow: "Systems Over Chaos",
        title: "Engineer your routine.",
        body: "5:30 AM training. Structured workflows. Consistent review cycles. Discipline is not rigidity — it is freedom from chaos. It is how you remain composed when pressure builds.",
        imageDark: "/images/mentorship/concept/05-systems-dark.jpg",
        imageLight: "/images/mentorship/concept/05-systems.jpg",
    },
]

const MAX_CACHED_IMAGES = 3

function chipText(n: number) {
    return `[ Practical Advice / Principle 0${n} of 0${principles.length} ]`
}

function renderTitleHTML(slide: Principle) {
    const escapeHtml = (s: string) =>
        s.replace(/[&<>"']/g, (c) => (
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as Record<string, string>)[c] ?? c
        ))

    return `
    <p class="pas-eyebrow">
      <span data-line class="inline-block">${escapeHtml(slide.eyebrow)}</span>
    </p>
    <h2 class="pas-title">
      <span class="pas-title-line">
        <span data-line class="block">${escapeHtml(slide.title)}</span>
      </span>
    </h2>
    <p class="pas-body">
      <span data-line class="block">${escapeHtml(slide.body)}</span>
    </p>
  `
}

function updateIndicators(container: HTMLElement, activeIndex: number) {
    const rows = container.querySelectorAll<HTMLElement>("[data-idx]")
    const isDark = document.documentElement.getAttribute("data-theme") === "dark"
    // Active: full section color (~17:1). Inactive: --m-mute equivalent (4.67:1 light / 5.32:1 dark)
    const activeColor = isDark ? "hsl(0 0% 95%)" : "hsl(220 18% 6%)"
    const inactiveColor = isDark ? "hsl(220 8% 55%)" : "hsl(220 8% 45%)"
    rows.forEach((row) => {
        const i = Number(row.dataset.idx)
        const marker = row.querySelector<HTMLElement>("[data-marker]")
        const num = row.querySelector<HTMLElement>("[data-num]")
        if (marker) {
            gsap.to(marker, {
                scaleX: i === activeIndex ? 1 : 0,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto",
            })
        }
        if (num) {
            gsap.to(num, {
                color: i === activeIndex ? activeColor : inactiveColor,
                opacity: 1,
                duration: 0.5,
                overwrite: "auto",
            })
        }
    })
}

function getTheme(): "dark" | "light" {
    if (typeof document === "undefined") return "light"
    const dataTheme = document.documentElement.getAttribute("data-theme")
    return dataTheme === "dark" ? "dark" : "light"
}

export default function PracticalAdviceSlider() {
    const sectionRef = useRef<HTMLElement>(null)
    const imagesRef = useRef<HTMLDivElement>(null)
    const titleWrapRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const indicesRef = useRef<HTMLDivElement>(null)
    const chipRef = useRef<HTMLSpanElement>(null)
    const activeRef = useRef<number>(0)
    const themeRef = useRef<"dark" | "light">(getTheme())
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

    // Reactive theme state so JSX re-renders on theme change
    const [currentTheme, setCurrentTheme] = useState<"dark" | "light">(getTheme())

    // Initialize first slide — runs after mount (client-only)
    useEffect(() => {
        const imagesEl = imagesRef.current
        const titleEl = titleWrapRef.current
        if (!imagesEl || !titleEl) return

        const theme = getTheme()
        themeRef.current = theme

        imagesEl.innerHTML = ""
        const img = document.createElement("img")
        img.src = theme === "dark" ? principles[0].imageDark : principles[0].imageLight
        img.alt = principles[0].eyebrow
        img.className = "absolute inset-0 h-full w-full object-cover"
        img.style.willChange = "transform, opacity"
        imagesEl.appendChild(img)

        titleEl.innerHTML = renderTitleHTML(principles[0])
        if (chipRef.current) chipRef.current.textContent = chipText(1)
    }, [])

    // Main scroll animation - only runs once
    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reduced) return

        const section = sectionRef.current
        const imagesEl = imagesRef.current
        const titleEl = titleWrapRef.current
        const progressEl = progressRef.current
        const indicesEl = indicesRef.current
        if (!section || !imagesEl || !titleEl || !progressEl || !indicesEl) return

        const total = principles.length
        gsap.set(progressEl, { scaleY: 0, transformOrigin: "top center" })
        updateIndicators(indicesEl, 0)

        const animateNewSlide = (index: number) => {
            const slide = principles[index]

            // Image transition
            const newImg = document.createElement("img")
            newImg.src = themeRef.current === "dark" ? slide.imageDark : slide.imageLight
            newImg.alt = slide.eyebrow
            newImg.className = "absolute inset-0 h-full w-full object-cover"
            newImg.style.willChange = "transform, opacity"
            gsap.set(newImg, { opacity: 0, scale: 1.12 })
            imagesEl.appendChild(newImg)
            gsap.to(newImg, {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
                overwrite: "auto",
            })

            // Clean up old images
            while (imagesEl.children.length > MAX_CACHED_IMAGES) {
                imagesEl.removeChild(imagesEl.children[0])
            }

            // Text transition
            const oldLines = titleEl.querySelectorAll<HTMLElement>("[data-line]")
            gsap.to(oldLines, {
                yPercent: -110,
                duration: 0.55,
                ease: "power3.in",
                stagger: 0.04,
                overwrite: "auto",
                onComplete: () => {
                    titleEl.innerHTML = renderTitleHTML(slide)
                    const newLines = titleEl.querySelectorAll<HTMLElement>("[data-line]")
                    gsap.fromTo(
                        newLines,
                        { yPercent: 110 },
                        {
                            yPercent: 0,
                            duration: 0.7,
                            ease: "power3.out",
                            stagger: 0.06,
                            overwrite: "auto",
                        }
                    )
                },
            })

            updateIndicators(indicesEl, index)
            if (chipRef.current) chipRef.current.textContent = chipText(index + 1)
        }

        const scrollMultiplier = total * 0.7

        const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * scrollMultiplier}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
                // Update progress bar
                gsap.set(progressEl, {
                    scaleY: self.progress,
                    overwrite: true,
                })

                // Calculate slide index
                const idx = Math.min(total - 1, Math.floor(self.progress * total))
                if (idx !== activeRef.current) {
                    activeRef.current = idx
                    animateNewSlide(idx)
                }
            },
        })

        scrollTriggerRef.current = st

        return () => {
            st.kill()
            scrollTriggerRef.current = null
        }
    }, [])

    // Handle theme changes: swap images and update reactive state
    useEffect(() => {
        const handleThemeChange = () => {
            const newTheme = getTheme()
            if (newTheme === themeRef.current) return

            themeRef.current = newTheme
            setCurrentTheme(newTheme)

            const imagesEl = imagesRef.current
            if (!imagesEl) return

            const slide = principles[activeRef.current] ?? principles[0]
            const newImg = document.createElement("img")
            newImg.src = newTheme === "dark" ? slide.imageDark : slide.imageLight
            newImg.alt = slide.eyebrow
            newImg.className = "absolute inset-0 h-full w-full object-cover"
            newImg.style.willChange = "transform, opacity"
            gsap.set(newImg, { opacity: 0, scale: 1.04 })
            imagesEl.appendChild(newImg)
            gsap.to(newImg, {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
                overwrite: "auto",
            })

            while (imagesEl.children.length > MAX_CACHED_IMAGES) {
                imagesEl.removeChild(imagesEl.children[0])
            }
        }

        const observer = new MutationObserver(handleThemeChange)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        })

        return () => observer.disconnect()
    }, [])

    const isDark = currentTheme === "dark"

    return (
        <section
            ref={sectionRef}
            data-micro-pin="off"
            className="slider-frame relative h-screen w-full overflow-hidden"
            style={{
                backgroundColor: isDark ? "hsl(220 18% 6%)" : "hsl(40 25% 96%)",
                color: isDark ? "hsl(0 0% 95%)" : "hsl(220 18% 6%)",
                willChange: "transform",
            }}
        >
            <div ref={imagesRef} className="absolute inset-0" style={{ willChange: "contents" }} />

            {/* Overlay: lighter tint in dark mode so the image shows through */}
            <div
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? "linear-gradient(90deg, hsl(220 18% 4% / 0.55) 0%, hsl(220 18% 4% / 0.25) 55%, transparent 100%)"
                        : "linear-gradient(90deg, hsl(40 25% 96% / 0.88) 0%, hsl(40 25% 96% / 0.6) 55%, hsl(40 25% 96% / 0.35) 100%)",
                }}
            />

            <div className="pointer-events-none absolute left-1/2 top-24 z-20 -translate-x-1/2 md:left-10 md:top-28 md:translate-x-0">
                <span
                    className="inline-block whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] backdrop-blur-md md:px-4 md:py-2 md:text-[11px] md:tracking-[0.2em]"
                    style={{
                        borderColor: isDark ? "hsl(0 0% 95% / 0.25)" : "hsl(220 18% 6% / 0.2)",
                        background: isDark ? "hsl(220 18% 4% / 0.3)" : "hsl(40 25% 96% / 0.5)",
                    }}
                >
                    <span ref={chipRef}>{chipText(1)}</span>
                </span>
            </div>

            <div className="absolute inset-0 z-10 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
                    <div ref={titleWrapRef} className="max-w-2xl" style={{ willChange: "contents" }} />
                </div>
            </div>

            <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-6 md:right-10 md:flex">
                <div
                    ref={indicesRef}
                    className="flex flex-col gap-5 font-mono text-[11px] uppercase tracking-[0.18em]"
                >
                    {principles.map((p, i) => (
                        <div key={p.number} data-idx={i} className="flex items-center gap-3">
                            <span
                                data-marker
                                className="block h-px w-8 origin-left"
                                style={{
                                    background: "currentColor",
                                    transform: i === 0 ? "scaleX(1)" : "scaleX(0)",
                                    willChange: "transform",
                                }}
                            />
                            <span
                                data-num
                                style={{
                                    color: i === 0 ? undefined : (isDark ? "hsl(220 8% 55%)" : "hsl(220 8% 45%)"),
                                    willChange: "color",
                                }}
                            >
                                {p.number}
                            </span>
                        </div>
                    ))}
                </div>
                <div
                    className="relative h-40 w-px"
                    style={{ background: isDark ? "hsl(0 0% 95% / 0.25)" : "hsl(220 18% 6% / 0.2)" }}
                >
                    <div
                        ref={progressRef}
                        className="absolute left-0 top-0 h-full w-full"
                        style={{ background: "currentColor", willChange: "transform" }}
                    />
                </div>
            </div>
        </section>
    )
}
