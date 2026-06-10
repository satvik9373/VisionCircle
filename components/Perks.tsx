const perks = [
  {
    title: "Private community access",
    body: "Stay connected between calls with a clean, distraction-free space where members share updates, ask questions, and keep each other moving forward.",
  },
  {
    title: "Hot seat feedback sessions",
    body: "Bring your biggest block to the call and get live problem-solving from the entire group—fresh perspectives that unstick you fast.",
  },
  {
    title: "Free access to premium tools",
    body: "Get direct access to community software and affiliated tools at no cost resources that normally cost lakhs, included just for being part of the circle.",
  },
];

export default function Perks() {
  return (
    <section className="relative bg-forest grain overflow-hidden py-24">
      <div className="relative z-10 max-w-[1280px] mx-auto px-8">
        <span className="serif-i text-black text-[20px] tracking-[-0.06em] bg-cream rounded-full px-8 py-1.5 inline-block">Perks</span>
        <h2 className="serif-i text-white text-[48px] tracking-[-0.06em] mt-5">Community Perks</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {perks.map((p) => (
            <div key={p.title} className="bg-ink rounded-[12px] aspect-[200/260] flex flex-col items-center justify-center text-center px-8">
              <h3 className="font-inter font-bold text-cream text-[19px] tracking-[-0.04em]">{p.title}</h3>
              <p className="font-inter font-bold text-cream/90 text-[12px] leading-[1.4] tracking-[-0.03em] mt-3 max-w-[220px]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
