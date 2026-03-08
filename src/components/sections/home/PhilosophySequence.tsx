"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import "./PhilosophySequence.css"

const FRAME_COUNT = 192
const FRAME_PATH = "/images/philosophy/frame-"
const PIN_SCROLL_DISTANCE_VH = 250
const DESKTOP_BREAKPOINT = 1024
const TIMELINE_DURATION = 1

const TEXT_SEQUENCE = [
  { text: "Good design does not begin with walls.", frameStart: 1, frameEnd: 24, color: "#48616b" },
  { text: "It begins with structure.", frameStart: 25, frameEnd: 48, color: "#323006" },
  { text: "With alignment.", frameStart: 49, frameEnd: 72, color: "#685a54" },
  { text: "With logic.", frameStart: 73, frameEnd: 96, color: "black" },
  { text: "With systems that hold.", frameStart: 97, frameEnd: 132, color: "#545110" },
  {
    text: "And with the right leadership, what was only a framework becomes something real.",
    frameStart: 133,
    frameEnd: 176,
    color: "#48616b",
  },
  {
    text: "That space between people and design - that's where I live.",
    frameStart: 177,
    frameEnd: 192,
    color: "#323006",
  },
]

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

function getFrameSrc(index: number) {
  return `${FRAME_PATH}${String(index + 1).padStart(3, "0")}.jpg`
}



export function PhilosophySequence() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textLinesRef = useRef<Array<HTMLParagraphElement | null>>([])
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: FRAME_COUNT }, () => null)
  )
  const loadedFramesRef = useRef<boolean[]>(
    Array.from({ length: FRAME_COUNT }, () => false)
  )
  const currentFrameRef = useRef(-1)
  const activeIndexRef = useRef(0)

  const [stageReady, setStageReady] = useState(false)
  const [allFramesSettled, setAllFramesSettled] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [loadFailed, setLoadFailed] = useState(false)

  // ── Frame pre-loading ──────────────────────────────────────────────
  useEffect(() => {
    let isCancelled = false
    let settledCount = 0
    let successfulLoads = 0
    let hasMarkedReady = false

    imagesRef.current = Array.from({ length: FRAME_COUNT }, () => null)
    loadedFramesRef.current = Array.from({ length: FRAME_COUNT }, () => false)
    currentFrameRef.current = -1

    for (let index = 0; index < FRAME_COUNT; index += 1) {
      const image = new Image()
      imagesRef.current[index] = image

      const finalize = (didLoad: boolean) => {
        if (didLoad) {
          loadedFramesRef.current[index] = true
          successfulLoads += 1

          if (!hasMarkedReady && !isCancelled) {
            hasMarkedReady = true
            setStageReady(true)
          }
        }

        settledCount += 1

        if (!isCancelled && settledCount % 16 === 0) {
          setLoadProgress(Math.round((settledCount / FRAME_COUNT) * 100))
        }

        if (!isCancelled && settledCount === FRAME_COUNT) {
          setAllFramesSettled(true)
          setLoadProgress(100)
          setLoadFailed(successfulLoads === 0)
        }
      }

      image.src = getFrameSrc(index)
      image
        .decode()
        .then(() => {
          if (!isCancelled) finalize(true)
        })
        .catch(() => {
          if (!isCancelled) finalize(false)
        })
    }

    return () => {
      isCancelled = true
      imagesRef.current.forEach((image) => {
        if (!image) return
        image.onload = null
        image.onerror = null
      })
    }
  }, [])

  // ── GSAP scroll animation ──────────────────────────────────────────
  useGSAP(
    () => {
      const section = sectionRef.current
      const canvas = canvasRef.current
      const canvasWrap = canvasWrapRef.current

      if (!stageReady || loadFailed || !section || !canvas || !canvasWrap) {
        return
      }

      const context = canvas.getContext("2d")
      if (!context) return


      // ── Canvas Math Cache ──────────────────────────────────────
      // We calculate scaling/offsets ONCE per resize, not 60x a second
      let drawConfig: { cw: number; ch: number; dw: number; dh: number; ox: number; oy: number } | null = null

      // ── Canvas rendering ───────────────────────────────────────
      const renderFrame = (targetFrame: number, force = false) => {
        const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(targetFrame)))

        // If the target frame isn't loaded, hold the current frame (no jumping)
        if (!loadedFramesRef.current[clamped]) return
        if (!force && currentFrameRef.current === clamped) return

        const image = imagesRef.current[clamped]
        if (!image || !drawConfig) return

        context.clearRect(0, 0, drawConfig.cw, drawConfig.ch)
        context.drawImage(image, drawConfig.ox, drawConfig.oy, drawConfig.dw, drawConfig.dh)
        currentFrameRef.current = clamped

        // Update active text index via direct DOM manipulation (no React re-render)
        const frameNumber = clamped + 1
        const newActiveIndex = TEXT_SEQUENCE.findIndex(
          (line) => frameNumber >= line.frameStart && frameNumber <= line.frameEnd
        )
        if (newActiveIndex !== -1 && newActiveIndex !== activeIndexRef.current) {
          const lines = textLinesRef.current
          // Remove classes from all lines
          for (let i = 0; i < lines.length; i++) {
            const el = lines[i]
            if (!el) continue
            el.classList.remove("is-active", "is-past")
            if (i < newActiveIndex) {
              el.classList.add("is-past")
            }
          }
          // Set new active
          lines[newActiveIndex]?.classList.add("is-active")
          activeIndexRef.current = newActiveIndex
        }
      }

      // ── Canvas sizing ──────────────────────────────────────────
      const setCanvasSize = () => {
        const bounds = canvasWrap.getBoundingClientRect()
        const width = Math.max(1, Math.round(bounds.width))
        const height = Math.max(1, Math.round(bounds.height))
        const dpr = Math.min(window.devicePixelRatio || 1, 2)

        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        context.setTransform(1, 0, 0, 1, 0, 0)
        context.scale(dpr, dpr)

        // Cache math geometry using the first available image
        const referenceImage = imagesRef.current.find((img) => img && img.naturalWidth > 0)
        if (referenceImage) {
          const scale = Math.max(width / referenceImage.naturalWidth, height / referenceImage.naturalHeight)
          const drawWidth = referenceImage.naturalWidth * scale
          const drawHeight = referenceImage.naturalHeight * scale
          drawConfig = {
            cw: width,
            ch: height,
            dw: drawWidth,
            dh: drawHeight,
            ox: (width - drawWidth) / 2,
            oy: (height - drawHeight) / 2,
          }
        }

        // Force a render of the *current* frame to apply the new size
        const currentFrame = Math.max(0, currentFrameRef.current)
        if (loadedFramesRef.current[currentFrame]) {
          currentFrameRef.current = -1 // Force redraw
          renderFrame(currentFrame, true)
        }
      }

      // ── Reduced motion: static display ─────────────────────────
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCanvasSize()
        renderFrame(FRAME_COUNT - 1, true)
        return
      }

      // ── Responsive setup ───────────────────────────────────────
      const mm = gsap.matchMedia()
      setCanvasSize()

      const handleResize = () => {
        setCanvasSize()
        ScrollTrigger.refresh()
      }

      window.addEventListener("resize", handleResize)

      // ── Desktop timeline ───────────────────────────────────────
      mm.add(`(min-width: ${DESKTOP_BREAKPOINT}px)`, () => {
        const playhead = { frame: 0 }
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * (PIN_SCROLL_DISTANCE_VH / 100)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Frame playhead — GSAP drives the frame index, canvas renders it
        timeline.to(
          playhead,
          {
            frame: FRAME_COUNT - 1,
            duration: TIMELINE_DURATION,
            ease: "none",
            snap: "frame",
            onUpdate: () => renderFrame(Math.round(playhead.frame)),
          },
          0
        )
      })

      // ── Mobile timeline ────────────────────────────────────────
      mm.add(`(max-width: ${DESKTOP_BREAKPOINT - 1}px)`, () => {
        const playhead = { frame: 0 }
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * (PIN_SCROLL_DISTANCE_VH / 100)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline.to(
          playhead,
          {
            frame: FRAME_COUNT - 1,
            duration: TIMELINE_DURATION,
            ease: "none",
            snap: "frame",
            onUpdate: () => renderFrame(Math.round(playhead.frame)),
          },
          0
        )
      })

      // ── Cleanup ────────────────────────────────────────────────
      return () => {
        window.removeEventListener("resize", handleResize)
        mm.revert()
      }
    },
    { dependencies: [stageReady, loadFailed], scope: sectionRef }
  )

  const isStaticFallback = loadFailed

  return (
    <section
      ref={sectionRef}
      id="philosophy-sequence"
      className={`philosophy-sequence${isStaticFallback ? " philosophy-sequence--static" : ""}`}
      data-micro-pin="off"
      aria-busy={!allFramesSettled}
    >
      {!allFramesSettled && (
        <div className="philosophy-sequence__loader" aria-live="polite">
          <p className="philosophy-sequence__loader-text">Loading sequence... {loadProgress}%</p>
        </div>
      )}

      <div className="philosophy-sequence__stage">
        <div ref={canvasWrapRef} className="philosophy-sequence__canvas-wrap">
          <canvas
            ref={canvasRef}
            className="philosophy-sequence__canvas"
            role="img"
            aria-label="Construction sequence showing structure coming together"
          />
          <div className="philosophy-sequence__mobile-scrim" aria-hidden="true" />
        </div>

        <div className="philosophy-sequence__text-overlay">
          <div className="philosophy-sequence__eyebrow" aria-hidden="true">
            <span className="philosophy-sequence__eyebrow-number">02.0</span>
            <span className="philosophy-sequence__eyebrow-separator">/</span>
            <span>THE PHILOSOPHY</span>
          </div>

          <div
            className={`philosophy-sequence__text-track${isStaticFallback ? " philosophy-sequence__text-track--static" : ""
              }`}
          >
            {TEXT_SEQUENCE.map((line, index) => (
              <p
                key={line.text}
                ref={(element) => {
                  textLinesRef.current[index] = element
                }}
                className={[
                  "philosophy-sequence__line",
                  isStaticFallback ? "philosophy-sequence__line--static" : "",
                  index === 0 ? "is-active" : ""
                ].filter(Boolean).join(" ")}
                data-frame-start={line.frameStart}
                data-frame-end={line.frameEnd}
                style={{ color: line.color }}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
