'use client'

export default function Footer() {
  return (
    <footer className="relative bg-[#f9f4f0] py-20 overflow-hidden">
      {/* Ultra-light Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[5rem] md:text-[12rem] lg:text-[16rem] font-light text-gray-400/35 tracking-[-0.05em] md:tracking-tight select-none whitespace-nowrap">
          VISIONCIRCLE
        </h1>
      </div>
    </footer>
  )
}