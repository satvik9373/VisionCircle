'use client'

export default function TeamSection() {
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

          {/* Team Cards - Below content on mobile, right side on desktop */}
          <div className="flex justify-center items-center gap-2 md:gap-4 relative order-2 md:order-2 mt-8 md:mt-0">
            {/* Aarush Card - Left (COO) */}
            <div className="bg-white rounded-2xl p-3 md:p-4 shadow-lg text-center w-24 h-32 md:w-40 md:h-48 flex flex-col justify-center transform scale-90 z-10">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden mx-auto mb-1 md:mb-2">
                <img
                  src="/images/Aarush.jpeg"
                  alt="Aarush Yadav"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xs md:text-sm font-semibold text-[#1a4a3a] mb-1">Aarush Yadav</h4>
              <p className="text-gray-600 text-xs">COO</p>
            </div>

            {/* Satvik Card - Center (Founder) - Highlighted and Larger */}
            <div className="bg-[#1a4a3a] rounded-2xl p-4 md:p-6 shadow-2xl text-center w-32 h-40 md:w-48 md:h-56 flex flex-col justify-center transform scale-110 z-20">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden mx-auto mb-2 md:mb-3">
                <img
                  src="/images/satvik.JPG"
                  alt="Satvik Chaturvedi"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-sm md:text-lg font-semibold text-white mb-1">Satvik Chaturvedi</h4>
              <p className="text-gray-300 text-xs md:text-sm">Founder</p>
            </div>

            {/* Question Mark Card - Right */}
            <div className="bg-white rounded-2xl p-3 md:p-4 shadow-lg text-center w-24 h-32 md:w-40 md:h-48 flex flex-col justify-center transform scale-90 z-10">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full mx-auto mb-1 md:mb-2 bg-gray-100 flex items-center justify-center">
                <span className="text-lg md:text-2xl font-bold text-gray-400">?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}