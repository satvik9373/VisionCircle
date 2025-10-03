'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    workEmail: '',
    whyJoin: '',
    currentRole: '',
    linkedinProfile: '',
    instagramHandle: '',
    hopingToGain: '',
    skillsContribution: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      
      // Prevent scrolling on body
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore scroll position
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset status
    setSubmitStatus('idle')
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          phoneNumber: '',
          workEmail: '',
          whyJoin: '',
          currentRole: '',
          linkedinProfile: '',
          instagramHandle: '',
          hopingToGain: '',
          skillsContribution: ''
        })
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'Failed to join waitlist. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      
      // More specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setErrorMessage('Cannot connect to server. Please check if the application is running.')
      } else if (error instanceof Error) {
        setErrorMessage(`Network error: ${error.message}`)
      } else {
        setErrorMessage('Network error. Please check your connection and try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col transition-all duration-700 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} 
      style={{ 
        backgroundColor: isOpen ? '#1c1c1c' : 'transparent',
        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Background Fade Effect */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isOpen ? 'backdrop-blur-sm bg-black/20' : 'backdrop-blur-none bg-black/0'
        }`}
        style={{ backgroundColor: '#1c1c1c' }}
      />

      {/* Header - Fixed */}
      <div 
        className={`flex-shrink-0 px-6 py-4 z-10 transform transition-all duration-700 ease-out delay-200 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`} 
        style={{ backgroundColor: '#1c1c1c' }}
      >
        <div className="flex justify-end items-center max-w-2xl mx-auto">
          <button
            onClick={onClose}
            className={`text-gray-400 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-full transform ${
              isOpen ? 'scale-100 rotate-0' : 'scale-75 rotate-90'
            }`}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Modal Content - Scrollable */}
      <div 
        className={`flex-1 overflow-y-auto overscroll-contain transform transition-all duration-700 ease-out delay-100 custom-scrollbar ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#2c2c2c #1c1c1c'
        }}
      >
        <div className="pb-20" style={{ backgroundColor: '#1c1c1c' }}>
          {/* Form Container */}
          <div className={`px-6 py-6 max-w-2xl mx-auto transform transition-all duration-700 ease-out delay-300 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4a3a] transition-all duration-300 text-sm"
                style={{ backgroundColor: '#2c2c2c' }}
                onFocus={(e) => e.target.style.backgroundColor = '#1c1c1c'}
                onBlur={(e) => e.target.style.backgroundColor = '#2c2c2c'}
                required
                placeholder="+91 12345 67890"
              />
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Work Email *
              </label>
              <input
                type="email"
                value={formData.workEmail}
                onChange={(e) => handleInputChange('workEmail', e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4a3a] transition-all duration-300 text-sm"
                style={{ backgroundColor: '#2c2c2c' }}
                onFocus={(e) => e.target.style.backgroundColor = '#1c1c1c'}
                onBlur={(e) => e.target.style.backgroundColor = '#2c2c2c'}
                required
                placeholder="your.work@email.com"
              />
            </div>

            {/* Why do you want to join Vision Circle */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Why do you want to join Vision Circle? *
              </label>
              <textarea
                value={formData.whyJoin}
                onChange={(e) => handleInputChange('whyJoin', e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4a3a] transition-all duration-300 text-sm resize-none"
                style={{ backgroundColor: '#2c2c2c' }}
                onFocus={(e) => e.target.style.backgroundColor = '#1c1c1c'}
                onBlur={(e) => e.target.style.backgroundColor = '#2c2c2c'}
                required
                rows={3}
                placeholder="Tell us what motivates you to join our community..."
              />
            </div>

            {/* Current role or venture */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                What's your current role or venture? *
              </label>
              <input
                type="text"
                value={formData.currentRole}
                onChange={(e) => handleInputChange('currentRole', e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4a3a] transition-all duration-300 text-sm"
                style={{ backgroundColor: '#2c2c2c' }}
                onFocus={(e) => e.target.style.backgroundColor = '#1c1c1c'}
                onBlur={(e) => e.target.style.backgroundColor = '#2c2c2c'}
                required
                placeholder="e.g., Founder at TechStartup, Product Manager, Entrepreneur"
              />
            </div>

            {/* LinkedIn Profile */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Share your LinkedIn profile link. *
              </label>
              <input
                type="url"
                value={formData.linkedinProfile}
                onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4a3a] transition-all duration-300 text-sm"
                style={{ backgroundColor: '#2c2c2c' }}
                onFocus={(e) => e.target.style.backgroundColor = '#1c1c1c'}
                onBlur={(e) => e.target.style.backgroundColor = '#2c2c2c'}
                required
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {/* Instagram Handle */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Share your Instagram handle or link (if applicable).
              </label>
              <input
                type="text"
                value={formData.instagramHandle}
                onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4a3a] transition-all duration-300 text-sm"
                style={{ backgroundColor: '#2c2c2c' }}
                onFocus={(e) => e.target.style.backgroundColor = '#1c1c1c'}
                onBlur={(e) => e.target.style.backgroundColor = '#2c2c2c'}
                placeholder="@yourusername or https://instagram.com/yourusername"
              />
            </div>

            {/* What are you hoping to gain */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                What are you hoping to gain from being part of this community? *
              </label>
              <textarea
                value={formData.hopingToGain}
                onChange={(e) => handleInputChange('hopingToGain', e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4a3a] transition-all duration-300 text-sm resize-none"
                style={{ backgroundColor: '#2c2c2c' }}
                onFocus={(e) => e.target.style.backgroundColor = '#1c1c1c'}
                onBlur={(e) => e.target.style.backgroundColor = '#2c2c2c'}
                required
                rows={3}
                placeholder="Networking, mentorship, collaboration opportunities, knowledge sharing..."
              />
            </div>

            {/* Skills contribution */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Any specific skills, expertise, or experience you can contribute to the community? *
              </label>
              <textarea
                value={formData.skillsContribution}
                onChange={(e) => handleInputChange('skillsContribution', e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4a3a] transition-all duration-300 text-sm resize-none"
                style={{ backgroundColor: '#2c2c2c' }}
                onFocus={(e) => e.target.style.backgroundColor = '#1c1c1c'}
                onBlur={(e) => e.target.style.backgroundColor = '#2c2c2c'}
                required
                rows={3}
                placeholder="Technical skills, industry experience, mentoring, connections..."
              />
            </div>

            {/* Consent checkbox */}
            <div className="flex items-start space-x-3 py-4">
              <input
                type="checkbox"
                id="consent"
                required
                className="mt-1 w-4 h-4 text-[#1a4a3a] bg-[#3a3a3a] border-gray-600 rounded focus:ring-[#1a4a3a] focus:ring-2"
              />
              <label htmlFor="consent" className="text-sm text-gray-400 leading-relaxed">
                By registering for the event, you consent to the disclosure of your personal particulars (i.e., full name, email address, job title, company name, phone number, and LinkedIn profile) to our event partner. *
              </label>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-600/20 border border-green-500 rounded-xl text-green-400 text-sm">
                ✅ Successfully joined the waitlist! We'll be in touch soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-600/20 border border-red-500 rounded-xl text-red-400 text-sm">
                ❌ {errorMessage}
              </div>
            )}

            {/* Submit button */}
            <div className="pt-6 pb-8">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 text-sm ${
                  isSubmitting || submitStatus === 'success'
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-[#1a4a3a] text-white hover:bg-[#0f3328]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining Waitlist...
                  </span>
                ) : submitStatus === 'success' ? (
                  '✅ Joined Successfully!'
                ) : (
                  'Join the Waitlist'
                )}
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}