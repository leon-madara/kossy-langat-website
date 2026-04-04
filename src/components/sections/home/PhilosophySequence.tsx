"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import "./PhilosophySequence.css"

type SequenceVariantId = "landscape" | "phonePortrait"

type SequenceVariant = {
  id: SequenceVariantId
  frameCount: number
  framePath: string
}

type TextSequenceDefinition = {
  text: string
  frameStart: number
  frameEnd: number
  color: string
}

type TextCue = {
  text: string
  color: string
  startProgress: number
  endProgress: number
}

const PHONE_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1024
const LANDSCAPE_SEQUENCE: SequenceVariant = {
  id: "landscape",
  frameCount: 192,
  framePath: "/images/philosophy/frame-",
}
const PHONE_SEQUENCE: SequenceVariant = {
  id: "phonePortrait",
  frameCount: 240,
  framePath: "/images/philosophy/mobile/frame-",
}
const BASELINE_FRAME_COUNT = LANDSCAPE_SEQUENCE.frameCount
const PIN_NARRATIVE_SCROLL_DISTANCE_VH = 250
const FINAL_HOLD_SCROLL_DISTANCE_VH = 10
const PIN_SCROLL_DISTANCE_VH = PIN_NARRATIVE_SCROLL_DISTANCE_VH + FINAL_HOLD_SCROLL_DISTANCE_VH
const TIMELINE_DURATION = 1
const FRAME_PROGRESS_DURATION = PIN_NARRATIVE_SCROLL_DISTANCE_VH / PIN_SCROLL_DISTANCE_VH

const TEXT_SEQUENCE_DEFINITIONS: TextSequenceDefinition[] = [
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

const TEXT_SEQUENCE: TextCue[] = TEXT_SEQUENCE_DEFINITIONS.map((line) => ({
  text: line.text,
  color: line.color,
  startProgress: (line.frameStart - 1) / BASELINE_FRAME_COUNT,
  endProgress: line.frameEnd / BASELINE_FRAME_COUNT,
}))

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

function clampProgress(progress: number): number {
  return Math.max(0, Math.min(1, progress))
}

function clampFrame(frame: number, frameCount: number): number {
  if (frameCount <= 1) return 0
  return Math.max(0, Math.min(frameCount - 1, Math.round(frame)))
}

function getSequenceProgress(frame: number, frameCount: number): number {
  if (frameCount <= 1) return 0
  return clampFrame(frame, frameCount) / (frameCount - 1)
}

function getCueProgress(frame: number, frameCount: number): number {
  if (frameCount <= 0) return 0
  return (clampFrame(frame, frameCount) + 1) / frameCount
}

function progressToFrame(progress: number, frameCount: number): number {
  if (frameCount <= 1) return 0
  return clampProgress(progress) * (frameCount - 1)
}

function getSequenceVariant(viewportWidth: number): SequenceVariant {
  return viewportWidth < PHONE_BREAKPOINT ? PHONE_SEQUENCE : LANDSCAPE_SEQUENCE
}

function getVariantById(id: SequenceVariantId): SequenceVariant {
  return id === PHONE_SEQUENCE.id ? PHONE_SEQUENCE : LANDSCAPE_SEQUENCE
}

function getFrameUrls(variant: SequenceVariant): string[] {
  const urls: string[] = []
  for (let i = 0; i < variant.frameCount; i++) {
    urls.push(`${variant.framePath}${String(i + 1).padStart(3, "0")}.jpg`)
  }
  return urls
}

function createMainThreadRenderer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  let images: (HTMLImageElement | null)[] = []
  let loaded: boolean[] = []
  let frameCount = 0
  let currentFrame = -1
  let drawConfig: { cw: number; ch: number; dw: number; dh: number; ox: number; oy: number } | null = null
  let activeToken = 0

  const resetSequence = () => {
    for (let i = 0; i < images.length; i++) {
      const img = images[i]
      if (img) {
        img.onload = null
        img.onerror = null
      }
      images[i] = null
    }
    images = []
    loaded = []
    frameCount = 0
    currentFrame = -1
    drawConfig = null
  }

  return {
    loadFrames(
      urls: string[],
      token: number,
      onProgress: (percent: number) => void,
      onReady: () => void,
      onSettled: (successCount: number) => void
    ) {
      activeToken = token
      resetSequence()

      frameCount = urls.length
      images = Array.from({ length: frameCount }, () => null)
      loaded = Array.from({ length: frameCount }, () => false)

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
            if (activeToken !== token) return
            loaded[i] = true
            success++
            if (!readySent) {
              readySent = true
              onReady()
            }
          })
          .catch(() => { /* skip */ })
          .finally(() => {
            if (activeToken !== token) return
            settled++
            if (settled % 16 === 0) onProgress(Math.round((settled / frameCount) * 100))
            if (settled === frameCount) onSettled(success)
          })
      }
    },

    resize(width: number, height: number, dpr: number) {
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const ref = images.find((img) => img && img.naturalWidth > 0)
      if (ref) {
        const scale = Math.max(width / ref.naturalWidth, height / ref.naturalHeight)
        const dw = ref.naturalWidth * scale
        const dh = ref.naturalHeight * scale
        drawConfig = { cw: width, ch: height, dw, dh, ox: (width - dw) / 2, oy: (height - dh) / 2 }
      }

      if (currentFrame >= 0 && loaded[currentFrame]) {
        const frame = currentFrame
        currentFrame = -1
        this.render(frame)
      }
    },

    render(frame: number) {
      if (frameCount === 0) return
      const clamped = clampFrame(frame, frameCount)
      if (!loaded[clamped]) return
      if (currentFrame === clamped) return
      const img = images[clamped]
      if (!img || !drawConfig) return
      ctx.clearRect(0, 0, drawConfig.cw, drawConfig.ch)
      ctx.drawImage(img, drawConfig.ox, drawConfig.oy, drawConfig.dw, drawConfig.dh)
      currentFrame = clamped
    },

    dispose() {
      activeToken += 1
      resetSequence()
    },
  }
}

export function PhilosophySequence() {
  const initialVariantId = typeof window !== "undefined"
    ? getSequenceVariant(window.innerWidth).id
    : LANDSCAPE_SEQUENCE.id

  const sectionRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textLinesRef = useRef<Array<HTMLParagraphElement | null>>([])
  const workerRef = useRef<Worker | null>(null)
  const fallbackRef = useRef<ReturnType<typeof createMainThreadRenderer> | null>(null)
  const activeVariantRef = useRef<SequenceVariant>(getVariantById(initialVariantId))
  const activeIndexRef = useRef(0)
  const playheadFrameRef = useRef(0)
  const pendingProgressRef = useRef(0)
  const loadTokenRef = useRef(0)
  const stageReadyRef = useRef(false)
  const usingWorkerRef = useRef(false)

  const [stageReady, setStageReady] = useState(false)
  const [allFramesSettled, setAllFramesSettled] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    stageReadyRef.current = stageReady
  }, [stageReady])

  const updateTextClasses = useCallback((cueProgress: number) => {
    let newActiveIndex = TEXT_SEQUENCE.findIndex(
      (line) => cueProgress > line.startProgress && cueProgress <= line.endProgress
    )

    if (newActiveIndex === -1) {
      newActiveIndex = cueProgress >= 1 ? TEXT_SEQUENCE.length - 1 : 0
    }

    if (newActiveIndex !== activeIndexRef.current) {
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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let transferredToOffscreen = false
    const supportsOffscreen =
      process.env.NODE_ENV === "production" &&
      typeof Worker !== "undefined" &&
      typeof canvas.transferControlToOffscreen === "function"

    if (supportsOffscreen) {
      try {
        const worker = new Worker("/workers/philosophy-worker.js")
        const offscreen = canvas.transferControlToOffscreen()
        transferredToOffscreen = true

        worker.postMessage({ type: "init", canvas: offscreen }, [offscreen])

        worker.onmessage = (event: MessageEvent) => {
          const { type, token, ...data } = event.data
          if (typeof token === "number" && token !== loadTokenRef.current) {
            return
          }

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
          setAllFramesSettled(true)
          setLoadFailed(true)
        }

        workerRef.current = worker
        usingWorkerRef.current = true
      } catch {
        usingWorkerRef.current = false
      }
    }

    if (!usingWorkerRef.current) {
      // React replays effects in development; keep the local fallback path safe there.
      if (!transferredToOffscreen) {
        fallbackRef.current = createMainThreadRenderer(canvas)
      }
    }

    return () => {
      loadTokenRef.current += 1

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

  const loadVariantFrames = useCallback((variant: SequenceVariant) => {
    const urls = getFrameUrls(variant)
    const token = loadTokenRef.current + 1
    loadTokenRef.current = token

    setStageReady(false)
    setAllFramesSettled(false)
    setLoadProgress(0)
    setLoadFailed(false)

    if (usingWorkerRef.current && workerRef.current) {
      workerRef.current.postMessage({ type: "load-frames", urls, token })
      return
    }

    if (fallbackRef.current) {
      fallbackRef.current.loadFrames(
        urls,
        token,
        (percent) => {
          if (loadTokenRef.current === token) {
            setLoadProgress(percent)
          }
        },
        () => {
          if (loadTokenRef.current === token) {
            setStageReady(true)
          }
        },
        (successCount) => {
          if (loadTokenRef.current !== token) return
          setAllFramesSettled(true)
          setLoadProgress(100)
          setLoadFailed(successCount === 0)
        }
      )
      return
    }

    setAllFramesSettled(true)
    setLoadFailed(true)
  }, [])

  useEffect(() => {
    const frameRequest = window.requestAnimationFrame(() => {
      loadVariantFrames(activeVariantRef.current)
    })

    return () => window.cancelAnimationFrame(frameRequest)
  }, [loadVariantFrames])

  const applySequenceVariant = useCallback(
    (nextVariantId: SequenceVariantId) => {
      const nextVariant = getVariantById(nextVariantId)
      const previousVariant = activeVariantRef.current
      const preservedProgress = getSequenceProgress(playheadFrameRef.current, previousVariant.frameCount)

      pendingProgressRef.current = preservedProgress
      activeVariantRef.current = nextVariant
      playheadFrameRef.current = progressToFrame(preservedProgress, nextVariant.frameCount)
      activeIndexRef.current = -1

      loadVariantFrames(nextVariant)
    },
    [loadVariantFrames]
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleVariantResize = () => {
      const nextVariantId = getSequenceVariant(window.innerWidth).id
      if (nextVariantId !== activeVariantRef.current.id) {
        applySequenceVariant(nextVariantId)
      }
    }

    window.addEventListener("resize", handleVariantResize)
    return () => window.removeEventListener("resize", handleVariantResize)
  }, [applySequenceVariant])

  const postResize = useCallback(() => {
    const canvasWrap = canvasWrapRef.current
    if (!canvasWrap) return

    const bounds = canvasWrap.getBoundingClientRect()
    const width = Math.max(1, Math.round(bounds.width))
    const height = Math.max(1, Math.round(bounds.height))
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    if (usingWorkerRef.current && workerRef.current) {
      workerRef.current.postMessage({ type: "resize", width, height, dpr })
    } else if (fallbackRef.current) {
      fallbackRef.current.resize(width, height, dpr)
    }
  }, [])

  const syncStage = useCallback(
    (frame: number) => {
      const variant = activeVariantRef.current
      const clamped = clampFrame(frame, variant.frameCount)

      playheadFrameRef.current = clamped
      pendingProgressRef.current = getSequenceProgress(clamped, variant.frameCount)

      if (!stageReadyRef.current) {
        return
      }

      if (usingWorkerRef.current && workerRef.current) {
        workerRef.current.postMessage({ type: "render", frame: clamped })
      } else if (fallbackRef.current) {
        fallbackRef.current.render(clamped)
      }

      updateTextClasses(getCueProgress(clamped, variant.frameCount))
    },
    [updateTextClasses]
  )

  useEffect(() => {
    if (!stageReady || loadFailed) {
      return
    }

    const frameCount = activeVariantRef.current.frameCount
    postResize()
    syncStage(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? frameCount - 1
        : playheadFrameRef.current
    )
  }, [stageReady, loadFailed, postResize, syncStage])

  useGSAP(
    () => {
      const section = sectionRef.current
      const canvasWrap = canvasWrapRef.current

      if (loadFailed || !section || !canvasWrap) {
        return
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        postResize()
        syncStage(activeVariantRef.current.frameCount - 1)
        return
      }

      const mm = gsap.matchMedia()
      postResize()

      const handleResize = () => {
        postResize()
        ScrollTrigger.refresh()
      }

      const setupTimeline = (frameCount: number, scrub: number) => {
        const playhead = { frame: progressToFrame(pendingProgressRef.current, frameCount) }
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * (PIN_SCROLL_DISTANCE_VH / 100)}`,
            pin: true,
            pinSpacing: true,
            scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline.to(
          playhead,
          {
            frame: frameCount - 1,
            duration: FRAME_PROGRESS_DURATION,
            ease: "none",
            snap: "frame",
            onUpdate: () => syncStage(playhead.frame),
          },
          0
        )

        timeline.set({}, {}, TIMELINE_DURATION)
        syncStage(playhead.frame)
      }

      window.addEventListener("resize", handleResize)

      mm.add(`(min-width: ${DESKTOP_BREAKPOINT}px)`, () => {
        setupTimeline(LANDSCAPE_SEQUENCE.frameCount, 0.55)
      })

      mm.add(`(min-width: ${PHONE_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT - 1}px)`, () => {
        setupTimeline(LANDSCAPE_SEQUENCE.frameCount, 0.45)
      })

      mm.add(`(max-width: ${PHONE_BREAKPOINT - 1}px)`, () => {
        setupTimeline(PHONE_SEQUENCE.frameCount, 0.45)
      })

      return () => {
        window.removeEventListener("resize", handleResize)
        mm.revert()
      }
    },
    { dependencies: [loadFailed, postResize, syncStage], scope: sectionRef }
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
            className={`philosophy-sequence__text-track${isStaticFallback ? " philosophy-sequence__text-track--static" : ""}`}
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
                  index === 0 ? "is-active" : "",
                ].filter(Boolean).join(" ")}
                data-progress-start={line.startProgress}
                data-progress-end={line.endProgress}
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
