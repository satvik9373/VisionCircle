'use client'

import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      // Allow fade-out animation to complete before hiding
      setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }, 1500) // 1.5 seconds for display, 0.5 seconds for fade-out = 2 seconds total

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className={`fixed top-0 left-0 w-full h-full min-h-screen z-[9999] flex items-center justify-center bg-gradient-to-br from-green-dark via-green to-green-light transition-opacity duration-500 ${
      isExiting ? 'opacity-0' : 'opacity-100'
    }`} style={{ margin: 0, padding: 0 }}>
      <div className="text-center animate-fade-in">
        <h1 className="text-3xl text-white font-playfair font-normal" style={{ letterSpacing: '-0.02em' }}>
          VisionCircle
        </h1>
      </div>
    </div>
  )
}