export default function Navbar() {
  return (
    <nav className="relative z-20 bg-cream rounded-[10px]">
      <div className="max-w-[1440px] mx-auto h-[88px] px-12 flex items-center justify-between">
        {/* logo */}
        <div className="w-[60px] h-[60px] rounded-full bg-forest flex items-center justify-center shrink-0">
          <span className="serif-i text-cream text-[15px] tracking-[-0.07em]">Visioncircle</span>
        </div>

        {/* links */}
        <div className="flex items-center gap-12">
          <a href="#about" className="serif-i text-[20px] text-black tracking-[-0.06em] whitespace-nowrap hover:opacity-60 transition">About Visioncircle</a>
          <a href="#team" className="serif-i text-[20px] text-black tracking-[-0.06em] whitespace-nowrap hover:opacity-60 transition">Lean Team</a>
          <a href="#faq" className="serif-i text-[20px] text-black tracking-[-0.06em] whitespace-nowrap hover:opacity-60 transition">Faq</a>
        </div>

        {/* join */}
        <button className="serif-i text-[14px] text-black tracking-[-0.06em] whitespace-nowrap bg-cream border border-forest rounded-[5px] px-5 py-1.5 hover:bg-forest hover:text-cream transition">Join now</button>
      </div>
    </nav>
  );
}
