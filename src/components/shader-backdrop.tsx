"use client"

import { Canvas } from "@react-three/fiber"
import GrainyGradient from "@/components/ui/gradient-shader-card"

interface ShaderBackdropProps {
  className?: string
}

export function ShaderBackdrop({ className }: ShaderBackdropProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ preserveDrawingBuffer: true }}>
        <GrainyGradient />
      </Canvas>
    </div>
  )
}
