'use client'

import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-navy via-midnight to-deep-blue">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl text-white tracking-tight font-heading">
          Vision Circle
        </h1>
      </div>
    </div>
  )
}