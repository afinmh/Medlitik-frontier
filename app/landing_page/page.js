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
          <motion.a
            href="/auth/login"
            className="text-[#3570ff] hover:text-[#2856b6] font-medium px-4 py-2 rounded-full border border-[#3570ff] hover:bg-[#f0f8ff] transition"
            variants={itemSlowFadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Masuk
          </motion.a>
          <motion.a
            href="/auth/register"
            className="bg-[#3570ff] text-white px-6 py-2 rounded-full hover:bg-[#2856b6] transition font-medium shadow-md flex items-center justify-center"
            variants={itemSlowFadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Daftar
          </motion.a>
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
            <motion.h1 className="text-4xl md:text-5xl font-bold text-[#1a2a3a] mb-4 leading-tight drop-shadow mt-20" variants={itemSlowFadeIn}>
              Menjaga Masa Depan:<br className="hidden md:block" /> Sumpah Kami untuk Menyelamatkan Hidup
            </motion.h1>
            <motion.p className="text-lg text-[#3570ff] mb-6 max-w-lg mx-auto md:mx-0" variants={itemSlowFadeIn}>
              Kami menyediakan perawatan pasien terbaik & fasilitas modern dengan dokter ahli.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start mb-6"
              variants={staggerContainer}
            >
              <motion.a
                href="/kontak-dokter"
                className="bg-[#3570ff] text-white px-8 py-3 rounded-full font-bold shadow hover:bg-[#2856b6] transition"
                variants={itemSlowFadeIn}
              >
                Kontak Dokter
              </motion.a>
              <motion.a
                href="/kontak-dokter"
                className="bg-white text-[#3570ff] px-8 py-3 rounded-full font-bold shadow border border-[#3570ff] hover:bg-[#f0f8ff] transition"
                variants={itemSlowFadeIn}
              >
                Hubungi Kami
              </motion.a>
            </motion.div>
            <motion.div className="flex items-center justify-center md:justify-start gap-3 text-[#3570ff] text-base font-semibold" variants={itemSlowFadeIn}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 008.48 19h7.04a2 2 0 001.83-1.3L17 13M7 13V6h10v7" />
              </svg>
              <span>Telepon: (123) 456-7890</span>
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
        className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <h2 className="sr-only">Layanan Utama</h2>
        {[
          { icon: "https://placeholder.pics/svg/56x56/e3f0ff/3570ff/Search", title: "Cari Dokter", desc: "Cari dan hubungkan dengan dokter ahli kami.", bg: "bg-[#e3f0ff]" },
          { icon: "https://placeholder.pics/svg/56x56/e6f7f2/00b894/Location", title: "Cari Lokasi", desc: "Temukan klinik dan rumah sakit kami dengan mudah.", bg: "bg-[#e6f7f2]" },
          { icon: "https://placeholder.pics/svg/56x56/fdf3e7/fd79a8/Contact", title: "Kontak Dokter", desc: "Pesan kunjungan Anda secara online dalam hitungan menit.", bg: "bg-[#fdf3e7]" },
          { icon: "https://placeholder.pics/svg/56x56/f7e6e6/e17055/Support", title: "Kontak Fasilitas", desc: "Hubungi kami untuk bantuan apapun.", bg: "bg-[#f7e6e6]" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={`rounded-2xl shadow p-7 flex flex-col items-center text-center border border-[#e3eefd] hover:shadow-xl transition-all duration-300 ${s.bg}`}
            variants={itemSlowFadeIn}
            whileHover={{ y: -8 }}
          >
            <Image src={s.icon} alt={s.title} width={56} height={56} className="mb-4" />
            <h3 className="font-bold text-lg mb-2 text-[#3570ff]">{s.title}</h3>
            <p className="text-gray-600 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* AI Doctor Assistant Section */}
      <motion.section
        className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <motion.div className="flex-1 flex flex-col items-center md:items-start" variants={itemSlowFadeIn}>
          <div className="flex items-center gap-3 mb-3">
            <Image src="https://placeholder.pics/svg/36x36/3570ff/000000/AI" alt="AI" width={36} height={36} />
            <span className="text-[#3570ff] font-bold text-xl">Asisten Dokter AI</span>
          </div>
          <p className="text-gray-700 text-lg mb-4 max-w-md">
            Konsultasi cepat dengan asisten medis berbasis AI. Dapatkan jawaban instan, rekomendasi dokter, dan saran kesehatan personal 24/7.
          </p>
          <motion.button
            className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Coba Asisten AI
          </motion.button>
        </motion.div>
        <motion.div
          className="flex-1 flex justify-center"
          initial="hidden"
          whileInView="visible"
          variants={slowSlideInRight}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.5 }}
        >
          <Image src="https://placeholder.pics/svg/320x240/3570ff/000000/AI%20Doctor" alt="Dokter AI" width={320} height={240} className="drop-shadow-xl" />
        </motion.div>
      </motion.section>

      {/* Comprehensive Healthcare Services */}
      <motion.section
        className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 -mt-16 z-20 relative pb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <h2 className="sr-only">Layanan Kesehatan Komprehensif</h2>
        {[
          { icon: "https://placeholder.pics/svg/60x60/74b9ff/000000/Vaccine", title: "Vaksinasi", desc: "Lindungi keluarga Anda dengan layanan vaksinasi kami." },
          { icon: "https://placeholder.pics/svg/60x60/ff7675/000000/Emergency", title: "Darurat", desc: "Layanan darurat 24/7 untuk kebutuhan mendesak." },
          { icon: "https://placeholder.pics/svg/60x60/00b894/000000/Medical", title: "Pusat Medis", desc: "Fasilitas dan peralatan mutakhir." },
          { icon: "https://placeholder.pics/svg/60x60/6c5ce7/000000/Specialist", title: "Dokter Spesialis", desc: "Konsultasi dengan dokter spesialis terbaik." },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center text-center border border-[#e3eefd] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            variants={itemSlowFadeIn}
            whileHover={{ y: -8 }}
          >
            <div className="mb-4 relative">
              <Image src={s.icon} alt={s.title} width={60} height={60} />
              {i === 3 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#6ad7e5] to-[#4e7fff] text-white text-xs px-2 py-0.5 rounded-full font-bold shadow">
                  AI
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#3570ff]">{s.title}</h3>
            <p className="text-gray-500 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Leading the Way in Medical Excellence */}
      <motion.section
        className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <motion.div
          className="flex-1 flex justify-center md:justify-start"
          initial="hidden"
          whileInView="visible"
          variants={slowSlideInUp}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="bg-white rounded-[30px] shadow-lg overflow-hidden w-full max-w-[500px] h-[320px]">
            <Image src="https://placeholder.pics/svg/500x320/3570ff/000000/Medical%20Team" alt="Tim Medis" width={500} height={320} className="object-cover w-full h-full" />
          </div>
        </motion.div>
        <motion.div className="flex-1" variants={itemSlowFadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#3570ff] leading-tight">Memimpin dalam Keunggulan Medis</h2>
          <motion.ul className="list-none pl-0 text-gray-700 space-y-3" variants={staggerContainer}>
            {[
              "Dokter dan perawat ahli",
              "Fasilitas dan peralatan modern",
              "Perawatan pasien yang personal",
              "Layanan kesehatan komprehensif",
            ].map((text, i) => (
              <motion.li key={i} className="flex items-center gap-3" variants={itemSlowFadeIn}>
                <Image src="https://placeholder.pics/svg/20x20/00b894/000000/Check" alt="Cek" width={20} height={20} />
                {text}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
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

      {/* Blog Post */}
      <motion.section
        className="max-w-6xl mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <motion.h3 className="text-3xl font-bold text-[#3570ff] mb-12 text-center" variants={itemSlowFadeIn}>
          Artikel Kesehatan
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: "Cara Memilih Dokter yang Tepat", img: "https://placeholder.pics/svg/400x180/3570ff/000000/Health%20Article%201", link: "#" },
            { title: "Manfaat Pemeriksaan Rutin", img: "https://placeholder.pics/svg/400x180/74b9ff/000000/Health%20Article%202", link: "#" },
            { title: "Inovasi Terbaru di Dunia Kesehatan", img: "https://placeholder.pics/svg/400x180/6c5ce7/000000/Health%20Article%203", link: "#" },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col border border-[#e3eefd]"
              variants={itemSlowFadeIn}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-full h-[180px] rounded-xl overflow-hidden mb-4">
                <Image src={b.img} alt={b.title} width={400} height={180} className="object-cover w-full h-full" />
              </div>
              <h4 className="font-bold text-[#3570ff] text-lg mb-2">{b.title}</h4>
              <a href={b.link} className="text-sm text-[#3570ff] hover:underline mt-auto font-medium">
                Baca selengkapnya →
              </a>
            </motion.div>
          ))}
        </div>
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a3a]/80 to-[#3570ff]/30" />
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

      {/* Footer */}
      <footer className="bg-[#1a2a3a] text-white py-12 px-4 mt-20">
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