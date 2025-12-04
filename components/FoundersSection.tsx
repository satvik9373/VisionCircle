'use client'

export default function FoundersSection() {
  const founders = [
    {
      name: 'Satvik Chaturvedi',
      image: '/images/Image-Satvik.jpg'
    },
    {
      name: 'Aarush Yadav',
      image: '/images/Aarush.jpeg'
    }
  ]

  return (
    <section id="founders" className="py-20 px-6 bg-[#efd6ac] relative overflow-hidden">
      {/* Grain Effect Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/images/grain-effect.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Founders Tab */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#1a4a3a] text-white px-6 py-2 rounded-full text-sm font-medium leading-tight">
            Founders
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-[#1a4a3a] tracking-normal leading-tight">
            Know about founders
          </h2>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <div key={index} className="flex flex-col items-start">
              {/* Founder Card */}
              <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden mb-6">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Founder Name */}
              <h3 className="text-xl md:text-2xl font-semibold text-[#1a4a3a] leading-tight">
                {founder.name}
              </h3>

              {/* Founder Bio */}
              <p className="text-sm md:text-base text-[#1a4a3a] leading-tight mt-2 max-w-xs">
                {founder.name === 'Satvik Chaturvedi' 
                  ? "Satvik founded VisionCircle as a space for builders and entrepreneurs to connect. He's a CS engineer who's busy growing his personal brand and running his software service business, mixing tech skills with real-world business smarts."
                  : "Aarush co-founded VisionCircle and works as a software engineer. After graduating in Computer Science, he decided to skip the corporate route and go all-in on entrepreneurship. Along the way, he's picked up solid skills in full-stack development and product design."
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}