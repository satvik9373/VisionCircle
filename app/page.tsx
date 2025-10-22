'use client'

import { useState, useEffect } from 'react'
import SplashScreen from '../components/SplashScreen'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import TeamSection from '../components/TeamSection'
import FeaturesSection from '../components/FeaturesSection'
import PricingSection from '../components/PricingSection'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'
import SmoothScrollProvider from '../components/SmoothScrollProvider'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SmoothScrollProvider>
      {showSplash && <SplashScreen />}
      <Navigation />
      <main>
        <HeroSection />
        <TeamSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}