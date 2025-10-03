'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import WaitlistModal from './WaitlistModal'

export default function HeroSection() {
  const [email, setEmail] = useState('')
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open the waitlist modal instead of just handling email
    setIsWaitlistModalOpen(true)
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-2 md:py-8 pt-6 md:pt-12 bg-[#f9f4f0] relative overflow-hidden">
      {/* Decorative floating elements - Hidden on mobile */}
      <div className="hidden md:block absolute top-1/3 right-20 w-16 h-16 bg-gray-200 rounded-lg opacity-40"></div>
      <div className="hidden md:block absolute bottom-1/4 left-1/4 w-12 h-12 bg-gray-300 rounded-full opacity-30"></div>
      
      {/* Profile images - Hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 left-20 w-20 h-20 rounded-full overflow-hidden">
        <img 
          src="/images/satvik.JPG" 
          alt="Satvik" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden md:block absolute bottom-1/3 right-32 w-24 h-24 rounded-full overflow-hidden">
        <img 
          src="/images/Aarush.jpeg" 
          alt="Aarush" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <motion.h1 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a4a3a] leading-tight mb-6 tracking-normal px-4"
        >
          Vision Circle<br />
          <span className="text-[#1a4a3a]">A Community Built for Founders</span>
        </motion.h1>
        
        {/* Subtext */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-2 max-w-3xl mx-auto px-4">
            Meet, share, and grow with people who get it.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
            Your space to connect, collaborate, and create what's next.
          </p>
        </motion.div>
        
        {/* Email Signup Form */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-6 py-4 pr-48 rounded-full border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a4a3a] focus:border-transparent text-base"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-[#1a4a3a] text-white rounded-full font-medium hover:bg-[#0f3328] transition-colors duration-300 whitespace-nowrap text-sm"
            >
              Join The Waitlist
            </button>
          </form>
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
    </section>
  )
}