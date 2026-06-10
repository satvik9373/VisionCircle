const cards = [
  {
    icon: "/assets/fit-icon-1.png",
    iconClass: "h-11",
    title: "Building something real",
    body: "You're an entrepreneur with a project, startup, or business idea and you need accountability to keep moving forward.",
  },
  {
    icon: "/assets/fit-icon-2.png",
    iconClass: "h-11",
    title: "Growing your voice online",
    body: "You're a creator building your personal brand, and you want feedback from people who understand the game.",
  },
  {
    icon: "/assets/fit-icon-3.png",
    iconClass: "h-12",
    title: "Ready to level up your circle",
    body: "You're done with surface-level connections. You want a network of ambitious people who challenge you, support you, and actually care about your growth.",
  },
];

export default function Fit() {
  return (
    <section id="about" className="relative bg-cream grain-soft overflow-hidden py-24">
      <div className="relative z-10 max-w-[1280px] mx-auto px-8">
        <div className="flex justify-center">
          <span className="serif-i text-cream text-[20px] tracking-[-0.06em] bg-forest rounded-full px-8 py-1.5">Is it a match?</span>
        </div>

        <h2 className="font-inter font-extrabold text-forest text-[48px] leading-[1.05] tracking-[-0.06em] text-center mt-7">
          Is VisionCircle right for you?
        </h2>
        <p className="serif-i text-forest text-[22px] tracking-[-0.06em] text-center mt-2">You&apos;re a perfect fit if you&apos;re:</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-12">
          {cards.map((c) => (
            <div key={c.title} className="bg-forest rounded-[20px] p-7 min-h-[200px] flex flex-col justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.icon} alt="" className={`${c.iconClass} w-auto object-contain self-start brightness-0 invert opacity-90`} />
              <p className="font-inter font-bold text-cream text-[15px] leading-[1.15] tracking-[-0.03em] mt-6">
                <span className="block">{c.title}</span>
                {c.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="serif-i text-[18px] text-cream tracking-[-0.06em] bg-forest rounded-[6px] px-7 py-2 hover:scale-[1.03] transition">Join Now</button>
        </div>
      </div>
    </section>
  );
}
