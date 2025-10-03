export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 bg-[#f9f4f0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#1a4a3a] tracking-normal">
            Here's a Glimpse into the Community
          </h2>
        </div>

        {/* Community Video */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
            <iframe 
              className="w-full h-full absolute inset-0"
              src="https://www.youtube.com/embed/F9_AmkdGTV8?si=E-fPbFbVNioQYs_M" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}