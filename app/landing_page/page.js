"use client";

import Navbar from "../../components/landing_page/Navbar";
import HeroSection from "../../components/landing_page/HeroSection";
import FeaturesSection from "../../components/landing_page/FeaturesSection";
import ServicesSection from "../../components/landing_page/ServicesSection";
import AboutSection from "../../components/landing_page/AboutSection";
import Footer from "../../components/landing_page/Footer";

export default function Home() {
  return (
    <div className="bg-[#f0f7ff] min-h-screen w-full font-sans">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <AboutSection />
      <Footer />
    </div>
  );
}