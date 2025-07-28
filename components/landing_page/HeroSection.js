import Image from "next/image";
import { useEffect, useState } from "react";

const bgImages = [
  "/landing/landing4.webp",
  "/landing/landing2.webp",
  "/landing/landing3.webp"
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blendToIndex, setBlendToIndex] = useState(1);
  const [isBlending, setIsBlending] = useState(false);
  const [nextLoaded, setNextLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlendToIndex((currentIndex + 1) % bgImages.length);
      setNextLoaded(false);
      setIsBlending(true);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (isBlending && nextLoaded) {
      const timeout = setTimeout(() => {
        setCurrentIndex(blendToIndex);
        setIsBlending(false);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [isBlending, nextLoaded, blendToIndex]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background images with smooth blend animation */}
      {/* Gambar aktif */}
      <Image
        src={bgImages[currentIndex]}
        alt="Background Hero"
        fill
        className={`object-cover object-center absolute inset-0 z-0 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'} `}
        priority
      />
      {/* Gambar berikutnya untuk blend */}
      {isBlending && (
        <Image
          src={bgImages[blendToIndex]}
          alt="Background Hero Next"
          fill
          className={`object-cover object-center absolute inset-0 z-10 transition-opacity duration-[1200ms] ${nextLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          priority={false}
          onLoadingComplete={() => setNextLoaded(true)}
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-20" />
      <div className="relative z-30 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-center px-6 py-10 gap-12 min-h-screen">
        {/* Left: Text (seperti sebelumnya) */}
        <div className={`flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left pl-0 md:pl-10 mt-40 md:mt-56 transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} delay-100`}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-7 leading-tight text-white drop-shadow-xl">
            Selamat Datang di <span className="bg-gradient-to-r from-[#6ad7e5] to-[#3570ff] bg-clip-text text-transparent text-white">Medlitik</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-md font-medium drop-shadow-lg">
            Satu aplikasi untuk konsultasi, rekam medis, dan pemantauan kesehatan berbasis AI. Mudah, aman, dan terpercaya.
          </p>
        </div>
        {/* Right: Kosong + Button-group di pojok kanan bawah Hero Section */}
        <div className="flex-1 flex flex-col justify-end items-end h-full min-h-[400px] pb-0">

        </div>
      </div>
    </section>
  );
}
