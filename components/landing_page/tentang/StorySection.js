import { motion } from "framer-motion";
import Image from "next/image";

export default function StorySection({ staggerContainer, itemFadeIn }) {
  return (
    <section className="py-24 bg-[#f0f7ff]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={itemFadeIn} className="order-2 md:order-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-[#3570ff]" />
              <span className="text-[#3570ff] font-semibold text-sm tracking-wide uppercase">Kisah Kami</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2a3a] mb-4 tracking-tight">
              Perjalanan Membangun Medlitik
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-6 max-w-xl">
              Medlitik didirikan pada tahun 2020 oleh Dr. Surya Wijaya, seorang dokter bedah yang prihatin terhadap sulitnya akses layanan kesehatan berkualitas di Indonesia, khususnya di daerah terpencil. Berbekal pengalaman bertahun-tahun, ia melihat perlunya solusi yang menjembatani pasien dengan dokter spesialis secara lebih mudah dan efisien.
            </p>
            <p className="text-gray-700 text-base md:text-lg mb-4 max-w-xl">
              Dengan menggabungkan keahlian medis dan teknologi digital, Dr. Surya membentuk tim profesional untuk menghadirkan Medlitik sebagai platform konsultasi online. Kini, Medlitik telah berkembang menjadi ekosistem kesehatan digital yang melayani ribuan pasien setiap bulan dan terus berinovasi untuk meningkatkan kualitas layanan kesehatan di tanah air.
            </p>
          </motion.div>
          <motion.div variants={itemFadeIn} className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[5/6] mx-auto group">
              <Image
                src="/story.jpg"
                alt="Kisah Medlitik"
                fill
                className="object-cover rounded-2xl shadow-xl border border-blue-100 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-200/60"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
              <span className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#e0eaff] to-[#f0f7ff] opacity-60 blur-md -z-10 transition-all duration-300 group-hover:opacity-80" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
