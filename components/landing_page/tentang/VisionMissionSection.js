import { motion } from "framer-motion";
import Image from "next/image";

export default function VisionMissionSection({ staggerContainer, itemFadeIn }) {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      <motion.div 
        className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div variants={itemFadeIn} className="flex items-center justify-center">
          <div className="relative w-full h-[400px] md:h-[520px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/visi.jpg"
              alt="Visi Medlitik"
              fill
              style={{ objectFit: 'cover' }}
              className=""
              priority
            />
            <div className="absolute inset-0" />
          </div>
        </motion.div>
        <motion.div variants={itemFadeIn} className="flex flex-col justify-center">
          <div className="inline-block px-4 py-2 bg-blue-50 text-[#3570ff] font-semibold rounded-full mb-4 text-sm tracking-wide shadow-sm">
            Visi & Misi Kami
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a2a3a] mb-6">
            Transformasi Layanan Kesehatan untuk Semua
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-[#3570ff] mb-2">Visi</h3>
              <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed bg-white/70 rounded-xl px-4 py-3 shadow-sm transition-all duration-200 hover:bg-white/90 hover:shadow-md hover:-translate-y-1 cursor-pointer">
                Menjadi penyedia layanan kesehatan digital terdepan yang membuat perawatan kesehatan berkualitas dapat diakses oleh semua orang, kapan saja, di mana saja.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#3570ff] mb-2">Misi</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base font-normal">
                <li>Menyediakan akses mudah ke layanan kesehatan berkualitas melalui teknologi digital</li>
                <li>Menghubungkan pasien dengan dokter terbaik sesuai kebutuhan spesifik mereka</li>
                <li>Meningkatkan kesadaran dan edukasi kesehatan di masyarakat</li>
                <li>Mengembangkan solusi inovatif untuk meningkatkan pengalaman perawatan kesehatan</li>
                <li>Membangun ekosistem kesehatan yang terintegrasi untuk perawatan yang komprehensif</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
