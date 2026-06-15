import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative bg-forest grain overflow-hidden">
      <Navbar />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 flex flex-col items-center text-center pt-24 pb-28">
     <h1 className="font-inter font-extrabold text-white text-[48px] leading-[1.05] tracking-[-0.06em] whitespace-nowrap">
  Build faster with people
</h1>
        <h2 className="serif-i text-white text-[64px] leading-[1.0] tracking-[-0.07em] mt-4 whitespace-nowrap">
          who won&apos;t let you quit.
        </h2>

        <p className="font-inter font-bold text-cream text-[16px] leading-[1.3] tracking-[-0.04em] mt-8 max-w-[560px]">
          Join a handpicked community of creators and entrepreneurs who help you move faster, think clearer, and finally finish what you start.
        </p>

        <button className="serif-i text-[18px] text-black tracking-[-0.06em] bg-cream rounded-[6px] px-7 py-2 mt-8 hover:scale-[1.03] transition">
          Join now
        </button>

        {/* video box */}
        <div className="w-full max-w-[774px] aspect-[774/502] rounded-[20px] bg-[#d9d9d9] mt-16 flex items-center justify-center">
          <span className="serif-i text-forest text-[64px] tracking-[-0.06em]">Yt Video explaining</span>
        </div>
      </div>
    </section>
  );
}
