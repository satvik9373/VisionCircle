'use client'

import { useState } from 'react'

export default function TeamSection() {
  const [frontCardIndex, setFrontCardIndex] = useState(1) // Start with Satvik (index 1) as front card

  const teamMembers = [
    {
      id: 0,
      name: "Aarush Yadav",
      role: "COO",
      image: "/images/Aarush.jpeg",
      position: 'left'
    },
    {
      id: 1,
      name: "Satvik Chaturvedi",
      role: "Founder",
      image: "/images/satvik.JPG",
      position: 'center'
    },
    {
      id: 2,
      name: "Join Us",
      role: "Your Role",
      image: null,
      position: 'right'
    }
  ]

  const handleCardClick = (clickedIndex: number) => {
    if (clickedIndex !== frontCardIndex) {
      setFrontCardIndex(clickedIndex)
    }
  }

  const getCardPosition = (cardIndex: number) => {
    // Determine which position this card should be in based on the front card
    if (cardIndex === frontCardIndex) {
      return 'center' // Front card is always in center
    }
    
    // For side cards, maintain their relative positions
    if (frontCardIndex === 1) { // Satvik is front
      return cardIndex === 0 ? 'left' : 'right'
    } else if (frontCardIndex === 0) { // Aarush is front
      return cardIndex === 1 ? 'right' : 'left'
    } else { // Join Us is front
      return cardIndex === 0 ? 'left' : 'right'
    }
  }

  const getCardStyles = (cardIndex: number) => {
    const position = getCardPosition(cardIndex)
    const isFront = cardIndex === frontCardIndex
    
    const baseStyles = {
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
    }
    
    switch (position) {
      case 'left':
        return {
          ...baseStyles,
          transform: 'translate(-50%, -50%) translateX(-100%) translateY(5%) scale(0.88)',
          zIndex: 5,
        }
      case 'center':
        return {
          ...baseStyles,
          transform: 'translate(-50%, -50%) translateX(0%) translateY(-5%) scale(1.15)',
          zIndex: 30,
        }
      case 'right':
        return {
          ...baseStyles,
          transform: 'translate(-50%, -50%) translateX(100%) translateY(5%) scale(0.88)',
          zIndex: 5,
        }
      default:
        return baseStyles
    }
  }

  return (
    <section id="team" className="py-8 md:py-12 px-6 bg-[#f9f4f0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#1a4a3a] tracking-normal">
            What is Vision Circle?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A global community where founders connect, share insights, and grow together.
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-8 max-w-6xl mx-auto">
          {/* Content - Centered on mobile, left-aligned on desktop */}
          <div className="space-y-6 text-center md:text-left order-1 md:order-1">
            <h3 className="text-2xl md:text-4xl font-bold text-[#1a4a3a] leading-tight tracking-normal">
              Connect with Founders<br />
              Worldwide
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed px-4 md:px-0">
              Collaborate with like-minded entrepreneurs, <br /> learn from shared experiences, <br /> and build smarter together in one circle.
            </p>
            <div className="flex justify-center md:justify-start">
              <a href="#features" className="px-8 py-3 bg-[#1a4a3a] text-white rounded-lg font-medium hover:bg-[#0f3328] transition-colors duration-300 flex items-center gap-2">
                Learn More
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Interactive Team Cards Stack - Below content on mobile, right side on desktop */}
          <div className="relative order-2 md:order-2 mt-8 md:mt-0 h-48 md:h-64 w-full flex justify-center items-center">
            {teamMembers.map((member, index) => {
              const isFront = index === frontCardIndex
              return (
                <div
                  key={member.id}
                  onClick={() => handleCardClick(index)}
                  style={getCardStyles(index)}
                  className={`
                    ${isFront 
                      ? 'bg-[#1a4d3a] text-white shadow-2xl shadow-black/20' 
                      : 'bg-white text-[#1a4a3a] shadow-md shadow-gray-400/30 hover:shadow-lg'
                    }
                    rounded-2xl p-4 md:p-6 text-center w-32 h-40 md:w-48 md:h-56 
                    flex flex-col justify-center cursor-pointer
                    ${!isFront ? 'hover:brightness-95 opacity-85' : 'opacity-100'}
                    ${isFront ? 'border-2 border-white/10' : 'border border-gray-200/50'}
                  `}
                >
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden mx-auto mb-2 md:mb-3">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full ${isFront ? 'bg-white/20' : 'bg-gray-100'} flex items-center justify-center rounded-full`}>
                        <span className={`text-lg md:text-2xl font-bold ${isFront ? 'text-white' : 'text-gray-400'}`}>?</span>
                      </div>
                    )}
                  </div>
                  <h4 className={`text-sm md:text-lg font-semibold mb-1 transition-colors duration-600 ${isFront ? 'text-white' : 'text-[#1a4a3a]'}`}>
                    {member.name}
                  </h4>
                  <p className={`text-xs md:text-sm transition-colors duration-600 ${isFront ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.role}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}