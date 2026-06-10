const cards = [
  {
    icon: "/assets/fit-icon-3.png",
    title: "Weekly live community calls",
    body: "Join intimate sessions where members share real progress, get honest feedback, and solve the biggest challenges blocking their next move.",
  },
  {
    icon: "/assets/inside-illustration.png",
    title: "Guest sessions from top entrepreneurs",
    body: "Join intimate sessions where members share real progress, get honest feedback, and solve the biggest challenges blocking their next move.",
  },
  {
    icon: "/assets/fit-icon-2.png",
    title: "In-person exclusive events",
    body: "Connect face-to-face with your circle at selective meetups and gatherings because the best relationships happen offline.",
  },
];

export default function WhatsInside() {
  return (
    <section className="relative bg-forest grain overflow-hidden py-24">
      <div className="relative z-10 max-w-[1280px] mx-auto px-8">
        <span className="serif-i text-black text-[20px] tracking-[-0.06em] bg-cream rounded-full px-8 py-1.5 inline-block">The Sauce</span>
        <h2 className="serif-i text-white text-[40px] tracking-[-0.06em] mt-5">Is it even worth it to join visioncircle</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {cards.map((c) => (
            <div key={c.title} className="bg-ink rounded-[12px] px-7 pt-10 pb-9 flex flex-col items-center text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.icon} alt="" className="h-[150px] object-contain brightness-0 invert" />
              <h3 className="font-inter font-bold text-cream text-[19px] tracking-[-0.04em] mt-6">{c.title}</h3>
              <p className="font-inter font-bold text-cream/90 text-[12px] leading-[1.4] tracking-[-0.03em] mt-3 max-w-[230px]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
