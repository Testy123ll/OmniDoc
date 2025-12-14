import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="bg-dark-bg">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
