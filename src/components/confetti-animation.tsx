"use client"

import { useEffect, useState } from "react"

type ConfettiPiece = {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  xVel: number
  yVel: number
  rotVel: number
}

type ConfettiProps = {
  duration?: number
  pieces?: number
  onComplete?: () => void
}

export function Confetti({ duration = 3000, pieces = 100, onComplete }: ConfettiProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [active, setActive] = useState(true)

  useEffect(() => {
    // Generate confetti pieces
    const colors = ["#9333ea", "#c084fc", "#a855f7", "#7e22ce", "#6b21a8"]
    const newConfetti: ConfettiPiece[] = []

    for (let i = 0; i < pieces; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        xVel: -5 + Math.random() * 10,
        yVel: 3 + Math.random() * 7,
        rotVel: -5 + Math.random() * 10,
      })
    }

    setConfetti(newConfetti)

    // Set timeout to remove confetti
    const timer = setTimeout(() => {
      setActive(false)
      if (onComplete) {
        setTimeout(onComplete, 500) // Allow time for exit animation
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, pieces, onComplete])

  useEffect(() => {
    if (!active || confetti.length === 0) return

    let animationFrame: number
    let lastTime = performance.now()

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 16 // normalize to ~60fps
      lastTime = time

      setConfetti((prev) =>
        prev.map((piece) => ({
          ...piece,
          y: piece.y + piece.yVel * deltaTime,
          x: piece.x + piece.xVel * deltaTime,
          rotation: piece.rotation + piece.rotVel * deltaTime,
        })),
      )

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [active, confetti])

  if (!active) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: active ? 1 : 0,
            transition: active ? "none" : "opacity 0.5s ease-out",
          }}
        />
      ))}
    </div>
  )
}

