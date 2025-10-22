'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import WaitlistModal from './WaitlistModal'

export default function PricingSection() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  const benefits = [
    "Connect with founders worldwide",
    "Access to exclusive networking events",
    "Share insights and learn from experiences",
    "Collaborative growth opportunities",
    "Resource sharing and mentorship",
    "Early access to partnerships",
    "Community-driven support system",
    "Weekly calls",
    "Monthly guest calls",
    "In-person events"
  ]

  return (
    <>
      <section id="pricing" className="py-16 px-6 bg-[#f9f4f0]">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a4a3a] mb-3 tracking-normal">
              What You'll Get
            </h2>
            <p className="text-base text-gray-600">
              Join a global community of founders and unlock exclusive benefits
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-[#1a4a3a]/10 max-w-xl mx-auto">
            {/* Price Section */}
            <div className="text-center mb-6 pb-6 border-b border-gray-200">
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold text-[#1a4a3a]">$19</span>
                <span className="text-lg text-gray-600 ml-2">/onetime for early members</span>
              </div>
              <p className="text-sm text-gray-600">
                Limited spots available for founding members
              </p>
            </div>

            {/* Benefits Checklist */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#1a4a3a] mb-4 text-center">
                Everything you need to grow:
              </h3>
              <ul className="space-y-3 max-w-sm mx-auto">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a4a3a] flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-4">
              <a
                href="https://calendly.com/satvikk/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto px-6 py-3 bg-[#1a4a3a] text-white rounded-full text-base font-semibold hover:bg-[#0f3328] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Join Now
              </a>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              🚀 Join <span className="font-semibold text-[#1a4a3a]">500+</span> founders already on the waitlist
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
    </>
  )
}
