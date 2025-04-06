"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CheckCircle, X } from "lucide-react"

type ToastProps = {
  message: string
  type?: "success" | "info"
  duration?: number
  onClose: () => void
}

export function Toast({ message, type = "success", duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow time for exit animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`fixed bottom-20 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 transform items-center justify-between rounded-lg bg-white p-4 shadow-lg transition-all duration-300 md:bottom-10 ${
        isVisible ? "opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        {type === "success" && (
          <div className="rounded-full bg-purple-100 p-1">
            <CheckCircle className="h-5 w-5 text-purple-800" />
          </div>
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

type ToastManagerProps = {
  children: React.ReactNode
}

export type ToastType = {
  id: string
  message: string
  type?: "success" | "info"
  duration?: number
}

// Create a context to manage toasts
import { createContext, useContext } from "react"

type ToastContextType = {
  showToast: (message: string, type?: "success" | "info", duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: ToastManagerProps) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const showToast = (message: string, type: "success" | "info" = "success", duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  )
}

// Hook to use the toast context
export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

