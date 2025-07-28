import { motion } from "framer-motion";
import Image from "next/image";

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
const slowSlideInUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
};



export default function AboutSection() {
  const features = [
    { icon: "/landing/hospital.svg", title: "Rumah Sakit Partner", desc: "500+ rumah sakit terpercaya" },
    { icon: "/landing/fast.svg", title: "Response Time", desc: "< 2 menit rata-rata respon" },
    { icon: "/landing/clipboard.svg", title: "Rekam Medis", desc: "Terintegrasi dengan sistem hospital" },
    { icon: "/landing/area.svg", title: "Coverage Area", desc: "34 provinsi di Indonesia" },
  ];
  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          variants={slowSlideInUp}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Decorative floating dots */}
          <span className="hidden md:block absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-[#b8c6ff] to-[#ffb6ec] opacity-40 rounded-full blur-2xl animate-pulse z-0" />
          <span className="hidden md:block absolute top-1/2 -right-10 w-24 h-24 bg-gradient-to-br from-[#6ad7e5] to-[#3570ff] opacity-30 rounded-full blur-2xl animate-pulse z-0" />
          {/* Extra floating accent dots */}
          <span className="hidden md:block absolute top-10 left-1/2 w-6 h-6 bg-gradient-to-br from-[#ffb6ec] to-[#b8c6ff] opacity-30 rounded-full blur-md animate-bounce z-0" />
          <span className="hidden md:block absolute bottom-8 right-24 w-8 h-8 bg-gradient-to-br from-[#6ad7e5] to-[#3570ff] opacity-20 rounded-full blur-lg animate-bounce-slow z-0" />
          {/* Gradient line accent */}
          <span className="hidden md:block absolute left-1/4 top-0 w-1 h-32 bg-gradient-to-b from-[#ffb6ec] to-[#3570ff] opacity-20 rounded-full z-0" />
          {/* Floating medical icon (optional, can be removed if too much) */}
          <span className="hidden md:block absolute right-8 top-8 z-0 opacity-20"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="14" y="4" width="4" height="24" rx="2" fill="#3570ff"/><rect x="4" y="14" width="24" height="4" rx="2" fill="#ffb6ec"/></svg></span>
          {/* Subtle background shape */}
          <svg className="absolute left-0 bottom-0 w-32 h-32 opacity-10 z-0" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="#3570ff" /></svg>
          <div className="bg-gradient-to-br from-[#f8fbff] to-[#f0f7ff] rounded-3xl shadow-xl overflow-hidden relative z-10">
            <div className="p-8">
              {/* Badge above doctor grid */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-[#3570ff] text-white text-xs font-semibold rounded-full shadow-sm">Top Rated Doctors</span>
                {/* Smoother, more subtle ping effect */}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[#ffb6ec] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffb6ec] opacity-80"></span>
                </span>
              </div>
              {/* More ornaments: floating heart, extra lines, extra dots */}
              <span className="hidden md:block absolute left-10 bottom-24 z-0 opacity-20 animate-bounce-slow">
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M14 25s-7.5-5.5-10-9.5C1.5 12 3 8 7 8c2.5 0 4 2 4 2s1.5-2 4-2c4 0 5.5 4 3 7.5-2.5 4-10 9.5-10 9.5z" fill="#ffb6ec"/></svg>
              </span>
              <span className="hidden md:block absolute right-1/3 top-0 w-1 h-20 bg-gradient-to-b from-[#6ad7e5] to-[#ffb6ec] opacity-10 rounded-full z-0" />
              <span className="hidden md:block absolute left-1/2 bottom-0 w-1 h-16 bg-gradient-to-t from-[#3570ff] to-[#b8c6ff] opacity-10 rounded-full z-0" />
              <span className="hidden md:block absolute left-24 top-1/3 w-4 h-4 bg-gradient-to-br from-[#ffb6ec] to-[#b8c6ff] opacity-30 rounded-full blur-md animate-bounce z-0" />
              <span className="hidden md:block absolute right-16 bottom-10 w-5 h-5 bg-gradient-to-br from-[#6ad7e5] to-[#3570ff] opacity-20 rounded-full blur-lg animate-bounce-slow z-0" />
<style jsx global>{`
  @keyframes ping-slow {
    0% { transform: scale(1); opacity: 0.7; }
    70% { transform: scale(2.2); opacity: 0.1; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  .animate-ping-slow {
    animation: ping-slow 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  .animate-bounce-slow {
    animation: bounce 2.5s infinite alternate;
  }
`}</style>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { name: "Dr. Sarah Chen", specialty: "Kardiologi", rating: "4.9", patients: "2.5K+", gender: "female" },
                  { name: "Dr. Ahmad Rahman", specialty: "Neurologi", rating: "4.8", patients: "1.8K+", gender: "male" },
                  { name: "Dr. Maria Santos", specialty: "Dermatologi", rating: "5.0", patients: "3.2K+", gender: "female" },
                  { name: "Dr. Kevin Park", specialty: "Pediatri", rating: "4.9", patients: "2.1K+", gender: "male" }
                ].map((doctor, i) => (
                  <motion.div
                    key={i}
                    className="group bg-gradient-to-br from-[#f8fbff] to-[#f0f7ff] p-6 rounded-3xl shadow-lg flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.18, ease: "easeOut" }}
                  >
                    <div className="mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={doctor.gender === "female" ? "/landing/female.png" : "/landing/male.png"}
                        alt={doctor.name}
                        width={96}
                        height={96}
                        className="object-contain"
                        priority={i === 0}
                      />
                    </div>
                    <h4 className="font-semibold text-base text-[#1a2a3a] mb-0.5 text-center group-hover:text-[#3570ff] transition-colors duration-300">
                      {doctor.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-2 text-center">{doctor.specialty}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1 text-yellow-500 font-semibold">⭐ {doctor.rating}</span>
                      <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                      <span>{doctor.patients} pasien</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <button className="bg-[#3570ff] text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-[#2856b6] transition-colors">
                  Lihat Semua Dokter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemSlowFadeIn}>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a2a3a] leading-tight">
            Jaringan Dokter <br/>
            <span className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] bg-clip-text text-transparent">Berpengalaman</span>
          </h3>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Terhubung dengan ribuan dokter spesialis bersertifikat dari rumah sakit ternama 
            di seluruh Indonesia dan dunia.
          </p>
          <div className="space-y-4 mb-8">
            {features.map((item, i) => (
              <motion.div 
                key={i} 
                className="group flex items-start gap-4 p-4 bg-gray-50 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                variants={itemSlowFadeIn}
              >
                <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-125">
                  <Image src={item.icon} alt={item.title} width={36} height={36} />
                </span>
                <div>
                  <h4 className="font-semibold text-[#1a2a3a] mb-1 group-hover:text-[#3570ff] transition-colors duration-300">{item.title}</h4>
                  <p className="text-gray-600 text-sm group-hover:text-[#3570ff] transition-colors duration-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
