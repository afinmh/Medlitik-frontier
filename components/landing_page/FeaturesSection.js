import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};
const itemFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const slowSlideInRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const featureIcons = [
  { src: "/rehab.svg", alt: "Panduan Rehabilitasi" },
  { src: "/buah.svg", alt: "Pola Hidup Sehat" },
  { src: "/sign.svg", alt: "Warning Signs" },
  { src: "/health.svg", alt: "Monitoring Progress" },
];

export default function FeaturesSection() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 10 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setParticles(arr);
  }, []);

  return (
    <motion.section
      className="relative py-16 overflow-hidden bg-gradient-to-br from-[#f0f7ff] via-white to-[#e3f0ff] text-[90%] md:text-[95%]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234299e1' fill-opacity='0.10'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {particles.map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#3570ff] rounded-full opacity-20"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-2 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div variants={itemFadeIn} className="text-[#1a2a3a] ml-0 md:ml-8 lg:ml-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
              <span className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] bg-clip-text text-transparent">Fitur Unggulan</span> Medlitik
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-7 max-w-xl">
              Medlitik menghadirkan AI Recovery Assistant, monitoring kesehatan, dan edukasi gaya hidup sehat dalam satu platform.
            </p>
            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-7 md:mb-10">
              {[
                { icon: 0, title: "Panduan Rehabilitasi", desc: "Jadwal & program pemulihan personal" },
                { icon: 1, title: "Pola Hidup Sehat", desc: "Rekomendasi nutrisi & aktivitas" },
                { icon: 2, title: "Warning Signs", desc: "Deteksi dini gejala yang perlu diwaspadai" },
                { icon: 3, title: "Monitoring Progress", desc: "Pantau kemajuan pemulihan real-time" }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white/90 border border-[#e3f0ff] rounded-2xl p-4 md:p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:border-[#3570ff] transition-all duration-300 group cursor-pointer"
                >
                  <Image src={featureIcons[feature.icon].src} alt={featureIcons[feature.icon].alt} width={36} height={36} className="mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-[#3570ff] mb-1 text-base md:text-lg">{feature.title}</div>
                  <div className="text-xs text-gray-600">{feature.desc}</div>
                </div>
              ))}
            </div>
            {/* CTA Button */}
            <div className="flex gap-3 md:gap-4 mt-1 md:mt-2">
              <button
                className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] text-white px-5 py-2 md:px-7 md:py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-base md:text-lg"
              >
                <Image src="/bot.svg" alt="Bot" width={24} height={24} />
                Mulai Program AI
              </button>
              <button
                className="border-2 border-[#3570ff] text-[#3570ff] px-5 py-2 md:px-7 md:py-3 rounded-full font-semibold bg-white/70 hover:bg-[#e3f0ff] hover:text-[#2856b6] transition-all duration-200 flex items-center gap-2 text-base md:text-lg"
              >
                <Image src="/demo.svg" alt="Demo" width={24} height={24} />
                Lihat Demo
              </button>
            </div>
          </motion.div>
          {/* Right - AI Chat Interface Mockup */}
          <motion.div
            className="relative"
            variants={slowSlideInRight}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative bg-white/95 border border-[#e3f0ff] rounded-3xl p-4 md:p-6 shadow-xl max-w-xs md:max-w-md mx-auto text-[90%] md:text-[95%]">
              {/* Chat Header */}
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[#e3f0ff]">
                <div className="relative">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-xl flex items-center justify-center">
                    <Image src="/bot.svg" alt="Bot" width={20} height={20} />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#1a2a3a] text-sm md:text-base">Recovery AI Assistant</div>
                  <div className="text-xs text-green-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse" />
                    Online
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">Thinking...</span>
                </div>
              </div>
              {/* Chat Messages */}
              <div className="space-y-3 md:space-y-4 mb-3 md:mb-4">
                {/* AI Message */}
                <div className="flex gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs md:text-sm">AI</span>
                  </div>
                  <div className="bg-[#f8fbff] border border-[#e3f0ff] rounded-2xl rounded-tl-md p-3 md:p-4 max-w-[180px] md:max-w-xs">
                    <p className="text-[#1a2a3a] text-xs md:text-sm mb-1 md:mb-2">
                      Halo! Berdasarkan diagnosis dokter, saya akan membantu program pemulihan Anda:
                    </p>
                    <div className="space-y-1 text-[10px] md:text-xs text-gray-600">
                      <div>• Jadwal rehabilitasi harian</div>
                      <div>• Panduan pola hidup sehat</div>
                      <div>• Monitor warning signs</div>
                    </div>
                  </div>
                </div>
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-2xl rounded-tr-md p-3 md:p-4 max-w-[180px] md:max-w-xs">
                    <p className="text-white text-xs md:text-sm">
                      Dokter sudah memberikan diagnosis hipertensi. Bagaimana program pemulihan yang cocok untuk saya?
                    </p>
                  </div>
                </div>
                {/* AI Typing Indicator */}
                <div className="flex gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs md:text-sm">AI</span>
                  </div>
                  <div className="bg-[#f8fbff] border border-[#e3f0ff] rounded-2xl rounded-tl-md p-3 md:p-4">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-[#6ad7e5] rounded-full opacity-60 animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mb-2">
                {[
                  "🏃‍♂️ Program Rehabilitasi",
                  "🥗 Diet Sehat", 
                  "⚠️ Warning Signs",
                ].map((action, i) => (
                  <button
                    key={i}
                    className="bg-[#f0f7ff] border border-[#e3f0ff] text-[#3570ff] px-2 md:px-3 py-1.5 md:py-2 rounded-xl text-[10px] md:text-xs hover:bg-[#3570ff] hover:text-white transition-all"
                  >
                    {action}
                  </button>
                ))}
              </div>
              {/* Input Area */}
              <div className="flex gap-2 md:gap-3 items-center bg-[#f8fbff] border border-[#e3f0ff] rounded-2xl p-2 md:p-3 mt-2">
                <input 
                  type="text" 
                  placeholder="Bagaimana kondisi Anda hari ini?"
                  className="flex-1 bg-transparent text-[#1a2a3a] placeholder-gray-500 text-xs md:text-sm outline-none"
                  disabled
                />
                <button
                  className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] p-2 rounded-xl hover:scale-105 transition-all duration-200"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              {/* Floating Stats - Modern Glassmorphism Badge */}
              <div className="absolute -top-6 md:left-80 flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-[#e3f0ff] shadow-xl animate-float-up">
                {/* Check-circle icon */}
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-base md:text-lg font-bold text-green-600">95%</span>
                <span className="text-xs md:text-sm font-semibold text-gray-700">Recovery Rate</span>
              </div>
              <div className="absolute -bottom-6  md:right-70 flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-[#e3f0ff] shadow-xl animate-float-down">
                {/* Clock icon */}
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#3570ff]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-base md:text-lg font-bold text-[#3570ff]">24/7</span>
                <span className="text-xs md:text-sm font-semibold text-gray-700">Monitoring</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
