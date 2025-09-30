'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Vision Circle?",
      answer: "Vision Circle is a global community where startup founders connect, collaborate, and grow together."
    },
    {
      question: "Who can join Vision Circle?",
      answer: "Founders, co-founders, and early-stage entrepreneurs who want to learn, share, and scale their startups."
    },
    {
      question: "What do I get as a member?",
      answer: "Access to a network of like-minded founders, shared resources, and opportunities to collaborate on real growth."
    },
    {
      question: "How do I join?",
      answer: "Simply join the waitlist — we'll invite founders in batches to keep the community focused and engaged."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="py-20 px-6 bg-[#f9f4f0]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a4a3a] mb-4 tracking-normal">
            Frequently Answered Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - FAQ */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300 pb-6">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left group"
                >
                  <h3 className="text-lg md:text-xl text-[#1a4a3a] font-medium pr-8 leading-relaxed">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <span className={`text-2xl text-[#1a4a3a] transition-transform duration-300 ${openFAQ === index ? 'rotate-45' : 'rotate-0'}`}>
                      +
                    </span>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === index 
                    ? 'max-h-96 opacity-100 mt-4' 
                    : 'max-h-0 opacity-0 mt-0'
                }`}>
                  <div className="text-gray-600 text-base leading-relaxed pb-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Contact Us */}
          <div className="flex justify-end">
            <div className="bg-[#eee5dc] rounded-3xl p-6 shadow-lg w-80 h-56 flex flex-col justify-center">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#1a4a3a] mb-2">
                  We are here to help
                </h3>
                <p className="text-[#1a4a3a] mb-4">
                  Chat with Us?
                </p>
                <button className="px-6 py-3 bg-[#1a4a3a] text-white rounded-full font-medium hover:bg-[#0f3328] transition-colors duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}