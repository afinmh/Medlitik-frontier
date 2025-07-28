import { motion } from "framer-motion";
import Image from "next/image";

export default function PartnersSection({ fadeIn, partners }) {
  return (
    <section className="py-20 bg-[#f0f7ff]">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex justify-center mb-5">
            <span className="relative inline-block">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e0eaff] to-[#f0f7ff] blur-sm opacity-80 w-full h-full"></span>
              <span className="relative px-5 py-2 bg-white text-[#3570ff] font-semibold rounded-full text-sm tracking-wide shadow-sm border border-blue-100">
                Mitra Kami
              </span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2a3a] mb-3 tracking-tight">
            Kolaborasi untuk Kesehatan Lebih Baik
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg font-light">
            Kami bekerja sama dengan berbagai institusi, rumah sakit, dan perusahaan teknologi untuk memperluas jangkauan dan meningkatkan kualitas layanan kesehatan.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="group bg-white p-6 rounded-2xl border border-blue-50 shadow-sm flex items-center justify-center min-w-[140px] min-h-[80px] transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-visible"
              variants={fadeIn}
            >
              <span className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#e0eaff] to-[#f0f7ff] opacity-0 group-hover:opacity-80 blur-lg -z-10 transition-all duration-300" />
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain drop-shadow-md"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
