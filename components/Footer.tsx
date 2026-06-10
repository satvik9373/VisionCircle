export default function Footer() {
  return (
    <footer className="relative bg-cream grain-soft overflow-hidden pt-20 pb-10">
      <div className="relative z-10 max-w-[1700px] mx-auto px-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          {/* left: logo + links */}
          <div className="flex flex-col gap-10">
            <div className="w-[137px] h-[137px] rounded-full bg-forest flex items-center justify-center">
              <span className="serif-i text-cream text-[24px] tracking-[-0.07em]">Visioncircle</span>
            </div>
            <div className="flex items-center gap-10">
              <a href="#about" className="serif-i text-[20px] text-black tracking-[-0.06em] hover:opacity-60 transition">About Visioncircle</a>
              <a href="#team" className="serif-i text-[20px] text-black tracking-[-0.06em] hover:opacity-60 transition">Lean Team</a>
              <a href="#faq" className="serif-i text-[20px] text-black tracking-[-0.06em] hover:opacity-60 transition">Faq</a>
            </div>
          </div>

          {/* right: newsletter */}
          <div className="flex flex-col gap-3 md:items-end">
            <p className="font-inter font-bold text-forest text-[20px] tracking-[-0.06em]">Stay up to date</p>
            <div className="flex items-stretch gap-4">
              <label className="bg-forest rounded-[10px] w-[307px] h-[40px] flex items-center px-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent w-full font-inter font-bold text-white text-[20px] tracking-[-0.06em] placeholder:text-white/90 outline-none"
                />
              </label>
              <button className="serif-i text-[18px] text-cream tracking-[-0.06em] bg-forest rounded-[5px] px-7 hover:scale-[1.03] transition">Subscribe</button>
            </div>
          </div>
        </div>

        <hr className="border-black/30 mt-14" />
        <p className="font-inter font-bold text-black text-[18px] tracking-[-0.05em] text-center mt-8">
          © 2025 Visioncircle. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
