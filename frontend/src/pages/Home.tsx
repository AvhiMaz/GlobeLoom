// import LandingPage from "@/components/Landing";
import ImageSlider from "@/components/Carousel";
import LastSection from "@/components/LastSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="container max-xs:px-2">
      <Navbar />
      <ImageSlider />
      <LastSection />
      {/* <LandingPage /> */}
    </div>
  );
}
