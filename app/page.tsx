import Hero from "@/components/Hero";
import Fit from "@/components/Fit";
import WhatsInside from "@/components/WhatsInside";
import Perks from "@/components/Perks";
import LeanTeam from "@/components/LeanTeam";
import Gallery from "@/components/Gallery";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Fit />
      <WhatsInside />
      <Perks />
      <LeanTeam />
      <Gallery />
      <Cta />
      <Footer />
    </main>
  );
}
