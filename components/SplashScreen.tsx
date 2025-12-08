'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import animationData from '../Splash-Animation.json'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  useEffect(() => {
    // Minimum time for animation (3 seconds to ensure full 2.59s plays)
    const minTimer = setTimeout(() => {
      console.log('Minimum time elapsed')
      setMinTimeElapsed(true)
    }, 3000)

    return () => clearTimeout(minTimer)
  }, [])

  useEffect(() => {
    console.log('Animation complete:', animationComplete, 'Min time elapsed:', minTimeElapsed)
    // Only start exit after BOTH animation completes AND minimum time elapsed
    if (animationComplete && minTimeElapsed) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          setIsVisible(false)
        }, 800)
      }, 200)

      return () => clearTimeout(exitTimer)
    }
  }, [animationComplete, minTimeElapsed])

  const handleAnimationComplete = () => {
    console.log('Lottie animation completed!')
    setAnimationComplete(true)
  }

  if (!isVisible) return null

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full min-h-screen z-[9999] flex items-center justify-center transition-opacity duration-800 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`} 
      style={{ margin: 0, padding: 0, backgroundColor: '#1a4a3a' }}
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full h-full max-w-4xl max-h-screen flex items-center justify-center">
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay={true}
            onComplete={handleAnimationComplete}
            onLoopComplete={handleAnimationComplete}
            style={{ 
              width: '100%', 
              height: 'auto',
              maxHeight: '100%'
            }}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid meet'
            }}
          />
        </div>
      </div>
    </div>
  )
}