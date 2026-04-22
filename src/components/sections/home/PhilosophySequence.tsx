"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import "./PhilosophySequence.css"

const FRAME_COUNT = 192
const FRAME_PATH = "/images/philosophy/frame-"
const PIN_NARRATIVE_SCROLL_DISTANCE_VH = 250
const FINAL_HOLD_SCROLL_DISTANCE_VH = 10
const PIN_SCROLL_DISTANCE_VH = PIN_NARRATIVE_SCROLL_DISTANCE_VH + FINAL_HOLD_SCROLL_DISTANCE_VH
const PHONE_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1024
const TIMELINE_DURATION = 1
const FRAME_PROGRESS_DURATION = PIN_NARRATIVE_SCROLL_DISTANCE_VH / PIN_SCROLL_DISTANCE_VH
type FitMode = "cover" | "contain"

const TEXT_SEQUENCE = [
  { text: "Good design does not begin with walls.", frameStart: 1, frameEnd: 24, colorClass: "philosophy-sequence__line--teal" },
  { text: "It begins with structure.", frameStart: 25, frameEnd: 48, colorClass: "philosophy-sequence__line--olive" },
  { text: "With alignment.", frameStart: 49, frameEnd: 72, colorClass: "philosophy-sequence__line--warm" },
  { text: "With logic.", frameStart: 73, frameEnd: 96, colorClass: "philosophy-sequence__line--dark" },
  { text: "With systems that hold.", frameStart: 97, frameEnd: 132, colorClass: "philosophy-sequence__line--moss" },
  {
    text: "And with the right leadership, what was only a framework becomes something real.",
    frameStart: 133,
    frameEnd: 176,
    colorClass: "philosophy-sequence__line--teal",
  },
  {
    text: "That space between people and design - that's where I live.",
    frameStart: 177,
    frameEnd: 192,
    colorClass: "philosophy-sequence__line--olive",
  },
]

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

function getFrameUrls(): string[] {
  const urls: string[] = []
  for (let i = 0; i < FRAME_COUNT; i++) {
    urls.push(`${FRAME_PATH}${String(i + 1).padStart(3, "0")}.jpg`)
  }
  return urls
}

function getFitMode(_viewportWidth: number): FitMode {
  return "cover"
}

// ── Fallback: main-thread canvas rendering ────────────────────────────
// Used when OffscreenCanvas is not supported
function createMainThreadRenderer(canvas: HTMLCanvasElement) {
  let ctx: CanvasRenderingContext2D | null
  try {
    ctx = canvas.getContext("2d")
  } catch {
    // Canvas has transferred control to OffscreenCanvas — cannot use main thread
    return null
  }
  if (!ctx) return null

  const images: (HTMLImageElement | null)[] = Array.from({ length: FRAME_COUNT }, () => null)
  const loaded: boolean[] = Array.from({ length: FRAME_COUNT }, () => false)
  let currentFrame = -1
  let drawConfig: { cw: number; ch: number; dw: number; dh: number; ox: number; oy: number } | null = null

  return {
    loadFrames(
      urls: string[],
      onProgress: (percent: number) => void,
      onReady: () => void,
      onSettled: (successCount: number) => void
    ) {
      let settled = 0
      let success = 0
      let readySent = false

      for (let i = 0; i < urls.length; i++) {
        const img = new Image()
        images[i] = img
        img.src = urls[i]
        img
          .decode()
          .then(() => {
            loaded[i] = true
            success++
            if (!readySent) {
              readySent = true
              onReady()
            }
          })
          .catch(() => { /* skip */ })
          .finally(() => {
            settled++
            if (settled % 16 === 0) onProgress(Math.round((settled / FRAME_COUNT) * 100))
            if (settled === FRAME_COUNT) onSettled(success)
          })
      }
    },

    resize(width: number, height: number, dpr: number, fitMode: FitMode) {
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const ref = images.find((img) => img && img.naturalWidth > 0)
      if (ref) {
        const scaleResolver = fitMode === "contain" ? Math.min : Math.max
        const scale = scaleResolver(width / ref.naturalWidth, height / ref.naturalHeight)
        const dw = ref.naturalWidth * scale
        const dh = ref.naturalHeight * scale
        drawConfig = { cw: width, ch: height, dw, dh, ox: (width - dw) / 2, oy: (height - dh) / 2 }
      }

      if (currentFrame >= 0 && loaded[currentFrame]) {
        const f = currentFrame
        currentFrame = -1
        this.render(f)
      }
    },

    render(frame: number) {
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frame)))
      if (!loaded[clamped]) return
      if (currentFrame === clamped) return
      const img = images[clamped]
      if (!img || !drawConfig) return
      ctx.clearRect(0, 0, drawConfig.cw, drawConfig.ch)
      ctx.drawImage(img, drawConfig.ox, drawConfig.oy, drawConfig.dw, drawConfig.dh)
      currentFrame = clamped
    },

    dispose() {
      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        if (img) { img.onload = null; img.onerror = null }
        images[i] = null
      }
    },
  }
}

export function PhilosophySequence() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textLinesRef = useRef<Array<HTMLParagraphElement | null>>([])
  const workerRef = useRef<Worker | null>(null)
  const fallbackRef = useRef<ReturnType<typeof createMainThreadRenderer> | null>(null)
  const activeIndexRef = useRef(0)
  const playheadFrameRef = useRef(0)
  const stageReadyRef = useRef(false)
  const usingWorkerRef = useRef(false)

  const [stageReady, setStageReady] = useState(false)
  const [allFramesSettled, setAllFramesSettled] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    stageReadyRef.current = stageReady
  }, [stageReady])

  // ── Text class toggling (shared by both paths) ──────────────────────
  const updateTextClasses = useCallback((frameNumber: number) => {
    const newActiveIndex = TEXT_SEQUENCE.findIndex(
      (line) => frameNumber >= line.frameStart && frameNumber <= line.frameEnd
    )
    if (newActiveIndex !== -1 && newActiveIndex !== activeIndexRef.current) {
      const lines = textLinesRef.current
      for (let i = 0; i < lines.length; i++) {
        const el = lines[i]
        if (!el) continue
        el.classList.remove("is-active", "is-past")
        if (i < newActiveIndex) {
          el.classList.add("is-past")
        }
      }
      lines[newActiveIndex]?.classList.add("is-active")
      activeIndexRef.current = newActiveIndex
    }
  }, [])

  // ── Worker / Fallback initialization ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const urls = getFrameUrls()
    const supportsOffscreen = typeof canvas.transferControlToOffscreen === "function"

    if (supportsOffscreen) {
      // ── Worker path ───────────────────────────────────────────────
      try {
        // Create worker from public/ — bypasses Turbopack blob URL issues
        const worker = new Worker("/workers/philosophy-worker.js")

        // Only transfer canvas AFTER worker is successfully created
        const offscreen = canvas.transferControlToOffscreen()

        worker.postMessage({ type: "init", canvas: offscreen }, [offscreen])
        worker.postMessage({ type: "load-frames", urls })

        worker.onmessage = (event: MessageEvent) => {
          const { type, ...data } = event.data
          switch (type) {
            case "ready":
              setStageReady(true)
              break
            case "progress":
              setLoadProgress(data.percent)
              break
            case "all-settled":
              setAllFramesSettled(true)
              setLoadProgress(100)
              setLoadFailed(data.successCount === 0)
              break
          }
        }

        worker.onerror = () => {
          // Worker failed to load — can't recover canvas, show static fallback
          setAllFramesSettled(true)
          setLoadFailed(true)
        }

        workerRef.current = worker
        usingWorkerRef.current = true
      } catch {
        // Worker creation failed before canvas transfer — safe to fallback
        usingWorkerRef.current = false
      }
    }

    if (!usingWorkerRef.current) {
      // ── Fallback path (main-thread rendering) ─────────────────────
      const renderer = createMainThreadRenderer(canvas)
      if (renderer) {
        renderer.loadFrames(
          urls,
          (percent) => setLoadProgress(percent),
          () => setStageReady(true),
          (successCount) => {
            setAllFramesSettled(true)
            setLoadProgress(100)
            setLoadFailed(successCount === 0)
          }
        )
        fallbackRef.current = renderer
      }
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ type: "dispose" })
        workerRef.current.terminate()
        workerRef.current = null
      }
      if (fallbackRef.current) {
        fallbackRef.current.dispose()
        fallbackRef.current = null
      }
    }
  }, [])

  // ── Resize helper ───────────────────────────────────────────────────
  const postResize = useCallback(() => {
    const canvasWrap = canvasWrapRef.current
    if (!canvasWrap) return

    const bounds = canvasWrap.getBoundingClientRect()
    const width = Math.max(1, Math.round(bounds.width))
    const height = Math.max(1, Math.round(bounds.height))
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const fitMode = getFitMode(window.innerWidth)

    if (usingWorkerRef.current && workerRef.current) {
      workerRef.current.postMessage({ type: "resize", width, height, dpr, fitMode })
    } else if (fallbackRef.current) {
      fallbackRef.current.resize(width, height, dpr, fitMode)
    }
  }, [])

  // ── Render helper ───────────────────────────────────────────────────
  const syncStage = useCallback(
    (frame: number) => {
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frame)))
      playheadFrameRef.current = clamped

      if (!stageReadyRef.current) {
        return
      }

      if (usingWorkerRef.current && workerRef.current) {
        workerRef.current.postMessage({ type: "render", frame: clamped })
      } else if (fallbackRef.current) {
        fallbackRef.current.render(clamped)
      }

      // Text class toggle stays on main thread (direct DOM, no React)
      updateTextClasses(clamped + 1)
    },
    [updateTextClasses]
  )

  useEffect(() => {
    if (!stageReady || loadFailed) {
      return
    }

    postResize()
    syncStage(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? FRAME_COUNT - 1
        : playheadFrameRef.current
    )
  }, [stageReady, loadFailed, postResize, syncStage])

  // ── GSAP scroll animation ──────────────────────────────────────────
  useGSAP(
    () => {
      const section = sectionRef.current
      const canvasWrap = canvasWrapRef.current

      if (loadFailed || !section || !canvasWrap) {
        return
      }

      // ── Reduced motion: static display ─────────────────────────
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        postResize()
        syncStage(FRAME_COUNT - 1)
        return
      }

      // ── Responsive setup ───────────────────────────────────────
      const mm = gsap.matchMedia()
      postResize()

      const handleResize = () => {
        postResize()
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

        timeline.to(
          playhead,
          {
            frame: FRAME_COUNT - 1,
            duration: FRAME_PROGRESS_DURATION,
            ease: "none",
            snap: "frame",
            onUpdate: () => syncStage(playhead.frame),
          },
          0
        )

        // Hold the finished frame and final line briefly before release.
        timeline.set({}, {}, TIMELINE_DURATION)

        syncStage(playhead.frame)
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
            duration: FRAME_PROGRESS_DURATION,
            ease: "none",
            snap: "frame",
            onUpdate: () => syncStage(playhead.frame),
          },
          0
        )

        // Hold the finished frame and final line briefly before release.
        timeline.set({}, {}, TIMELINE_DURATION)

        syncStage(playhead.frame)
      })

      // ── Cleanup ────────────────────────────────────────────────
      return () => {
        window.removeEventListener("resize", handleResize)
        mm.revert()
      }
    },
    { dependencies: [loadFailed, postResize, syncStage], scope: sectionRef }
  )

  const isStaticFallback = loadFailed
  const loaderLabel = `Loading sequence... ${loadProgress}%`

  return (
    <section
      ref={sectionRef}
      id="philosophy-sequence"
      className={`philosophy-sequence${isStaticFallback ? " philosophy-sequence--static" : ""}`}
      data-micro-pin="off"
      aria-busy={!allFramesSettled}
    >
      {!allFramesSettled && (
        <div className="philosophy-sequence__loader philosophy-sequence__loader--section" aria-live="polite">
          <p className="philosophy-sequence__loader-text">{loaderLabel}</p>
        </div>
      )}

      <div className="philosophy-sequence__stage">
        <div className="philosophy-sequence__eyebrow philosophy-sequence__eyebrow--phone" aria-hidden="true">
          <span className="philosophy-sequence__eyebrow-number">02.0</span>
          <span className="philosophy-sequence__eyebrow-separator">/</span>
          <span>THE PHILOSOPHY</span>
        </div>

        <div ref={canvasWrapRef} className="philosophy-sequence__canvas-wrap">
          {!allFramesSettled && (
            <div className="philosophy-sequence__loader philosophy-sequence__loader--frame" aria-live="polite">
              <p className="philosophy-sequence__loader-text">{loaderLabel}</p>
            </div>
          )}
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
                  line.colorClass,
                  isStaticFallback ? "philosophy-sequence__line--static" : "",
                  index === 0 ? "is-active" : ""
                ].filter(Boolean).join(" ")}
                data-frame-start={line.frameStart}
                data-frame-end={line.frameEnd}
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
