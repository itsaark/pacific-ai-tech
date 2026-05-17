"use client"

import { Canvas } from "@react-three/fiber"
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react"
import GrainyGradient, { type Ripple } from "@/components/ui/gradient-shader-card"

const INITIAL_CARD_SIZE = { width: 720, height: 520 }

export function GradientHeroCard() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [size, setSize] = useState(INITIAL_CARD_SIZE)
  const cardRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)
  const currentTimeRef = useRef(0)

  useEffect(() => {
    if (!cardRef.current || typeof ResizeObserver === "undefined") {
      return
    }

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return

      const width = Math.round(entry.contentRect.width)
      const height = Math.round(entry.contentRect.height)

      if (width <= 0 || height <= 0) return

      setSize((current) => {
        if (current.width === width && current.height === height) {
          return current
        }

        return { width, height }
      })
    })

    observer.observe(cardRef.current)

    return () => observer.disconnect()
  }, [])

  const handleTimeUpdate = useCallback((time: number) => {
    currentTimeRef.current = time
  }, [])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()

    const newRipple: Ripple = {
      id: rippleIdRef.current++,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      startTime: currentTimeRef.current,
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 2000)
  }

  return (
    <aside
      ref={cardRef}
      className="gradient-hero-card relative overflow-hidden"
      aria-label="Interactive gradient panel showing Pacific AI Tech setup outcomes"
      onPointerDown={handlePointerDown}
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 1] }} gl={{ preserveDrawingBuffer: true }}>
          <GrainyGradient
            ripples={ripples}
            onTimeUpdate={handleTimeUpdate}
            width={size.width}
            height={size.height}
          />
        </Canvas>
      </div>

      <div className="gradient-hero-card__shade absolute inset-0" aria-hidden="true" />

      <div className="gradient-hero-card__content relative">
        <div>
          <p className="gradient-hero-card__label">Typical first month impact</p>
          <p className="gradient-hero-card__headline">
            Built for owners who need working AI, not another tool to study.
          </p>
        </div>

        <div className="gradient-hero-card__stats">
          <div>
            <div className="stat-number">10–20</div>
            <div className="stat-label">hours saved per week</div>
          </div>
          <div>
            <div className="stat-number">1</div>
            <div className="stat-label">session to get running</div>
          </div>
          <div>
            <div className="stat-number">30</div>
            <div className="stat-label">days of premium support</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
