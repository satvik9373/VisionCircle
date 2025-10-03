'use client'

import { useState } from 'react'
import { Home, Users, Layers, HelpCircle } from 'lucide-react'
import WaitlistModal from './WaitlistModal'

export default function Navigation() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-transparent py-6 px-8 z-50 hidden md:block">
        <div className="max-w-3xl mx-auto bg-[#f9f4f0] backdrop-blur-md border border-gray-200 rounded-full px-4 py-2 flex items-center justify-between shadow-sm">
          {/* Logo */}
          <div className="flex items-center w-16">
            <img
              src="/images/Logo-Transparent.png"
              alt="Vision Circle Logo"
              className="w-10 h-10"
            />
          </div>

          {/* Navigation Links - Centered */}
          <div className="flex items-center justify-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="#team" className="text-[#1a4a3a] text-sm uppercase tracking-normal hover:text-[#0f3328] transition-colors">
              Team
            </a>
            <a href="#features" className="text-[#1a4a3a] text-sm uppercase tracking-normal hover:text-[#0f3328] transition-colors">
              Features
            </a>
            <a href="#faq" className="text-[#1a4a3a] text-sm uppercase tracking-normal hover:text-[#0f3328] transition-colors">
              FAQ
            </a>
          </div>

          {/* Join Waitlist Button */}
          <div className="flex items-center w-28">
            <button 
              onClick={() => setIsWaitlistModalOpen(true)}
              className="bg-[#1a4a3a] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#0f3328] transition-colors whitespace-nowrap ml-auto"
            >
              JOIN WAITLIST
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-[#f9f4f0] border-t border-gray-200 z-50 md:hidden">
        <div className="flex items-center justify-around py-3 px-4">
          <a href="#" className="flex flex-col items-center space-y-1 text-[#1a4a3a] hover:text-[#0f3328] transition-colors">
            <Home size={18} />
            <span className="text-xs font-medium">Home</span>
          </a>
          <a href="#team" className="flex flex-col items-center space-y-1 text-[#1a4a3a] hover:text-[#0f3328] transition-colors">
            <Users size={18} />
            <span className="text-xs font-medium">Why us?</span>
          </a>
          <a href="#features" className="flex flex-col items-center space-y-1 text-[#1a4a3a] hover:text-[#0f3328] transition-colors">
            <Layers size={18} />
            <span className="text-xs font-medium">Feature</span>
          </a>
          <a href="#faq" className="flex flex-col items-center space-y-1 text-[#1a4a3a] hover:text-[#0f3328] transition-colors">
            <HelpCircle size={18} />
            <span className="text-xs font-medium">FAQ</span>
          </a>
        </div>
      </nav>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
    </>
  )
}