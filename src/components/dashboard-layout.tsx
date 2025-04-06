"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, LogIn } from "lucide-react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in (this would be replaced with actual auth logic)
  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Desktop Header */}
      <header className="hidden border-b bg-white shadow-sm md:block">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-purple-600 p-1">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-purple-800">BBetter</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium ${pathname === "/" ? "text-purple-800" : "text-gray-600 hover:text-purple-800"}`}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className={`text-sm font-medium ${pathname === "/profile" ? "text-purple-800" : "text-gray-600 hover:text-purple-800"}`}
            >
              Profile
            </Link>
            {!isLoggedIn && (
              <Link
                href="/register"
                className={`text-sm font-medium ${pathname === "/register" ? "text-purple-800" : "text-gray-600 hover:text-purple-800"}`}
              >
                Register
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-white shadow-lg md:hidden">
        <div className="flex h-16 items-center justify-around">
          <Link
            href="/"
            className={`flex flex-col items-center ${pathname === "/" ? "text-purple-800" : "text-gray-600"}`}
          >
            <Home className="h-6 w-6" />
          </Link>
          <Link
            href="/profile"
            className={`flex flex-col items-center ${pathname === "/profile" ? "text-purple-800" : "text-gray-600"}`}
          >
            <User className="h-6 w-6" />
          </Link>
          {!isLoggedIn && (
            <Link
              href="/register"
              className={`flex flex-col items-center ${pathname === "/register" ? "text-purple-800" : "text-gray-600"}`}
            >
              <LogIn className="h-6 w-6" />
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

