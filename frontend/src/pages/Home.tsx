import ImageSlider from "@/components/Carousel";
import Hero from "@/components/Hero";
import HowSection from "@/components/HowSection";
import LastSection from "@/components/LastSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="container max-xs:px-2">
      <Navbar />
      <Hero />
      <ImageSlider />
      <HowSection />
      <LastSection />
    </div>
  );
}
