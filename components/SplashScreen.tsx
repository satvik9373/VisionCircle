'use client'

import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // Start text animation after a short delay
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 300)

    // Start exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }, 2000)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={`fixed top-0 left-0 w-full h-full min-h-screen z-[9999] flex items-center justify-center bg-gradient-to-br from-green-dark via-green to-green-light transition-opacity duration-500 ${
      isExiting ? 'opacity-0' : 'opacity-100'
    }`} style={{ margin: 0, padding: 0 }}>
      <div className="text-center">
        <h1 
          className={`text-3xl text-white font-heading transition-all duration-1000 ${
            showText ? 'blur-text-reveal' : 'blur-text-hidden'
          }`}
          style={{ 
            letterSpacing: '-0.02em'
          }}
        >
          VisionCircle
        </h1>
      </div>

      <style jsx>{`
        @keyframes blurTextReveal {
          0% {
            filter: blur(10px);
            opacity: 0;
            transform: translateY(20px);
          }
          50% {
            filter: blur(5px);
            opacity: 0.5;
          }
          100% {
            filter: blur(0px);
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .blur-text-reveal {
          animation: blurTextReveal 1.2s ease-out forwards;
        }

        .blur-text-hidden {
          filter: blur(10px);
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>
    </div>
  )
}