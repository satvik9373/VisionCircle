export default function Cta() {
  return (
    <section id="faq" className="relative bg-cream grain-soft overflow-hidden py-24">
      <div className="relative z-10 max-w-[1280px] mx-auto px-8">
        <div className="flex justify-center">
          <span className="serif-i text-white text-[20px] tracking-[-0.06em] bg-forest rounded-full px-8 py-1.5">Are you in?</span>
        </div>

        {/* big forest panel */}
        <div className="relative bg-forest grain rounded-[20px] mt-12 mx-auto max-w-[1545px] py-20 px-6 flex justify-center overflow-hidden">
          {/* pricing card */}
          <div className="relative z-10 bg-cream rounded-[20px] w-full max-w-[468px] px-10 py-9 shadow-2xl">
            <div className="flex justify-end">
              <span className="serif-i text-cream text-[18px] tracking-[-0.06em] bg-forest rounded-[8px] px-5 py-1">Most Popular</span>
            </div>
            <p className="font-inter font-extrabold text-black text-[28px] tracking-[-0.05em] mt-2">XX,XX,00</p>
            <hr className="border-black/80 mt-4" />
            <h3 className="font-inter font-extrabold text-black text-[28px] tracking-[-0.05em] mt-6">Lifetime Plan</h3>
            <p className="font-inter font-bold text-black text-[13px] leading-[1.35] tracking-[-0.04em] mt-2">
              Hit on the &ldquo;Join Now&rdquo; button and fill in the details if we found you the perfect fit you&apos;ll get a mail with an exclusive joining link it&apos;s free but exclusive
            </p>
            <hr className="border-black/80 mt-5" />
            <div className="flex justify-center mt-7">
              <button className="serif-i text-[18px] text-cream tracking-[-0.06em] bg-forest rounded-[6px] px-12 py-2 hover:scale-[1.03] transition">Join Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
