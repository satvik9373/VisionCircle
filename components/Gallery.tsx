const tiles = [
  "row-span-2 aspect-[338/500]",
  "aspect-[338/420]",
  "row-span-2 aspect-[338/500]",
  "aspect-[338/350]",
  "row-span-2 aspect-[338/500]",
  "aspect-[338/300]",
  "aspect-[338/420]",
  "aspect-[338/420]",
];

export default function Gallery() {
  return (
    <section className="relative bg-cream grain-soft overflow-hidden py-24">
      <div className="relative z-10 max-w-[1100px] mx-auto px-8">
        <div className="flex justify-center">
          <span className="serif-i text-cream text-[20px] tracking-[-0.06em] bg-forest rounded-full px-8 py-1.5">Touch grass</span>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-16 [grid-auto-rows:minmax(0,1fr)]">
          {tiles.map((t, i) => (
            <div key={i} className={`bg-forest rounded-[10px] ${t}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
