'use client'

import { Instagram } from 'lucide-react'

export default function WaitlistSection() {
  return (
    <section id="join" className="py-20 px-6 bg-[#f9f4f0]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-black rounded-xl p-12 mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading tracking-tight">
                Be the first to experience the future of collaborative innovation.
              </h2>
              <p className="text-lg opacity-80">
                Get early access to exclusive features and community events.
              </p>
            </div>

            <button className="bg-gradient-to-r from-black to-blue-purple text-white font-medium px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
              Join The Waitlist
            </button>

            <div className="flex justify-center">
              <a href="https://www.instagram.com/vsoncircle/" target="_blank" rel="noopener noreferrer">
                <Instagram className="hover:opacity-80 transition-opacity cursor-pointer" style={{ color: '#696969' }} size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}