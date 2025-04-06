"use client"

import { useEffect, useState } from "react"

type CircularProgressProps = {
  value: number
  color?: "purple" | "blue" | "green" | "amber" | "pink"
  size?: number
  strokeWidth?: number
}

export function CircularProgressIndicator({
  value,
  color = "purple",
  size = 80,
  strokeWidth = 6,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0)

  // Colors based on the prop
  const colorMap = {
    purple: "#7e22ce", // purple-700
    blue: "#2563eb", // blue-600
    green: "#16a34a", // green-600
    amber: "#d97706", // amber-600
    pink: "#db2777", // pink-600
  }

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    // Animate the progress
    const timer = setTimeout(() => {
      setProgress(value)
    }, 100)

    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#e5e7eb" // gray-200
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>

      {/* Percentage text */}
      <div
        className="absolute inset-0 flex items-center justify-center text-sm font-medium"
        style={{ color: colorMap[color] }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  )
}

