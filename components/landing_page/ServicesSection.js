import Image from "next/image";
import { motion } from "framer-motion";

// Animation variants
const containerStagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};
const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const services = [
  {
    icon: "/bot.svg",
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
      className="relative max-w-7xl mx-auto px-4 py-16 md:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={containerStagger}
    >
      {/* Medical-themed floating ornaments */}
      {/* Extra layer: more medical icons for a lively effect */}
      <span className="hidden md:block absolute top-0 left-10 z-0 opacity-10 animate-bounce-slow">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="13" y="4" width="6" height="24" rx="3" fill="#e17055"/><rect x="10" y="10" width="12" height="4" rx="2" fill="#ffb6ec"/></svg>
      </span>
      <span className="hidden md:block absolute bottom-0 left-0 z-0 opacity-10 animate-pulse">
        <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><ellipse cx="20" cy="20" rx="18" ry="8" fill="#6ad7e5" opacity=".12"/><rect x="16" y="10" width="8" height="20" rx="4" fill="#6ad7e5"/></svg>
      </span>
      <span className="hidden md:block absolute top-1/3 right-0 z-0 opacity-10 animate-bounce">
        <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><path d="M18 6c6.627 0 12 5.373 12 12s-5.373 12-12 12S6 24.627 6 18" stroke="#00b894" strokeWidth="2"/><rect x="16" y="16" width="4" height="4" rx="2" fill="#00b894"/></svg>
      </span>
      <span className="hidden md:block absolute top-1/4 left-1/4 z-0 opacity-10 animate-bounce-slow">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path d="M8 16c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#ffb6ec" strokeWidth="2"/><rect x="14" y="14" width="4" height="4" rx="2" fill="#ffb6ec"/></svg>
      </span>
      <span className="hidden md:block absolute bottom-1/3 right-1/4 z-0 opacity-10 animate-pulse">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="8" y="8" width="16" height="16" rx="8" fill="#6ad7e5" opacity=".1"/><rect x="14" y="14" width="4" height="4" rx="2" fill="#6ad7e5"/></svg>
      </span>
      <span className="hidden md:block absolute top-1/2 right-10 z-0 opacity-10 animate-bounce">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="14" y="4" width="4" height="24" rx="2" fill="#ffb6ec"/><rect x="4" y="14" width="24" height="4" rx="2" fill="#3570ff"/></svg>
      </span>
      <span className="hidden md:block absolute bottom-10 left-1/2 z-0 opacity-10 animate-bounce-slow">
        <svg width="38" height="38" fill="none" viewBox="0 0 38 38"><path d="M19 4c8.284 0 15 6.716 15 15s-6.716 15-15 15S4 27.284 4 19" stroke="#3570ff" strokeWidth="2"/><path d="M12 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#ffb6ec" strokeWidth="2"/></svg>
      </span>
      <span className="hidden md:block absolute top-0 right-1/2 z-0 opacity-10 animate-pulse">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><ellipse cx="16" cy="16" rx="14" ry="6" fill="#e17055" opacity=".12"/><rect x="12" y="8" width="8" height="16" rx="4" fill="#e17055"/></svg>
      </span>
      <span className="hidden md:block absolute bottom-0 right-0 z-0 opacity-10 animate-bounce">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="8" y="8" width="16" height="16" rx="8" fill="#6ad7e5" opacity=".1"/><rect x="14" y="14" width="4" height="4" rx="2" fill="#6ad7e5"/></svg>
      </span>
      <span className="hidden md:block absolute -top-8 left-1/4 z-0 opacity-20 animate-bounce-slow">
        <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#6ad7e5" opacity=".2"/><path d="M28 18c0 3.866-3.134 7-7 7s-7-3.134-7-7" stroke="#3570ff" strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="14" r="3" fill="#3570ff"/></svg>
      </span>
      <span className="hidden md:block absolute top-10 right-10 z-0 opacity-20 animate-pulse">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="14" y="4" width="4" height="24" rx="2" fill="#ffb6ec"/><rect x="4" y="14" width="24" height="4" rx="2" fill="#3570ff"/></svg>
      </span>
      <span className="hidden md:block absolute bottom-8 left-8 z-0 opacity-20 animate-bounce">
        <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="8" y="16" width="20" height="4" rx="2" fill="#00b894"/><rect x="16" y="8" width="4" height="20" rx="2" fill="#00b894"/></svg>
      </span>
      <span className="hidden md:block absolute bottom-0 right-1/4 z-0 opacity-20 animate-bounce-slow">
        <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><ellipse cx="18" cy="18" rx="16" ry="8" fill="#e17055" opacity=".15"/><rect x="14" y="10" width="8" height="16" rx="4" fill="#e17055"/></svg>
      </span>
      <span className="hidden md:block absolute top-1/2 left-0 z-0 opacity-20 animate-pulse">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path d="M16 4v24M4 16h24" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round"/></svg>
      </span>
      {/* Extra medical ornaments */}
      <span className="hidden md:block absolute top-0 right-1/3 z-0 opacity-15 animate-bounce">
        <svg width="38" height="38" fill="none" viewBox="0 0 38 38"><path d="M19 4c8.284 0 15 6.716 15 15s-6.716 15-15 15S4 27.284 4 19" stroke="#3570ff" strokeWidth="2"/><path d="M12 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#ffb6ec" strokeWidth="2"/></svg>
      </span>
      <span className="hidden md:block absolute bottom-10 right-8 z-0 opacity-15 animate-bounce-slow">
        <svg width="34" height="34" fill="none" viewBox="0 0 34 34"><rect x="8" y="15" width="18" height="4" rx="2" fill="#6c5ce7"/><rect x="15" y="8" width="4" height="18" rx="2" fill="#6c5ce7"/></svg>
      </span>
      <span className="hidden md:block absolute top-1/4 left-8 z-0 opacity-15 animate-pulse">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><ellipse cx="16" cy="16" rx="14" ry="6" fill="#e17055" opacity=".12"/><rect x="12" y="8" width="8" height="16" rx="4" fill="#e17055"/></svg>
      </span>
      <span className="hidden md:block absolute bottom-1/4 left-1/3 z-0 opacity-15 animate-bounce">
        <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><path d="M18 6c6.627 0 12 5.373 12 12s-5.373 12-12 12S6 24.627 6 18" stroke="#00b894" strokeWidth="2"/><rect x="16" y="16" width="4" height="4" rx="2" fill="#00b894"/></svg>
      </span>
      <span className="hidden md:block absolute top-8 left-1/2 z-0 opacity-15 animate-bounce-slow">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path d="M8 16c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#ffb6ec" strokeWidth="2"/><rect x="14" y="14" width="4" height="4" rx="2" fill="#ffb6ec"/></svg>
      </span>
      <span className="hidden md:block absolute bottom-0 left-1/4 z-0 opacity-15 animate-pulse">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="8" y="8" width="16" height="16" rx="8" fill="#6ad7e5" opacity=".1"/><rect x="14" y="14" width="4" height="4" rx="2" fill="#6ad7e5"/></svg>
      </span>
      {/* End medical ornaments */}
      <div className="text-center mb-10 md:mb-14">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-5 tracking-tight"
          variants={fadeDown}
        >
          Layanan <span className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] bg-clip-text text-transparent">Unggulan</span>
        </motion.h2>
        <motion.p
          className="text-base md:text-lg text-gray-500 max-w-xl mx-auto"
          variants={fadeUp}
        >
          Akses layanan kesehatan digital terdepan dengan teknologi AI & jaringan dokter profesional.
        </motion.p>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        variants={containerStagger}
      >
        {services.map((s, i) => (
          <motion.div
            key={i}
            className={`group rounded-xl border border-gray-100 bg-white/70 flex flex-col items-center text-center px-6 py-10 md:px-7 md:py-12 cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:border-[#3570ff]/30`}
            style={{ minHeight: 260 }}
            variants={fadeUp}
          >
            <div className="mb-5 flex items-center justify-center">
              <div
                className={`rounded-full ${s.iconBg} bg-opacity-10 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-100 group-hover:shadow-lg animate-gradient-move`}
                style={{
                  backgroundImage: `linear-gradient(90deg, var(--tw-gradient-stops))`,
                  filter: 'blur(0px)'
                }}
              >
                <Image src={s.icon} alt={s.title} width={56} height={56} className="w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
            <h3 className="font-semibold text-base md:text-lg mb-2 text-gray-900 group-hover:text-[#3570ff] transition-colors">
              {s.title}
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
