import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ fadeIn }) {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/tentang/about.jpg"
          alt="About Hero Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Tentang Medlitik</h1>
          <p className="text-base md:text-lg font-semibold max-w-2xl mx-auto mt-8 text-white drop-shadow-lg">
            Medlitik adalah platform kesehatan digital terpadu yang menghubungkan pasien dengan dokter terbaik dan layanan kesehatan berkualitas
          </p>
        </motion.div>
      </div>
    </section>
  );
}
