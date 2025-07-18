"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function KontakPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

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

  // Contact info data
  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      info: "info@medlitik.com",
      action: "mailto:info@medlitik.com",
      actionText: "Kirim Email",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Telepon",
      info: "(021) 123-4567",
      action: "tel:+622112345678",
      actionText: "Hubungi Kami",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Alamat",
      info: "Jl. Kesehatan 123, Jakarta Selatan",
      action: "https://maps.google.com/?q=Jl.+Kesehatan+123,+Jakarta+Selatan",
      actionText: "Lihat Lokasi",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Jam Operasional",
      info: "Senin - Jumat: 08.00 - 20.00",
      info2: "Sabtu - Minggu: 09.00 - 16.00",
      action: null,
      actionText: null,
    }
  ];

  // FAQs data
  const faqs = [
    {
      question: "Bagaimana cara mendaftar di Medlitik?",
      answer: "Untuk mendaftar di Medlitik, klik tombol 'Daftar' di halaman utama, lalu isi formulir pendaftaran dengan informasi yang diminta. Setelah verifikasi email, akun Anda akan aktif dan siap digunakan."
    },
    {
      question: "Apakah konsultasi online di Medlitik aman?",
      answer: "Ya, konsultasi online di Medlitik sepenuhnya aman dan terjamin kerahasiaannya. Semua data pasien dilindungi dengan enkripsi tingkat tinggi, dan kami mematuhi standar privasi dan keamanan data internasional."
    },
    {
      question: "Berapa biaya konsultasi dengan dokter di Medlitik?",
      answer: "Biaya konsultasi bervariasi tergantung pada spesialisasi dokter dan jenis layanan. Anda dapat melihat tarif yang transparan untuk setiap dokter sebelum melakukan pemesanan konsultasi."
    },
    {
      question: "Bagaimana cara menjadwalkan konsultasi dengan dokter?",
      answer: "Untuk menjadwalkan konsultasi, masuk ke akun Anda, pilih dokter yang diinginkan, pilih tanggal dan waktu yang tersedia, lalu konfirmasi dan lakukan pembayaran. Anda akan menerima konfirmasi jadwal melalui email."
    },
    {
      question: "Apakah dokter di Medlitik memiliki sertifikasi resmi?",
      answer: "Ya, semua dokter di platform Medlitik telah melalui proses verifikasi ketat dan memiliki sertifikasi resmi serta izin praktek yang valid. Kami hanya bermitra dengan profesional medis yang berkualifikasi."
    },
    {
      question: "Bagaimana jika saya perlu resep obat setelah konsultasi?",
      answer: "Jika dokter menilai Anda memerlukan obat, mereka dapat mengeluarkan resep digital yang dapat diakses melalui platform Medlitik dan dapat ditebus di apotek yang bermitra dengan kami atau apotek lain pilihan Anda."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({ submitted: true, error: false, message: "Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda." });
    
    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({ submitted: false, error: false, message: "" });
    }, 5000);
  };

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
                  item.label === "Kontak" 
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda dengan segala kebutuhan kesehatan digital Anda
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 relative z-10 -mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                variants={itemFadeIn}
              >
                <div className="bg-blue-100 text-[#3570ff] p-3 rounded-full inline-flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1a2a3a] mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-1">{item.info}</p>
                {item.info2 && <p className="text-gray-700 mb-4">{item.info2}</p>}
                {item.action && (
                  <a 
                    href={item.action} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#3570ff] font-medium hover:underline flex items-center"
                  >
                    {item.actionText}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-10 max-w-6xl mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Contact Form */}
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-md"
            variants={itemFadeIn}
          >
            <h2 className="text-3xl font-bold text-[#1a2a3a] mb-6">Kirim Pesan</h2>
            <p className="text-gray-600 mb-8">
              Kami berkomitmen untuk menjawab semua pertanyaan dan permintaan Anda dalam waktu 24 jam kerja.
            </p>

            {formStatus.submitted && (
              <div className={`p-4 mb-6 rounded-md ${formStatus.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="Masukkan email"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Nomor Telepon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subjek</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                    placeholder="Masukkan subjek"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition h-36 resize-none"
                  placeholder="Masukkan pesan Anda"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#3570ff] text-white px-8 py-3 rounded-full hover:bg-[#2856b6] transition font-medium shadow-md flex items-center justify-center"
                >
                  Kirim Pesan
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div 
            className="rounded-xl overflow-hidden shadow-md h-[500px]"
            variants={itemFadeIn}
          >
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              {/* Placeholder for actual map */}
              <div className="text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Lokasi Kantor Medlitik</h3>
                <p className="text-gray-500">Jl. Kesehatan 123, Jakarta Selatan, Indonesia</p>
                <p className="text-sm text-gray-400 mt-4">(Peta Google Maps akan ditampilkan di sini)</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-[#3570ff] font-semibold rounded-full mb-4">
              FAQ
            </div>
            <h2 className="text-3xl font-bold text-[#1a2a3a] mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Temukan jawaban untuk pertanyaan umum tentang layanan Medlitik
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-[#f0f7ff] rounded-xl overflow-hidden"
                variants={itemFadeIn}
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4">
                    <h3 className="text-lg font-semibold text-[#1a2a3a]">{faq.question}</h3>
                    <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-100 group-open:opacity-0 h-5 w-5 text-[#3570ff] transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-0 group-open:opacity-100 h-5 w-5 text-[#3570ff] transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
                </details>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Satisfaction Guarantee */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <motion.div 
          className="bg-gradient-to-r from-[#3570ff] to-[#2856b6] rounded-2xl overflow-hidden shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 text-white">
              <h2 className="text-3xl font-bold mb-6">Kepuasan Anda adalah Prioritas Kami</h2>
              <p className="text-blue-100 mb-8">
                Kami berkomitmen untuk memberikan layanan terbaik dan solusi kesehatan yang sesuai dengan kebutuhan Anda. Jika Anda memiliki pertanyaan atau masalah, tim dukungan pelanggan kami siap membantu 24/7.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+622112345678" className="bg-white text-[#3570ff] px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Hubungi Kami
                </a>
                <Link href="/landing_page" className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="https://placeholder.pics/svg/500x400/FFFFFF/3570ff/customer-support"
                  alt="Customer Support"
                  width={500}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Social Media */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#1a2a3a] mb-6">
              Ikuti Kami di Media Sosial
            </h2>
            <div className="flex justify-center space-x-8">
              {["Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube"].map((platform, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-gray-600 hover:text-[#3570ff] transition-colors"
                >
                  <div className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Image
                      src={`https://placeholder.pics/svg/30x30/CCCCCC/666666/${platform}`}
                      alt={platform}
                      width={30}
                      height={30}
                    />
                  </div>
                  <span className="block mt-2 text-sm">{platform}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscribe Newsletter */}
      <section className="py-16 bg-[#f0f7ff]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-[#1a2a3a] mb-4">
              Dapatkan Berita & Tips Kesehatan Terbaru
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Berlangganan newsletter kami untuk mendapatkan informasi kesehatan terbaru, tips medis, dan penawaran eksklusif dari Medlitik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Masukkan alamat email Anda"
                className="px-5 py-3 rounded-full flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
              />
              <button className="bg-[#3570ff] text-white px-8 py-3 rounded-full hover:bg-[#2856b6] transition font-medium shadow-md">
                Berlangganan
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Kami menghargai privasi Anda. Lihat <a href="#" className="text-[#3570ff] hover:underline">Kebijakan Privasi</a> kami.
            </p>
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
