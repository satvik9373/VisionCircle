const team = [
  {
    photo: "/assets/satvik.jpg",
    name: "Satvik Chaturvedi",
    bio: [
      "Satvik has been building software for international clients and top-tier agencies since he was 18. Currently studying Computer Science, he's designed systems for leading startups, worked with A-player teams across the globe, and gained real-world experience most developers take years to build.",
      "When he's not coding, he's growing his personal brand and connecting with builders who are serious about their craft.",
    ],
  },
  {
    photo: "/assets/aarush.jpg",
    name: "Aarush Yadav",
    bio: [
      "Aarush builds and ships SaaS platforms while studying Computer Science. Over the past year, he's launched multiple products, learned how real software businesses work from the inside, and built a growing presence in the AI and tech space.",
      "He's focused on turning ideas into working products and helping others do the same.",
    ],
  },
];

export default function LeanTeam() {
  return (
    <section id="team" className="relative bg-forest grain overflow-hidden py-24">
      <div className="relative z-10 max-w-[1280px] mx-auto px-8">
        <div className="flex justify-center">
          <span className="serif-i text-black text-[20px] tracking-[-0.06em] bg-cream rounded-full px-8 py-1.5">Lean Team</span>
        </div>
        <h2 className="font-inter font-extrabold text-white text-[48px] leading-[1.05] tracking-[-0.06em] text-center mt-6">
          Lean Team of &ldquo;A&rdquo; players
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 mt-20 max-w-[1100px] mx-auto">
          {team.map((m) => (
            <div key={m.name} className="flex flex-col">
              <div
                className="w-full aspect-[480/454] rounded-[30px] bg-cover bg-center"
                style={{ backgroundImage: `url('${m.photo}')` }}
              />
              <h3 className="font-inter font-extrabold text-cream text-[40px] tracking-[-0.05em] mt-9">{m.name}</h3>
              {m.bio.map((para, i) => (
                <p key={i} className="font-inter font-bold text-cream text-[22px] leading-[1.15] tracking-[-0.04em] mt-6">{para}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
