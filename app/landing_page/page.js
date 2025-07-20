"use client"; // Pastikan ini ada di paling atas file

import Image from "next/image";
import { motion } from "framer-motion"; // Import motion dari framer-motion

export default function Home() {
  // Definisi varian animasi dengan durasi yang lebih panjang dan easing yang halus
  // @ts-expect-error
  const slowFadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  // @ts-expect-error
  const slowSlideInUp = {
    hidden: { y: 100, opacity: 0 }, // Jarak awal lebih jauh untuk kesan muncul yang lebih dramatis
    visible: { y: 0, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  // @ts-expect-error
  const slowSlideInRight = {
    hidden: { x: 100, opacity: 0 }, // Jarak awal lebih jauh
    visible: { x: 0, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Jeda antar anak lebih lama
        delayChildren: 0.5, // Tambahkan delay pada children untuk efek muncul bersamaan dengan delay
      },
    },
  };

  // @ts-expect-error
  const itemSlowFadeIn = {
    hidden: { opacity: 0, y: 50 }, // Geser lebih jauh saat muncul
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Durasi item lebih lambat
  };

  return (
    <div className="bg-[#f0f7ff] min-h-screen w-full font-sans">
      {/* Header */}
      <motion.header
        className="absolute top-0 left-0 right-0 z-50 py-6 px-4 max-w-6xl mx-auto flex justify-between items-center"
        initial="hidden"
        animate="visible"
        variants={slowFadeIn}
      >
        <motion.div className="flex items-center space-x-3" variants={itemSlowFadeIn}>
          <Image
            src="https://placeholder.pics/svg/40x40/3570ff/000000/Logo"
            alt="Logo Medlitik"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-[#1a2a3a]">Medlitik</span>
        </motion.div>
        <motion.nav
          className="hidden md:flex items-center space-x-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {[
            { label: "Beranda", href: "/landing_page" },
            { label: "Dokter", href: "/landing_page/dokter" },
            { label: "Tentang", href: "/landing_page/tentang" },
            { label: "Kontak", href: "/landing_page/kontak" },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              className="text-gray-700 hover:text-[#3570ff] font-medium"
              variants={itemSlowFadeIn}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.button
            onClick={() => {
              // Clear any existing user data before going to login
              localStorage.removeItem('user');
              window.location.href = '/auth/login';
            }}
            className="text-[#3570ff] hover:text-[#2856b6] font-medium px-4 py-2 rounded-full border border-[#3570ff] hover:bg-[#f0f8ff] transition"
            variants={itemSlowFadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Masuk
          </motion.button>
          <motion.button
            onClick={() => {
              // Clear any existing user data before going to register
              localStorage.removeItem('user');
              window.location.href = '/auth/register';
            }}
            className="bg-[#3570ff] text-white px-6 py-2 rounded-full hover:bg-[#2856b6] transition font-medium shadow-md flex items-center justify-center"
            variants={itemSlowFadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Daftar
          </motion.button>
        </motion.nav>
        {/* Mobile Menu Icon (Hamburger) - not implemented in detail */}
        <div className="md:hidden">
          <svg className="w-6 h-6 text-[#3570ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative w-full h-[520px] bg-white flex items-center justify-center overflow-hidden border-b border-[#e3eefd]">
        <div className="absolute inset-0 z-0">
          <Image src="https://placeholder.pics/svg/1200x520/e3f0ff/000000/Hospital%20Background" alt="Hospital" layout="fill" objectFit="cover" className="opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#e3f0ff]/80 to-[#f0f7ff]/90" />
        </div>
        <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-10 gap-8">
          <motion.div
            className="flex-1 text-center md:text-left flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={slowSlideInUp}
          >
            <motion.h1 className="text-4xl md:text-6xl font-bold text-[#1a2a3a] mb-6 leading-tight mt-20" variants={itemSlowFadeIn}>
              Kesehatan Digital <br className="hidden md:block" />
              <span className="text-[#3570ff]">Masa Depan</span>
            </motion.h1>
            <motion.p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed" variants={itemSlowFadeIn}>
              Platform kesehatan terintegrasi yang menghubungkan Anda dengan dokter terbaik, 
              teknologi AI terdepan, dan layanan medis berkualitas tinggi.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start mb-8"
              variants={staggerContainer}
            >
              <motion.button
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/auth/register';
                }}
                className="bg-gradient-to-r from-[#3570ff] to-[#4e7fff] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                variants={itemSlowFadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mulai Konsultasi
              </motion.button>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('services');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-[#3570ff] text-[#3570ff] px-8 py-4 rounded-full font-semibold hover:bg-[#3570ff] hover:text-white transition-all duration-300"
                variants={itemSlowFadeIn}
              >
                Pelajari Lebih Lanjut
              </motion.button>
            </motion.div>
            <motion.div className="flex items-center justify-center md:justify-start gap-6 text-gray-600" variants={itemSlowFadeIn}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">24/7 Online</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Dokter Bersertifikat</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">AI Powered</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            initial="hidden"
            animate="visible"
            variants={slowSlideInRight}
            transition={{ delay: 0.7 }} // Delay lebih terasa untuk gambar
          >
            <div className="w-[400px] h-[400px] rounded-2xl shadow-xl relative overflow-hidden mr-16 mt-10">
              <Image
                src="https://placeholder.pics/svg/400x400/3570ff/000000/Doctor"
                alt="Dokter"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <motion.section
        id="services"
        className="max-w-7xl mx-auto px-4 py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-16" variants={itemSlowFadeIn}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a2a3a] mb-6">
            Layanan <span className="text-[#3570ff]">Unggulan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Akses komprehensif ke layanan kesehatan digital terdepan dengan teknologi AI dan jaringan dokter profesional
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { 
            icon: "https://placeholder.pics/svg/80x80/3570ff/ffffff/Search", 
            title: "Konsultasi AI", 
            desc: "Diagnosis awal dengan AI medical assistant yang akurat dan cepat 24/7", 
            gradient: "from-blue-50 to-indigo-100",
            iconBg: "bg-gradient-to-r from-[#3570ff] to-[#4e7fff]"
          },
          { 
            icon: "https://placeholder.pics/svg/80x80/00b894/ffffff/Doctor", 
            title: "Dokter Spesialis", 
            desc: "Jaringan dokter bersertifikat dari berbagai spesialisasi medis", 
            gradient: "from-emerald-50 to-teal-100",
            iconBg: "bg-gradient-to-r from-[#00b894] to-[#00a085]"
          },
          { 
            icon: "https://placeholder.pics/svg/80x80/e17055/ffffff/Schedule", 
            title: "Jadwal Fleksibel", 
            desc: "Booking appointment online dengan sistem manajemen waktu yang efisien", 
            gradient: "from-orange-50 to-red-100",
            iconBg: "bg-gradient-to-r from-[#e17055] to-[#d63447]"
          },
          { 
            icon: "https://placeholder.pics/svg/80x80/6c5ce7/ffffff/Security", 
            title: "Keamanan Data", 
            desc: "Perlindungan data medis dengan enkripsi tingkat enterprise", 
            gradient: "from-purple-50 to-violet-100",
            iconBg: "bg-gradient-to-r from-[#6c5ce7] to-[#5f27cd]"
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={`bg-gradient-to-br ${s.gradient} rounded-3xl shadow-lg hover:shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:border-white/40 transition-all duration-500 group`}
            variants={itemSlowFadeIn}
            whileHover={{ y: -12, scale: 1.02 }}
          >
            <div className={`${s.iconBg} p-4 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Image src={s.icon} alt={s.title} width={48} height={48} />
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#1a2a3a] group-hover:text-[#3570ff] transition-colors">{s.title}</h3>
            <p className="text-gray-600 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
        </div>
      </motion.section>

      {/* Medlitik AI Section - Ultra Enhanced */}
      <motion.section
        className="relative py-24 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234299e1' fill-opacity='0.15'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#3570ff] rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div variants={itemSlowFadeIn} className="text-[#1a2a3a]">
              {/* AI Badge */}
              <motion.div 
                className="inline-flex items-center gap-3 mb-8 bg-gradient-to-r from-[#f0f7ff] to-[#e8f4fd] border border-[#3570ff]/20 px-6 py-3 rounded-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-xl opacity-75"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div>
                  <div className="font-bold text-xl text-[#3570ff]">Recovery Assistant AI</div>
                  <div className="text-xs text-gray-600">Asisten Pemulihan Cerdas</div>
                </div>
                <motion.span 
                  className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  LIVE
                </motion.span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                variants={itemSlowFadeIn}
              >
                Asisten Pemulihan
                <br />
                <span className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] bg-clip-text text-transparent">
                  Pasca Konsultasi
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-700 mb-8 leading-relaxed"
                variants={itemSlowFadeIn}
              >
                AI yang membantu pemulihan optimal setelah konsultasi dokter berakhir. 
                Berdasarkan diagnosis dokter, AI memberikan panduan rehabilitasi, 
                rekomendasi pola hidup sehat, dan mendeteksi warning signs untuk pemulihan terbaik.
              </motion.p>
              
              {/* Feature Grid */}
              <motion.div 
                className="grid grid-cols-2 gap-4 mb-8"
                variants={staggerContainer}
              >
                {[
                  { icon: "🏥", title: "Panduan Rehabilitasi", desc: "Jadwal dan program pemulihan personal" },
                  { icon: "🍎", title: "Pola Hidup Sehat", desc: "Rekomendasi nutrisi dan aktivitas" },
                  { icon: "⚠️", title: "Warning Signs", desc: "Deteksi dini gejala yang perlu diwaspadai" },
                  { icon: "�", title: "Monitoring Progress", desc: "Pantau kemajuan pemulihan real-time" }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#f8fbff] border border-[#3570ff]/20 rounded-2xl p-4 hover:bg-[#f0f7ff] transition-all duration-300"
                    variants={itemSlowFadeIn}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <div className="font-semibold text-[#3570ff] mb-1">{feature.title}</div>
                    <div className="text-xs text-gray-600">{feature.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={itemSlowFadeIn}
              >
                <motion.button
                  className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-[#3570ff]/25 transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(53, 112, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">🤖</span>
                  <span>Mulai Program Pemulihan</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
                
                <motion.button
                  className="border-2 border-[#3570ff] text-[#3570ff] px-8 py-4 rounded-2xl font-semibold hover:bg-[#3570ff] hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>📹</span>
                  <span>Lihat Demo</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right - AI Chat Interface Mockup */}
            <motion.div
              className="relative"
              variants={slowSlideInRight}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.5 }}
            >
              {/* Main Chat Container */}
              <div className="relative bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl">
                {/* Chat Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-2xl flex items-center justify-center">
                      <span className="text-white text-lg">🤖</span>
                    </div>
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a2a3a]">Recovery AI Assistant</div>
                    <div className="text-sm text-green-500 flex items-center gap-2">
                      <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Online • Ready to help
                    </div>
                  </div>
                  <div className="ml-auto">
                    <motion.div 
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Thinking...
                    </motion.div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 mb-6">
                  {/* AI Message */}
                  <motion.div 
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">AI</span>
                    </div>
                    <div className="bg-[#f8fbff] border border-gray-200 rounded-2xl rounded-tl-md p-4 max-w-sm">
                      <p className="text-[#1a2a3a] text-sm mb-2">
                        Halo! Berdasarkan diagnosis dokter, saya akan membantu program pemulihan Anda:
                      </p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div>• Jadwal rehabilitasi harian</div>
                        <div>• Panduan pola hidup sehat</div>
                        <div>• Monitor warning signs</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* User Message */}
                  <motion.div 
                    className="flex justify-end"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-2xl rounded-tr-md p-4 max-w-sm">
                      <p className="text-white text-sm">
                        Dokter sudah memberikan diagnosis hipertensi. Bagaimana program pemulihan yang cocok untuk saya?
                      </p>
                    </div>
                  </motion.div>

                  {/* AI Typing Indicator */}
                  <motion.div 
                    className="flex gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">AI</span>
                    </div>
                    <div className="bg-[#f8fbff] border border-gray-200 rounded-2xl rounded-tl-md p-4">
                      <motion.div 
                        className="flex gap-1"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.3,
                              repeat: Infinity,
                              repeatType: "reverse",
                              duration: 1
                            }
                          }
                        }}
                      >
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-[#6ad7e5] rounded-full"
                            variants={{
                              hidden: { opacity: 0.3 },
                              visible: { opacity: 1 }
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "🏃‍♂️ Program Rehabilitasi",
                    "🥗 Diet Sehat", 
                    "⚠️ Warning Signs",
                    "📊 Progress Harian"
                  ].map((action, i) => (
                    <motion.button
                      key={i}
                      className="bg-[#f0f7ff] border border-[#3570ff]/20 text-[#1a2a3a] px-3 py-2 rounded-xl text-xs hover:bg-[#3570ff] hover:text-white transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5 + i * 0.1 }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="flex gap-3 items-center bg-[#f8fbff] border border-gray-200 rounded-2xl p-3">
                  <input 
                    type="text" 
                    placeholder="Bagaimana kondisi Anda hari ini?"
                    className="flex-1 bg-transparent text-[#1a2a3a] placeholder-gray-500 text-sm outline-none"
                    disabled
                  />
                  <motion.button
                    className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] p-2 rounded-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Floating Stats */}
              <motion.div
                className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-bold">95% Recovery Rate</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-[#3570ff] text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-bold">24/7 Monitoring</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section - New Professional Stats */}
      <motion.section
        className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemSlowFadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Dipercaya oleh <span className="text-[#6ad7e5]">Jutaan</span> Pengguna
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Platform kesehatan digital terdepan dengan rekam jejak yang terpercaya
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "2M+", label: "Pasien Terdaftar", icon: "👥" },
              { number: "15K+", label: "Dokter Bersertifikat", icon: "👨‍⚕️" },
              { number: "50M+", label: "Konsultasi Selesai", icon: "💬" },
              { number: "99.8%", label: "Tingkat Kepuasan", icon: "⭐" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center group"
                variants={itemSlowFadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#ffffff] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Professional Doctor Network */}
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

      {/* Find Your Perfect Doctor */}
      <section className="w-full mb-16">
        <motion.div
          className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] shadow-xl flex flex-col md:flex-row items-center px-10 py-8 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={slowFadeIn}
        >
          <motion.h3 className="text-white text-xl font-semibold flex-1 text-center md:text-left ml-20" variants={itemSlowFadeIn}>
            Temukan Dokter yang Tepat untuk Anda
          </motion.h3>
          <form className="flex flex-col md:flex-row flex-1 gap-3 w-full mr-16">
            <input
              type="text"
              placeholder="Cari dokter, spesialis..."
              className="rounded-full px-6 py-3 flex-1 outline-none bg-white/90 text-[#3570ff] placeholder:text-[#3570ff99] text-base shadow-sm"
            />
            <motion.button
              className="bg-[#3570ff] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2856b6] transition shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cari
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Personalized Doctor Recommendations */}
      <motion.section
        className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <motion.div variants={itemSlowFadeIn}>
          <h3 className="text-3xl font-bold text-[#3570ff] mb-6 leading-tight">Rekomendasi Dokter Pribadi</h3>
          <motion.ul className="list-none pl-0 text-gray-700 space-y-3" variants={staggerContainer}>
            {[
              "Disesuaikan dengan kebutuhan kesehatan Anda",
              "Dokter terverifikasi dan berpengalaman",
              "Pemesanan janji mudah",
              "Dipercaya ribuan pasien",
            ].map((text, i) => (
              <motion.li key={i} className="flex items-center gap-3" variants={itemSlowFadeIn}>
                <Image src="https://placeholder.pics/svg/20x20/00b894/000000/Check" alt="Cek" width={20} height={20} />
                {text}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <motion.div
          className="flex justify-center md:justify-end"
          initial="hidden"
          whileInView="visible"
          variants={slowSlideInUp}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white rounded-[30px] shadow-lg h-[280px] w-full max-w-[500px] overflow-hidden">
            <Image src="https://placeholder.pics/svg/500x280/3570ff/000000/Doctors%20Team" alt="Para Dokter" width={500} height={280} className="object-cover w-full h-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Meet Our Team */}
      <motion.section
        className="max-w-6xl mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <motion.h3 className="text-3xl font-bold text-[#3570ff] mb-12 text-center" variants={itemSlowFadeIn}>
          Kenali Tim Kami
        </motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {[
            { name: "Dr. John Stone", img: "https://placeholder.pics/svg/96x96/3570ff/000000/Dr.John" },
            { name: "Dr. Bella Adams", img: "https://placeholder.pics/svg/96x96/74b9ff/000000/Dr.Bella" },
            { name: "Dr. Paulin", img: "https://placeholder.pics/svg/96x96/6c5ce7/000000/Dr.Paulin" },
            { name: "Dr. Smith", img: "https://placeholder.pics/svg/96x96/00b894/000000/Dr.Smith" },
          ].map((d, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border border-[#e3eefd] hover:shadow-xl transition-all duration-300"
              variants={itemSlowFadeIn}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-[#e3f0ff] flex items-center justify-center">
                <Image src={d.img} alt={d.name} width={96} height={96} className="object-cover" />
              </div>
              <span className="font-bold text-[#3570ff] text-lg text-center">{d.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="bg-[#f8fcff] py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <motion.h3 className="text-3xl font-bold text-[#3570ff] mb-12 text-center" variants={itemSlowFadeIn}>
          Testimoni Pasien
        </motion.h3>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "Sarah W.", text: "Dokternya sangat peduli dan profesional. Sangat direkomendasikan!" },
            { name: "Michael B.", text: "Pelayanan luar biasa dan fasilitas modern. Saya merasa aman dan terawat." },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 border border-[#e3eefd]"
              variants={itemSlowFadeIn}
            >
              <div className="flex items-start gap-3">
                <span className="text-[#3570ff] text-4xl font-extrabold rotate-180">“</span>
                <p className="font-medium text-gray-700 text-lg leading-relaxed">{t.text}</p>
              </div>
              <span className="text-base text-gray-500 font-semibold text-right">- {t.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Enhanced Blog Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-16" variants={itemSlowFadeIn}>
          <h3 className="text-4xl md:text-5xl font-bold text-[#1a2a3a] mb-6">
            Artikel <span className="text-[#3570ff]">Kesehatan</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dapatkan informasi kesehatan terkini dari para ahli dan riset medis terbaru
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Revolusi AI dalam Diagnosis Medis: Masa Depan Kesehatan Digital", 
              img: "https://placeholder.pics/svg/400x240/3570ff/ffffff/AI%20Medical",
              category: "Teknologi",
              readTime: "8 min",
              date: "20 Jan 2025",
              excerpt: "Bagaimana kecerdasan buatan mengubah cara dokter mendiagnosis penyakit dengan akurasi tinggi dan kecepatan luar biasa."
            },
            { 
              title: "Telemedicine: Panduan Lengkap Konsultasi Online yang Efektif", 
              img: "https://placeholder.pics/svg/400x240/00b894/ffffff/Telemedicine",
              category: "Panduan",
              readTime: "6 min", 
              date: "18 Jan 2025",
              excerpt: "Tips dan trik untuk memaksimalkan sesi konsultasi online dengan dokter dan mendapatkan pelayanan terbaik."
            },
            { 
              title: "Tren Kesehatan 2025: 5 Inovasi yang Mengubah Industri Medis", 
              img: "https://placeholder.pics/svg/400x240/6c5ce7/ffffff/Medical%20Innovation",
              category: "Tren",
              readTime: "10 min",
              date: "15 Jan 2025", 
              excerpt: "Dari wearable devices hingga personalized medicine, simak inovasi terbaru yang akan mengubah cara kita menjaga kesehatan."
            },
          ].map((article, i) => (
            <motion.article
              key={i}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 group transition-all duration-500"
              variants={itemSlowFadeIn}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="relative overflow-hidden">
                <Image 
                  src={article.img} 
                  alt={article.title} 
                  width={400} 
                  height={240} 
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#3570ff] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    📅 {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    🕒 {article.readTime}
                  </span>
                </div>
                
                <h4 className="font-bold text-xl text-[#1a2a3a] mb-3 group-hover:text-[#3570ff] transition-colors leading-tight">
                  {article.title}
                </h4>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                
                <button className="flex items-center gap-2 text-[#3570ff] font-semibold hover:gap-3 transition-all">
                  <span>Baca Selengkapnya</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
        
        <motion.div className="text-center mt-12" variants={itemSlowFadeIn}>
          <button className="bg-[#3570ff] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#2856b6] transition-colors">
            Lihat Semua Artikel
          </button>
        </motion.div>
      </motion.section>

      {/* High-Quality Care Experience Section */}
      <motion.section
        className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={slowSlideInUp}
      >
        <motion.h2 className="text-4xl md:text-5xl font-extrabold text-[#3570ff] text-center mb-6 leading-tight" variants={itemSlowFadeIn}>
          Pengalaman Perawatan Berkualitas Tinggi—di Mana Saja, Kapan Saja
        </motion.h2>
        <motion.p className="text-lg text-gray-800 text-center max-w-2xl mb-8 font-medium" variants={itemSlowFadeIn}>
          Semuanya berawal dari ide sederhana namun revolusioner. Bahwa setiap orang harus memiliki akses ke layanan kesehatan terbaik di mana pun di dunia sesuai keinginan mereka. Termasuk Anda.
        </motion.p>
        <motion.a
          href="#"
          className="px-10 py-4 rounded-full border-2 border-[#6a3ad7] text-[#6a3ad7] font-bold text-lg hover:bg-[#f0f7ff] transition-all shadow-md mb-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemSlowFadeIn}
        >
          Tentang Kami
        </motion.a>
      </motion.section>

      {/* Achievements & Impact Section - Redesigned */}
      <motion.section
        className="max-w-6xl mx-auto px-4 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4">
          {/* Card 1 */}
          <motion.div className="bg-white rounded-xl shadow p-4 flex flex-col border border-[#e3eefd] min-h-[120px]" variants={itemSlowFadeIn}>
            <span className="text-[#3570ff] font-extrabold text-lg mb-1">#1</span>
            <span className="font-semibold text-gray-800 text-sm leading-tight">Merek layanan kesehatan virtual paling dikenal.</span>
            <a href="#" className="text-[#3570ff] text-xs hover:underline mt-auto">
              Lihat ulasan.
            </a>
            <div className="mt-2">
              <Image src="https://placeholder.pics/svg/60x24/3570ff/000000/Trustpilot" alt="Trustpilot" width={60} height={24} />
            </div>
          </motion.div>
          {/* Card 2 */}
          <motion.div className="bg-white rounded-xl shadow p-4 flex flex-col border border-[#e3eefd] min-h-[120px]" variants={itemSlowFadeIn}>
            <span className="text-[#e85d9e] font-extrabold text-lg mb-1">78%</span>
            <span className="font-semibold text-gray-800 text-sm leading-tight">Mempertahankan atau meningkatkan tekanan darah mereka.</span>
            <a href="#" className="text-[#3570ff] text-xs hover:underline mt-auto">
              Pelajari lebih lanjut.
            </a>
          </motion.div>
          {/* Card 3 */}
          <motion.div className="bg-white rounded-xl shadow p-4 flex flex-col border border-[#e3eefd] min-h-[120px]" variants={itemSlowFadeIn}>
            <span className="text-[#00b6c9] font-extrabold text-lg mb-1">900.000</span>
            <span className="font-semibold text-gray-800 text-sm leading-tight">Orang mengakses layanan yang sebelumnya tidak bisa mereka dapatkan.</span>
          </motion.div>
          {/* Card 4 (Video) */}
          <motion.div className="bg-white rounded-xl shadow p-0 flex flex-col border border-[#e3eefd] min-h-[120px] relative overflow-hidden" variants={itemSlowFadeIn}>
            <Image src="https://placeholder.pics/svg/120x80/3570ff/000000/Video" alt="Video" width={120} height={80} className="w-full h-[80px] object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 5 (Doctor + Device) */}
          <motion.div className="bg-white rounded-xl shadow p-4 flex flex-col border border-[#e3eefd] min-h-[120px] col-span-1 row-start-2" variants={itemSlowFadeIn}>
            <div className="flex items-center gap-2 mb-2">
              <Image src="https://placeholder.pics/svg/32x32/3570ff/000000/Doctor" alt="Dokter" width={32} height={32} className="rounded-full" />
              <Image src="https://placeholder.pics/svg/48x32/74b9ff/000000/Device" alt="Perangkat" width={48} height={32} />
            </div>
            <span className="text-[#3570ff] font-extrabold text-lg mb-1">50 Juta</span>
            <span className="font-semibold text-gray-800 text-sm leading-tight">Kunjungan virtual telah dilakukan.</span>
          </motion.div>
          {/* Card 6 (Testimonial) */}
          <motion.div className="bg-white rounded-xl shadow p-4 flex flex-col border border-[#e3eefd] min-h-[120px] col-span-1 row-start-2" variants={itemSlowFadeIn}>
            <span className="font-semibold text-gray-800 text-xs leading-tight">
              76% orang dengan depresi merasa lebih baik setelah kunjungan ketiga dengan terapis mereka.
            </span>
            <a href="#" className="text-[#3570ff] text-xs hover:underline mt-auto">
              Lihat ulasan.
            </a>
            <div className="flex gap-2 mt-2">
              <Image src="https://placeholder.pics/svg/32x32/00b894/000000/Call1" alt="Panggilan" width={32} height={32} className="rounded" />
              <Image src="https://placeholder.pics/svg/32x32/74b9ff/000000/Call2" alt="Panggilan" width={32} height={32} className="rounded" />
            </div>
          </motion.div>
          {/* Card 7 (Speaker) */}
          <motion.div className="bg-white rounded-xl shadow p-4 flex flex-col border border-[#e3eefd] min-h-[120px] col-span-1 row-start-2" variants={itemSlowFadeIn}>
            <div className="flex items-center gap-2 mb-2">
              <Image src="https://placeholder.pics/svg/32x32/6c5ce7/000000/Speaker" alt="Pembicara" width={32} height={32} className="rounded-full" />
            </div>
            <span className="font-semibold text-gray-800 text-xs leading-tight">
              Pendiri <span className="text-[#00b6c9] font-bold">organisasi keselamatan pasien</span> layanan kesehatan virtual pertama
            </span>
          </motion.div>
          {/* Card 8 (Satisfaction) */}
          <motion.div className="bg-white rounded-xl shadow p-4 flex flex-col border border-[#e3eefd] min-h-[120px] col-span-1 row-start-2" variants={itemSlowFadeIn}>
            <span className="text-[#e85d9e] font-extrabold text-lg mb-1">+90%</span>
            <span className="font-semibold text-gray-800 text-xs leading-tight">Kepuasan anggota.</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Hospitals Banner Section */}
      <motion.section
        className="w-full relative py-20 flex items-center justify-center overflow-hidden"
        style={{ background: "none" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={slowFadeIn}
      >
        <div className="absolute inset-0 z-0">
          <Image src="https://placeholder.pics/svg/1200x600/1a2a3a/3570ff/Hospital%20Room" alt="Ruang Rumah Sakit" layout="fill" objectFit="cover" className="opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] text-white" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <motion.h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-6 drop-shadow-lg" variants={itemSlowFadeIn}>
            Anda juga dapat menemukan kami di lebih dari 600 rumah sakit di AS
          </motion.h2>
          <motion.a
            href="#"
            className="flex items-center gap-2 bg-white/90 text-[#3570ff] px-6 py-3 rounded-full font-semibold shadow hover:bg-white transition text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemSlowFadeIn}
          >
            <span>Lihat bagaimana kami membantu rumah sakit</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </motion.section>

      {/* Professional Footer */}
      <footer className="bg-[#1a2a3a] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <h4 className="font-bold text-2xl text-[#6ad7e5]">Medlitik</h4>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Platform kesehatan digital terdepan yang menghubungkan Anda dengan layanan medis berkualitas tinggi melalui teknologi AI dan jaringan dokter profesional.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: "📧", href: "mailto:info@medlitik.com" },
                  { icon: "📞", href: "tel:+62211234567" },
                  { icon: "📍", href: "#" },
                  { icon: "🌐", href: "#" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#6ad7e5] transition-colors"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-lg mb-6 text-[#6ad7e5]">Layanan</h5>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Konsultasi AI</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Dokter Spesialis</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Telemedicine</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Rekam Medis Digital</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Appointment Online</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold text-lg mb-6 text-[#6ad7e5]">Perusahaan</h5>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Mitra Rumah Sakit</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Press Release</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold text-lg mb-6 text-[#6ad7e5]">Dukungan</h5>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-[#6ad7e5] transition-colors">Hubungi Kami</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-white/50 text-sm">
                © 2025 Medlitik Indonesia. Seluruh hak cipta dilindungi undang-undang.
              </div>
              <div className="flex gap-6 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  🏥 <span>Terdaftar di Kemenkes RI</span>
                </span>
                <span className="flex items-center gap-2">
                  🛡️ <span>ISO 27001 Certified</span>
                </span>
                <span className="flex items-center gap-2">
                  ⚡ <span>Uptime 99.9%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}