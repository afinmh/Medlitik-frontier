import { motion } from "framer-motion";

export default function StatsSection({ fadeIn, stats }) {
  return (
    <section className="py-20 bg-white">
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
                Statistik Medlitik
              </span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2a3a] mb-3 tracking-tight">
            Dampak Kami dalam Angka
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg font-light">
            Kami bangga telah memberikan dampak positif bagi ribuan pasien dan dokter di seluruh Indonesia.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          {stats.map((stat, index) => {
            const icons = [
              (
                <svg key="doctor" className="w-7 h-7 text-[#3570ff] mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a4.5 4.5 0 0 1 9 0v2"/><path d="M16 19h4m-2-2v4"/></svg>
              ),
              (
                <svg key="hospital" className="w-7 h-7 text-[#3570ff] mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M12 12v4m-2-2h4"/></svg>
              ),
              (
                <svg key="patient" className="w-7 h-7 text-[#3570ff] mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1"/></svg>
              ),
              (
                <svg key="city" className="w-7 h-7 text-[#3570ff] mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="7" height="10" rx="2"/><rect x="14" y="7" width="7" height="14" rx="2"/><path d="M7 11V7a2 2 0 0 1 2-2h2"/></svg>
              )
            ];
            return (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center border border-blue-50 shadow-md transition-all duration-300 relative overflow-visible"
                variants={fadeIn}
              >
                {icons[index % icons.length]}
                <div className="relative flex items-center justify-center mb-1">
                  <span className="relative z-10 text-3xl md:text-4xl font-extrabold text-[#3570ff] tracking-tight drop-shadow-sm">
                    {stat.value}
                  </span>
                </div>
                <div className="text-gray-600 text-sm md:text-base font-medium text-center">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
