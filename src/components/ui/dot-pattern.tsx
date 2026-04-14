"use client"

import { useCallback, useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"

export interface DotPatternProps {
  className?: string
  children?: React.ReactNode
  dotSize?: number
  gap?: number
  baseColor?: string
  glowColor?: string
  proximity?: number
  glowIntensity?: number
  waveSpeed?: number
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : { r: 0, g: 0, b: 0 }
}

interface Dot {
  x: number
  y: number
  baseOpacity: number
}

export default function DotPattern({
  className,
  children,
  dotSize = 2,
  gap = 24,
  baseColor = "#404040",
  glowColor = "#0139D3",
  proximity = 120,
  glowIntensity = 1,
  waveSpeed = 0.5,
}: DotPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number | null>(null)

  // ⛔ FIX: jangan init performance.now di render
  const startTimeRef = useRef<number>(0)

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const glowRgb = useMemo(() => hexToRgb(glowColor), [glowColor])

  // INIT TIME SAFE
  useEffect(() => {
    startTimeRef.current = performance.now()
  }, [])

  // BUILD GRID
  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cellSize = dotSize + gap
    const cols = Math.ceil(rect.width / cellSize) + 1
    const rows = Math.ceil(rect.height / cellSize) + 1

    const offsetX = (rect.width - (cols - 1) * cellSize) / 2
    const offsetY = (rect.height - (rows - 1) * cellSize) / 2

    const dots: Dot[] = []

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          x: offsetX + x * cellSize,
          y: offsetY + y * cellSize,
          baseOpacity: 0.3 + Math.random() * 0.2,
        })
      }
    }

    dotsRef.current = dots
  }, [dotSize, gap])

  // INIT + RESIZE
  useEffect(() => {
    buildGrid()

    const container = containerRef.current
    if (!container) return

    const ro = new ResizeObserver(buildGrid)
    ro.observe(container)

    return () => ro.disconnect()
  }, [buildGrid])

  // MOUSE TRACKING (GLOBAL FIX HOVER BUG)
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseleave", handleLeave)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  // ANIMATION LOOP
  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const rect = canvas.getBoundingClientRect()

      ctx.clearRect(0, 0, rect.width, rect.height)

      const mx = mouseRef.current.x - rect.left
      const my = mouseRef.current.y - rect.top

      const proxSq = proximity * proximity

      const time =
        (performance.now() - startTimeRef.current) * 0.001 * waveSpeed

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx
        const dy = dot.y - my
        const distSq = dx * dx + dy * dy

        const wave =
          Math.sin(dot.x * 0.02 + dot.y * 0.02 + time) * 0.5 + 0.5

        const waveOpacity = dot.baseOpacity + wave * 0.15
        const waveScale = 1 + wave * 0.2

        let opacity = waveOpacity
        let scale = waveScale

        let r = baseRgb.r
        let g = baseRgb.g
        let b = baseRgb.b
        let glow = 0

        if (distSq < proxSq) {
          const dist = Math.sqrt(distSq)
          const t = 1 - dist / proximity
          const eased = t * t * (3 - 2 * t)

          r = Math.round(baseRgb.r + (glowRgb.r - baseRgb.r) * eased)
          g = Math.round(baseRgb.g + (glowRgb.g - baseRgb.g) * eased)
          b = Math.round(baseRgb.b + (glowRgb.b - baseRgb.b) * eased)

          opacity = Math.min(1, waveOpacity + eased * 0.7)
          scale = waveScale + eased * 0.8
          glow = eased * glowIntensity
        }

        const radius = (dotSize / 2) * scale

        // DOT
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
        ctx.fill()

        // GLOW
        if (glow > 0) {
          const gradient = ctx.createRadialGradient(
            dot.x,
            dot.y,
            0,
            dot.x,
            dot.y,
            radius * 4
          )

          gradient.addColorStop(
            0,
            `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.4
            })`
          )

          gradient.addColorStop(
            1,
            `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`
          )

          ctx.beginPath()
          ctx.arc(dot.x, dot.y, radius * 4, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [baseRgb, glowRgb, dotSize, proximity, glowIntensity, waveSpeed])

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 -z-100 overflow-hidden bg-black pointer-events-none",
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* overlay aman */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

      {/* children tidak ganggu mouse */}
      {children && (
        <div className="relative z-10 h-full w-full pointer-events-none">
          {children}
        </div>
      )}
    </div>
  )
}