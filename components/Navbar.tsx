export default function Navbar() {
  return (
    <nav className="relative z-20 px-6 pt-5">
      <div className="max-w-[900px] mx-auto bg-cream rounded-[14px] h-[62px] px-6 flex items-center justify-between shadow-sm">
        {/* logo */}
        <div className="w-[42px] h-[42px] rounded-full bg-forest flex items-center justify-center shrink-0">
          <span className="serif-i text-cream text-[10px] tracking-[-0.07em] leading-tight text-center">Vc</span>
        </div>

        {/* links */}
        <div className="flex items-center gap-8">
          <a href="#about" className="serif-i text-[16px] text-black tracking-[-0.06em] whitespace-nowrap hover:opacity-60 transition">About Visioncircle</a>
          <a href="#team" className="serif-i text-[16px] text-black tracking-[-0.06em] whitespace-nowrap hover:opacity-60 transition">Lean Team</a>
          <a href="#faq" className="serif-i text-[16px] text-black tracking-[-0.06em] whitespace-nowrap hover:opacity-60 transition">Faq</a>
        </div>

        {/* join */}
        <button className="serif-i text-[13px] text-black tracking-[-0.06em] whitespace-nowrap bg-cream border border-forest rounded-[5px] px-4 py-1.5 hover:bg-forest hover:text-cream transition">Join now</button>
      </div>
    </nav>
  );
}