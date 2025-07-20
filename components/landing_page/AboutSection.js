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
const slowSlideInUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
};

export default function AboutSection() {
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
          <div className="bg-gradient-to-br from-[#f8fbff] to-[#f0f7ff] rounded-3xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { name: "Dr. Sarah Chen", specialty: "Kardiologi", rating: "4.9", patients: "2.5K+" },
                  { name: "Dr. Ahmad Rahman", specialty: "Neurologi", rating: "4.8", patients: "1.8K+" },
                  { name: "Dr. Maria Santos", specialty: "Dermatologi", rating: "5.0", patients: "3.2K+" },
                  { name: "Dr. Kevin Park", specialty: "Pediatri", rating: "4.9", patients: "2.1K+" }
                ].map((doctor, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-full mb-3 flex items-center justify-center text-white font-bold">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="font-semibold text-sm text-[#1a2a3a] mb-1">{doctor.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{doctor.specialty}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-yellow-500">⭐ {doctor.rating}</span>
                      <span className="text-gray-500">{doctor.patients}</span>
                    </div>
                  </div>
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
            <span className="text-[#3570ff]">Terprofesional</span>
          </h3>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Terhubung dengan ribuan dokter spesialis bersertifikat dari rumah sakit ternama 
            di seluruh Indonesia dan dunia.
          </p>
          <div className="space-y-4 mb-8">
            {[
              { icon: "🏥", title: "Rumah Sakit Partner", desc: "500+ rumah sakit terpercaya" },
              { icon: "⚡", title: "Response Time", desc: "< 2 menit rata-rata respon" },
              { icon: "📋", title: "Rekam Medis", desc: "Terintegrasi dengan sistem hospital" },
              { icon: "🌍", title: "Coverage Area", desc: "34 provinsi di Indonesia" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                variants={itemSlowFadeIn}
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-[#1a2a3a] mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
