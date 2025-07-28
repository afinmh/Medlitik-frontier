"use client";


import { motion } from "framer-motion";
import Navbar from "@/components/landing_page/Navbar";
import Footer from "@/components/landing_page/Footer";
import HeroSection from "@/components/landing_page/tentang/HeroSection";
import VisionMissionSection from "@/components/landing_page/tentang/VisionMissionSection";
import ValuesSection from "@/components/landing_page/tentang/ValuesSection";
import StorySection from "@/components/landing_page/tentang/StorySection";
import MilestonesSection from "@/components/landing_page/tentang/MilestonesSection";
import TeamSection from "@/components/landing_page/tentang/TeamSection";
import StatsSection from "@/components/landing_page/tentang/StatsSection";
import CTASection from "@/components/landing_page/tentang/CTASection";

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
      icon: "/tentang/care.svg", // Care SVG
      title: "Kepedulian",
      description: "Kami meletakkan kebutuhan pasien sebagai prioritas utama, memberikan perhatian dan empati dalam setiap layanan kesehatan."
    },
    {
      icon: "/tentang/target.svg", // Target SVG
      title: "Keunggulan",
      description: "Kami berkomitmen untuk menyediakan standar perawatan tertinggi melalui inovasi dan peningkatan berkelanjutan."
    },
    {
      icon: "/tentang/integrity.svg", // Integrity SVG
      title: "Integritas",
      description: "Kami menjalankan praktik dengan kejujuran, transparansi, dan etika yang kuat dalam semua aspek layanan kami."
    },
    {
      icon: "/tentang/team.svg", // Team SVG
      title: "Kolaborasi",
      description: "Kami percaya bahwa kerja sama tim adalah kunci untuk memberikan perawatan kesehatan yang komprehensif dan terpadu."
    },
    {
      icon: "/tentang/access.svg", // Access SVG
      title: "Aksesibilitas",
      description: "Kami berdedikasi untuk membuat layanan kesehatan berkualitas dapat diakses oleh semua orang, kapan pun dan di mana pun."
    },
    {
      icon: "/tentang/idea.svg", // Idea SVG
      title: "Inovasi",
      description: "Kami terus mengembangkan solusi kesehatan baru yang meningkatkan pengalaman pasien dan hasil perawatan."
    }
  ];

  // Team data
  const team = [
    {
      name: "Dr. Surya Wijaya",
      role: "CEO & Pendiri",
      photo: "https://placeholder.pics/svg/200x200/3570ff/FFFFFF/ceo",
      bio: "Dr. Surya adalah dokter bedah dengan pengalaman 15 tahun yang memiliki visi untuk mentransformasi layanan kesehatan melalui teknologi."
    },
    {
      name: "Dr. Lisa Hartanto",
      role: "Chief Medical Officer",
      photo: "https://placeholder.pics/svg/200x200/3570ff/FFFFFF/cmo",
      bio: "Dr. Lisa berspesialisasi dalam kesehatan digital dan telemedicine dengan fokus pada peningkatan kualitas perawatan pasien."
    },
    {
      name: "Ir. Budi Santoso",
      role: "Chief Technology Officer",
      photo: "https://placeholder.pics/svg/200x200/3570ff/FFFFFF/cto",
      bio: "Ir. Budi memiliki lebih dari 12 tahun pengalaman dalam pengembangan teknologi kesehatan dan sistem AI untuk diagnosis medis."
    },
    {
      name: "Maya Putri, M.B.A",
      role: "Chief Operating Officer",
      photo: "https://placeholder.pics/svg/200x200/3570ff/FFFFFF/coo",
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
      <Navbar />
      {/* Modular Section Components */}
      <HeroSection fadeIn={fadeIn} />
      <VisionMissionSection staggerContainer={staggerContainer} itemFadeIn={itemFadeIn} />
      <ValuesSection fadeIn={fadeIn} staggerContainer={staggerContainer} itemFadeIn={itemFadeIn} values={values} />
      <StorySection staggerContainer={staggerContainer} itemFadeIn={itemFadeIn} />
      <MilestonesSection fadeIn={fadeIn} staggerContainer={staggerContainer} itemFadeIn={itemFadeIn} milestones={milestones} />
      <TeamSection fadeIn={fadeIn} staggerContainer={staggerContainer} itemFadeIn={itemFadeIn} team={team} />
      <StatsSection fadeIn={fadeIn} stats={stats} />
      <CTASection fadeIn={fadeIn} />
      <Footer />
    </div>
  );
}
