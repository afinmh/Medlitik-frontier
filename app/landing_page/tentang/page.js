"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };
  
  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  // Values data
  const values = [
    {
      icon: "https://placeholder.pics/svg/56x56/3570ff/FFFFFF/heart",
      title: "Kepedulian",
      description: "Kami meletakkan kebutuhan pasien sebagai prioritas utama, memberikan perhatian dan empati dalam setiap layanan kesehatan."
    },
    {
      icon: "https://placeholder.pics/svg/56x56/3570ff/FFFFFF/excellence",
      title: "Keunggulan",
      description: "Kami berkomitmen untuk menyediakan standar perawatan tertinggi melalui inovasi dan peningkatan berkelanjutan."
    },
    {
      icon: "https://placeholder.pics/svg/56x56/3570ff/FFFFFF/integrity",
      title: "Integritas",
      description: "Kami menjalankan praktik dengan kejujuran, transparansi, dan etika yang kuat dalam semua aspek layanan kami."
    },
    {
      icon: "https://placeholder.pics/svg/56x56/3570ff/FFFFFF/collaboration",
      title: "Kolaborasi",
      description: "Kami percaya bahwa kerja sama tim adalah kunci untuk memberikan perawatan kesehatan yang komprehensif dan terpadu."
    },
    {
      icon: "https://placeholder.pics/svg/56x56/3570ff/FFFFFF/accessibility",
      title: "Aksesibilitas",
      description: "Kami berdedikasi untuk membuat layanan kesehatan berkualitas dapat diakses oleh semua orang, kapan pun dan di mana pun."
    },
    {
      icon: "https://placeholder.pics/svg/56x56/3570ff/FFFFFF/innovation",
      title: "Inovasi",
      description: "Kami terus mengembangkan solusi kesehatan baru yang meningkatkan pengalaman pasien dan hasil perawatan."
    }
  ];

  // Team data
  const executives = [
    {
      name: "Dr. Surya Wijaya",
      role: "CEO & Pendiri",
      image: "https://placeholder.pics/svg/200x200/3570ff/FFFFFF/ceo",
      bio: "Dr. Surya adalah dokter bedah dengan pengalaman 15 tahun yang memiliki visi untuk mentransformasi layanan kesehatan melalui teknologi."
    },
    {
      name: "Dr. Lisa Hartanto",
      role: "Chief Medical Officer",
      image: "https://placeholder.pics/svg/200x200/3570ff/FFFFFF/cmo",
      bio: "Dr. Lisa berspesialisasi dalam kesehatan digital dan telemedicine dengan fokus pada peningkatan kualitas perawatan pasien."
    },
    {
      name: "Ir. Budi Santoso",
      role: "Chief Technology Officer",
      image: "https://placeholder.pics/svg/200x200/3570ff/FFFFFF/cto",
      bio: "Ir. Budi memiliki lebih dari 12 tahun pengalaman dalam pengembangan teknologi kesehatan dan sistem AI untuk diagnosis medis."
    },
    {
      name: "Maya Putri, M.B.A",
      role: "Chief Operating Officer",
      image: "https://placeholder.pics/svg/200x200/3570ff/FFFFFF/coo",
      bio: "Maya membawa 10 tahun pengalaman dalam manajemen operasional layanan kesehatan dan transformasi digital."
    }
  ];

  // Milestones
  const milestones = [
    {
      year: "2020",
      title: "Pendirian Medlitik",
      description: "Medlitik didirikan dengan visi menjadi platform kesehatan digital terkemuka di Indonesia."
    },
    {
      year: "2021",
      title: "Peluncuran Aplikasi",
      description: "Peluncuran aplikasi Medlitik dengan fitur konsultasi online dan perjanjian dokter."
    },
    {
      year: "2022",
      title: "Ekspansi Layanan",
      description: "Perluasan layanan ke 15 kota besar di Indonesia dengan lebih dari 500 dokter terafiliasi."
    },
    {
      year: "2023",
      title: "Integrasi AI Medis",
      description: "Implementasi teknologi AI untuk meningkatkan akurasi diagnosis dan personalisasi perawatan."
    },
    {
      year: "2024",
      title: "Kemitraan Strategis",
      description: "Menjalin kemitraan dengan 50 rumah sakit dan 100 klinik untuk layanan terintegrasi."
    },
    {
      year: "2025",
      title: "Platform Kesehatan Komprehensif",
      description: "Berkembang menjadi ekosistem kesehatan digital lengkap dengan layanan preventif dan kuratif."
    }
  ];

  // Statistics
  const stats = [
    { value: "500+", label: "Dokter Spesialis" },
    { value: "50+", label: "Rumah Sakit & Klinik" },
    { value: "100K+", label: "Pasien Terlayani" },
    { value: "15", label: "Kota di Indonesia" }
  ];

  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans">
      {/* Header */}
      <header className="bg-white shadow-md py-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link href="/landing_page">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Image
                src="https://placeholder.pics/svg/40x40/3570ff/000000/Logo"
                alt="Logo Medlitik"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-[#1a2a3a]">Medlitik</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: "Beranda", href: "/landing_page" },
              { label: "Dokter", href: "/landing_page/dokter" },
              { label: "Tentang", href: "/landing_page/tentang" },
              { label: "Kontak", href: "/landing_page/kontak" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`font-medium ${
                  item.label === "Tentang" 
                    ? "text-[#3570ff]" 
                    : "text-gray-700 hover:text-[#3570ff]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="text-[#3570ff] hover:text-[#2856b6] font-medium px-4 py-2 rounded-full border border-[#3570ff] hover:bg-[#f0f8ff] transition"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="bg-[#3570ff] text-white px-6 py-2 rounded-full hover:bg-[#2856b6] transition font-medium shadow-md flex items-center justify-center"
            >
              Daftar
            </Link>
          </nav>
          <div className="md:hidden">
            <svg className="w-6 h-6 text-[#3570ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#3570ff] to-[#2856b6] py-24">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center text-white"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Medlitik</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Medlitik adalah platform kesehatan digital terpadu yang menghubungkan pasien dengan dokter terbaik dan layanan kesehatan berkualitas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={itemFadeIn}>
            <Image
              src="https://placeholder.pics/svg/500x400/3570ff/FFFFFF/vision"
              alt="Visi Medlitik"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </motion.div>
          <motion.div variants={itemFadeIn}>
            <div className="inline-block px-4 py-2 bg-blue-100 text-[#3570ff] font-semibold rounded-full mb-4">
              Visi & Misi Kami
            </div>
            <h2 className="text-3xl font-bold text-[#1a2a3a] mb-6">
              Transformasi Layanan Kesehatan untuk Semua
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#3570ff] mb-2">Visi</h3>
                <p className="text-gray-700">
                  Menjadi penyedia layanan kesehatan digital terdepan yang membuat perawatan kesehatan berkualitas dapat diakses oleh semua orang, kapan saja, di mana saja.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#3570ff] mb-2">Misi</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
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

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-[#3570ff] font-semibold rounded-full mb-4">
              Nilai-Nilai Kami
            </div>
            <h2 className="text-3xl font-bold text-[#1a2a3a] mb-4">
              Prinsip yang Memandu Kami
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Nilai-nilai inti kami membentuk dasar dari segala hal yang kami lakukan, memandu keputusan kami dan memastikan bahwa kami selalu mengutamakan kepentingan pasien.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="bg-[#f0f7ff] p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
                variants={itemFadeIn}
              >
                <div className="bg-[#3570ff] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Image 
                    src={value.icon}
                    alt={value.title}
                    width={56}
                    height={56}
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#1a2a3a] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={itemFadeIn} className="order-2 md:order-1">
            <div className="inline-block px-4 py-2 bg-blue-100 text-[#3570ff] font-semibold rounded-full mb-4">
              Kisah Kami
            </div>
            <h2 className="text-3xl font-bold text-[#1a2a3a] mb-6">
              Perjalanan Membangun Medlitik
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Medlitik didirikan pada tahun 2020 oleh Dr. Surya Wijaya, seorang dokter bedah yang melihat tantangan dalam aksesibilitas layanan kesehatan berkualitas di Indonesia. Setelah bertahun-tahun praktik, Dr. Surya menyadari bahwa banyak pasien menghadapi kesulitan untuk mendapatkan konsultasi dengan dokter spesialis yang tepat, terutama di daerah terpencil.
              </p>
              <p>
                Dengan tujuan merevolusi cara orang mengakses layanan kesehatan, Dr. Surya menggabungkan keahlian medisnya dengan teknologi digital untuk menciptakan platform yang menghubungkan pasien dengan dokter terbaik. Ia merekrut tim dokter dan teknologi terbaik untuk membangun Medlitik sebagai jembatan antara pasien dan layanan kesehatan berkualitas.
              </p>
              <p>
                Dari awal yang sederhana dengan layanan konsultasi online, Medlitik telah berkembang menjadi ekosistem kesehatan digital terpadu, melayani ribuan pasien setiap bulannya, dan terus berinovasi untuk meningkatkan kualitas layanan kesehatan di Indonesia.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemFadeIn} className="order-1 md:order-2">
            <Image
              src="https://placeholder.pics/svg/500x400/3570ff/FFFFFF/our-story"
              alt="Kisah Medlitik"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-[#3570ff] font-semibold rounded-full mb-4">
              Perjalanan Kami
            </div>
            <h2 className="text-3xl font-bold text-[#1a2a3a] mb-4">
              Pencapaian Penting
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Melihat kembali perjalanan kami dalam mentransformasi layanan kesehatan digital di Indonesia
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            <div className="space-y-24 relative">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  variants={itemFadeIn}
                >
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                      <div className="bg-[#3570ff] text-white font-bold inline-block px-4 py-1 rounded-full mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-[#1a2a3a] mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-[#3570ff] w-6 h-6 rounded-full border-4 border-blue-100"></div>
                    
                    <div className="w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-block px-4 py-2 bg-blue-100 text-[#3570ff] font-semibold rounded-full mb-4">
            Tim Kami
          </div>
          <h2 className="text-3xl font-bold text-[#1a2a3a] mb-4">
            Dipimpin oleh Para Ahli
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Kenali tim eksekutif kami yang berdedikasi untuk mentransformasi layanan kesehatan di Indonesia
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {executives.map((exec, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md text-center"
              variants={itemFadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="mb-4 relative w-40 h-40 mx-auto">
                <Image 
                  src={exec.image}
                  alt={exec.name}
                  className="rounded-full border-4 border-[#3570ff]"
                  width={200}
                  height={200}
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1a2a3a] mb-1">{exec.name}</h3>
              <div className="text-[#3570ff] font-medium mb-4">{exec.role}</div>
              <p className="text-gray-600 text-sm">{exec.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#3570ff] to-[#2856b6] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Dampak Medlitik</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Sejak didirikan pada 2020, Medlitik telah memiliki pengaruh yang signifikan dalam meningkatkan aksesibilitas layanan kesehatan
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={itemFadeIn}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-block px-4 py-2 bg-blue-100 text-[#3570ff] font-semibold rounded-full mb-4">
            Mitra Kami
          </div>
          <h2 className="text-3xl font-bold text-[#1a2a3a] mb-4">
            Berkolaborasi dengan yang Terbaik
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Kami bermitra dengan rumah sakit, klinik, dan penyedia layanan kesehatan terkemuka untuk memberikan perawatan terbaik
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div 
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemFadeIn}
            >
              <Image
                src={`https://placeholder.pics/svg/120x60/CCCCCC/666666/partner-${i}`}
                alt={`Partner ${i}`}
                width={120}
                height={60}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#f0f7ff]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-[#1a2a3a] mb-6">
              Bergabunglah dalam Revolusi Kesehatan Digital
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              Jadi bagian dari perjalanan kami untuk mentransformasi layanan kesehatan di Indonesia. Daftarkan diri Anda sekarang dan akses layanan kesehatan berkualitas dari kenyamanan rumah Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-[#3570ff] text-white px-8 py-3 rounded-full hover:bg-[#2856b6] transition font-medium shadow-md"
              >
                Daftar Sekarang
              </Link>
              <Link
                href="/landing_page/kontak"
                className="bg-white text-[#3570ff] px-8 py-3 rounded-full font-medium shadow border border-[#3570ff] hover:bg-blue-50 transition"
              >
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2a3a] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="font-extrabold text-2xl mb-4 text-[#6ad7e5]">Medlitik</h4>
            <p className="text-sm text-white/70 leading-relaxed">
              Mitra tepercaya Anda dalam keunggulan layanan kesehatan, berkomitmen memberikan layanan medis terbaik.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4 text-[#6ad7e5]">Layanan</h5>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Vaksinasi</li>
              <li>Darurat</li>
              <li>Pusat Medis</li>
              <li>Dokter Spesialis</li>
              <li>Konsultasi Online</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4 text-[#6ad7e5]">Kontak</h5>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Telepon: (123) 456-7890</li>
              <li>Email: info@medlitik.com</li>
              <li>Alamat: Jl. Kesehatan 123, Kota Medis, 12345</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4 text-[#6ad7e5]">Ikuti Kami</h5>
            <div className="flex gap-4 text-white/70">
              <a href="#" className="hover:text-[#6ad7e5] transition">
                FB
              </a>
              <a href="#" className="hover:text-[#6ad7e5] transition">
                TW
              </a>
              <a href="#" className="hover:text-[#6ad7e5] transition">
                IG
              </a>
              <a href="#" className="hover:text-[#6ad7e5] transition">
                LI
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-white/50 mt-12 pt-6 border-t border-white/10">
          © 2025 Medlitik. Seluruh hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
}
