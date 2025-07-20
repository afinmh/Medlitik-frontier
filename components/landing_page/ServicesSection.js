import Image from "next/image";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};
const itemSlowFadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const services = [
  {
    icon: "/ai.svg",
    title: "Konsultasi AI",
    desc: "Diagnosis awal dengan AI medical assistant yang akurat dan cepat 24/7",
    gradient: "from-blue-50 to-indigo-100",
    iconBg: "bg-gradient-to-r from-[#3570ff] to-[#4e7fff]"
  },
  {
    icon: "/doctor.svg",
    title: "Dokter Spesialis",
    desc: "Jaringan dokter bersertifikat dari berbagai spesialisasi medis",
    gradient: "from-emerald-50 to-teal-100",
    iconBg: "bg-gradient-to-r from-[#00b894] to-[#00a085]"
  },
  {
    icon: "/schedule.svg",
    title: "Jadwal Fleksibel",
    desc: "Booking appointment online dengan sistem manajemen waktu yang efisien",
    gradient: "from-orange-50 to-red-100",
    iconBg: "bg-gradient-to-r from-[#e17055] to-[#d63447]"
  },
  {
    icon: "/shield.svg",
    title: "Keamanan Data",
    desc: "Perlindungan data medis dengan enkripsi tingkat enterprise",
    gradient: "from-purple-50 to-violet-100",
    iconBg: "bg-gradient-to-r from-[#6c5ce7] to-[#5f27cd]"
  },
];

export default function ServicesSection() {
  return (
    <motion.section
      id="services"
      className="max-w-7xl mx-auto px-2 md:px-4 py-16 md:py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
    >
      <motion.div className="text-center mb-12 md:mb-16" variants={itemSlowFadeIn}>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2a3a] mb-4 md:mb-6">
          Layanan <span className="text-[#3570ff]">Unggulan</span>
        </h2>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
          Akses komprehensif ke layanan kesehatan digital terdepan dengan teknologi AI dan jaringan dokter profesional
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className={`bg-white/60 backdrop-blur-lg border border-[#e3f0ff] rounded-2xl shadow-xl hover:shadow-2xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-400 group hover:border-[#3570ff]/40 hover:bg-white/80`}
            variants={itemSlowFadeIn}
            whileHover={{ y: -10, scale: 1.03 }}
          >
            <div className={`${s.iconBg} p-3 md:p-4 rounded-xl mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Image src={s.icon} alt={s.title} width={36} height={36} className="md:w-12 md:h-12" />
            </div>
            <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-4 text-[#1a2a3a] group-hover:text-[#3570ff] transition-colors">{s.title}</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
