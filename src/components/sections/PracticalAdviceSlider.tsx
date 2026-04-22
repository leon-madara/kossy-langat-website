"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
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

function escapeHtml(s: string) {
    return s.replace(/[&<>"']/g, (c) => (
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as Record<string, string>)[c] ?? c
    ))
}

function renderTitleHTML(slide: Principle) {
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
            if (i === activeIndex) {
                num.classList.remove("pas-num-inactive")
            } else {
                num.classList.add("pas-num-inactive")
            }
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
    const firstImgRef = useRef<HTMLImageElement>(null)
    const activeRef = useRef<number>(0)
    const themeRef = useRef<"dark" | "light">("light")

    // Sync first image src to resolved theme BEFORE paint.
    // SSR renders the light image; on dark-theme clients we swap
    // the src synchronously here so there's no visible flash.
    useLayoutEffect(() => {
        const theme = getTheme()
        themeRef.current = theme
        if (theme === "dark" && firstImgRef.current) {
            firstImgRef.current.src = principles[0].imageDark
        }
    }, [])

    // Main scroll animation
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
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
                gsap.set(progressEl, { scaleY: self.progress, overwrite: true })
                const idx = Math.min(total - 1, Math.floor(self.progress * total))
                if (idx !== activeRef.current) {
                    activeRef.current = idx
                    animateNewSlide(idx)
                }
            },
        })

        // Refresh once assets/fonts finish loading so pin positions
        // account for final layout — avoids the 1-frame jump at pin engage.
        const refresh = () => ScrollTrigger.refresh()
        if (document.readyState === "complete") {
            refresh()
        } else {
            window.addEventListener("load", refresh, { once: true })
        }
        if ("fonts" in document) {
            ;(document as Document & { fonts: FontFaceSet }).fonts.ready.then(refresh)
        }

        return () => {
            st.kill()
            window.removeEventListener("load", refresh)
        }
    }, [])

    // Handle theme changes at runtime: swap the active image
    useEffect(() => {
        const handleThemeChange = () => {
            const newTheme = getTheme()
            if (newTheme === themeRef.current) return
            themeRef.current = newTheme

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

    const firstSlide = principles[0]

    return (
        <section
            ref={sectionRef}
            data-micro-pin="off"
            className="slider-frame relative h-screen w-full overflow-hidden"
            style={{ willChange: "transform" }}
        >
            {/* Images layer — first image rendered in JSX so first paint
                shows content. Subsequent slides are appended imperatively. */}
            <div ref={imagesRef} className="absolute inset-0" style={{ willChange: "contents" }}>
                <img
                    ref={firstImgRef}
                    src={firstSlide.imageLight}
                    alt={firstSlide.eyebrow}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ willChange: "transform, opacity" }}
                />
            </div>

            <div className="pas-overlay" />

            <div className="pointer-events-none absolute left-1/2 top-24 z-20 -translate-x-1/2 md:left-10 md:top-28 md:translate-x-0">
                <span className="pas-chip inline-block whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] backdrop-blur-md md:px-4 md:py-2 md:text-[11px] md:tracking-[0.2em]">
                    <span ref={chipRef}>{chipText(1)}</span>
                </span>
            </div>

            <div className="absolute inset-0 z-10 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
                    {/* First slide text rendered in JSX so it's present on
                        first paint. Subsequent slides replace innerHTML. */}
                    <div
                        ref={titleWrapRef}
                        className="max-w-2xl"
                        style={{ willChange: "contents" }}
                        dangerouslySetInnerHTML={{ __html: renderTitleHTML(firstSlide) }}
                    />
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
                                className={i === 0 ? undefined : "pas-num-inactive"}
                                style={{ willChange: "color" }}
                            >
                                {p.number}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="pas-progress-rail relative h-40 w-px">
                    <div
                        ref={progressRef}
                        className="absolute left-0 top-0 h-full w-full"
                        style={{
                            background: "currentColor",
                            transform: "scaleY(0)",
                            transformOrigin: "top center",
                            willChange: "transform",
                        }}
                    />
                </div>
            </div>
        </section>
    )
}
