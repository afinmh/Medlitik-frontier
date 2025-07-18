"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DoktorPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Semua");
  const [selectedRating, setSelectedRating] = useState("Semua");
  const [selectedExperience, setSelectedExperience] = useState("Semua");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentView, setCurrentView] = useState("grid"); // grid or list

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    },
  };

  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  };

  // Sample specialties
  const specialties = [
    "Semua",
    "Dokter Umum",
    "Dokter Gigi",
    "Dokter Anak",
    "Dokter Kulit",
    "Dokter Mata",
    "Psikolog",
    "Dokter Kandungan",
    "Dokter Jantung",
    "Dokter Syaraf",
  ];

  // Sample experience levels
  const experienceLevels = [
    "Semua",
    "0-5 tahun",
    "5-10 tahun",
    "10+ tahun"
  ];

  // Sample ratings
  const ratings = [
    "Semua",
    "4.5+",
    "4.0+",
    "3.5+"
  ];

  // Mock doctor data
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const mockDoctors = [
      {
        id: 1,
        name: "Dr. Sarah Wijaya",
        specialty: "Dokter Umum",
        rating: 4.9,
        reviews: 124,
        experience: "8 tahun",
        education: "Universitas Indonesia, 2017",
        location: "RS Medlitik Pusat, Jakarta",
        availableDays: ["Senin", "Selasa", "Kamis"],
        availableHours: "09:00 - 14:00",
        price: "Rp 150.000",
        about: "Dr. Sarah Wijaya adalah seorang dokter umum dengan pengalaman 8 tahun dalam praktik kesehatan umum. Beliau berspesialisasi dalam perawatan preventif dan pengelolaan penyakit kronis.",
        image: "https://placeholder.pics/svg/300/3570ff/FFFFFF/doctor-1",
        isOnline: true,
        languages: ["Indonesia", "Inggris"],
        treatments: ["Konsultasi Umum", "Cek Kesehatan Rutin", "Vaksinasi"],
        insurance: ["BPJS", "Asuransi Allianz", "Prudential"]
      },
      {
        id: 2,
        name: "Dr. Ahmad Ridwan, Sp.A",
        specialty: "Dokter Anak",
        rating: 4.8,
        reviews: 98,
        experience: "12 tahun",
        education: "Universitas Gadjah Mada, 2013",
        location: "Klinik Medlitik Selatan, Jakarta",
        availableDays: ["Rabu", "Jumat", "Sabtu"],
        availableHours: "10:00 - 16:00",
        price: "Rp 200.000",
        about: "Dr. Ahmad Ridwan adalah spesialis anak berpengalaman dengan keahlian dalam perkembangan anak dan perawatan kesehatan pediatrik.",
        image: "https://placeholder.pics/svg/300/3570ff/FFFFFF/doctor-2",
        isOnline: true,
        languages: ["Indonesia", "Inggris", "Arab"],
        treatments: ["Pemeriksaan Tumbuh Kembang Anak", "Imunisasi", "Konsultasi Nutrisi Anak"],
        insurance: ["BPJS", "Asuransi Manulife", "AXA"]
      },
      {
        id: 3,
        name: "Dr. Maya Sari, Sp.KK",
        specialty: "Dokter Kulit",
        rating: 4.9,
        reviews: 156,
        experience: "10 tahun",
        education: "Universitas Airlangga, 2015",
        location: "RS Medlitik Pusat, Jakarta",
        availableDays: ["Senin", "Rabu", "Jumat"],
        availableHours: "13:00 - 18:00",
        price: "Rp 250.000",
        about: "Dr. Maya Sari adalah spesialis kulit dengan fokus pada dermatologi kosmetik dan pengobatan kondisi kulit kronis.",
        image: "https://placeholder.pics/svg/300/3570ff/FFFFFF/doctor-3",
        isOnline: false,
        languages: ["Indonesia", "Inggris"],
        treatments: ["Perawatan Kulit", "Konsultasi Dermatologi", "Prosedur Kosmetik"],
        insurance: ["Prudential", "AXA", "Cigna"]
      },
      {
        id: 4,
        name: "Dr. Budi Santoso, Sp.PD",
        specialty: "Dokter Penyakit Dalam",
        rating: 4.7,
        reviews: 87,
        experience: "15 tahun",
        education: "Universitas Indonesia, 2010",
        location: "RS Medlitik Timur, Jakarta",
        availableDays: ["Selasa", "Kamis", "Sabtu"],
        availableHours: "09:00 - 15:00",
        price: "Rp 250.000",
        about: "Dr. Budi Santoso adalah spesialis penyakit dalam dengan pengalaman luas dalam mengelola kondisi metabolik dan penyakit kronis.",
        image: "https://placeholder.pics/svg/300/3570ff/FFFFFF/doctor-4",
        isOnline: true,
        languages: ["Indonesia", "Inggris", "Mandarin"],
        treatments: ["Pemeriksaan Kesehatan Menyeluruh", "Manajemen Penyakit Kronis", "Konsultasi Gaya Hidup"],
        insurance: ["BPJS", "AXA", "Sinarmas"]
      },
      {
        id: 5,
        name: "Dr. Lisa Chen, M.Psi",
        specialty: "Psikolog",
        rating: 4.9,
        reviews: 112,
        experience: "7 tahun",
        education: "Universitas Indonesia, 2018",
        location: "Klinik Kesehatan Mental Medlitik",
        availableDays: ["Senin", "Selasa", "Kamis", "Jumat"],
        availableHours: "11:00 - 19:00",
        price: "Rp 300.000",
        about: "Dr. Lisa Chen adalah psikolog klinis dengan keahlian dalam terapi kognitif perilaku dan manajemen stres.",
        image: "https://placeholder.pics/svg/300/3570ff/FFFFFF/doctor-5",
        isOnline: true,
        languages: ["Indonesia", "Inggris", "Mandarin"],
        treatments: ["Terapi Individu", "Konseling Pernikahan", "Manajemen Stres"],
        insurance: ["Asuransi Allianz", "AXA", "Prudential"]
      },
      {
        id: 6,
        name: "Dr. Rudi Hartono, Sp.M",
        specialty: "Dokter Mata",
        rating: 4.8,
        reviews: 76,
        experience: "11 tahun",
        education: "Universitas Padjadjaran, 2014",
        location: "RS Medlitik Barat, Jakarta",
        availableDays: ["Selasa", "Kamis", "Sabtu"],
        availableHours: "08:00 - 13:00",
        price: "Rp 200.000",
        about: "Dr. Rudi Hartono adalah spesialis mata dengan keahlian dalam penanganan berbagai gangguan penglihatan dan penyakit mata.",
        image: "https://placeholder.pics/svg/300/3570ff/FFFFFF/doctor-6",
        isOnline: false,
        languages: ["Indonesia", "Inggris"],
        treatments: ["Pemeriksaan Mata Komprehensif", "Perawatan Katarak", "Terapi Glaukoma"],
        insurance: ["BPJS", "Asuransi Allianz", "AXA"]
      },
      {
        id: 7,
        name: "Dr. Dewi Permata, drg.",
        specialty: "Dokter Gigi",
        rating: 4.7,
        reviews: 92,
        experience: "9 tahun",
        education: "Universitas Trisakti, 2016",
        location: "Klinik Gigi Medlitik",
        availableDays: ["Senin", "Rabu", "Jumat"],
        availableHours: "10:00 - 17:00",
        price: "Rp 175.000",
        about: "Dr. Dewi Permata adalah dokter gigi dengan spesialisasi dalam kedokteran gigi estetik dan restorasi.",
        image: "https://placeholder.pics/svg/300/3570ff/FFFFFF/doctor-7",
        isOnline: true,
        languages: ["Indonesia", "Inggris"],
        treatments: ["Pemeriksaan Gigi Rutin", "Perawatan Saluran Akar", "Kosmetik Gigi"],
        insurance: ["BPJS", "Asuransi Manulife", "Prudential"]
      },
      {
        id: 8,
        name: "Dr. Hendra Wijaya, Sp.JP",
        specialty: "Dokter Jantung",
        rating: 4.9,
        reviews: 143,
        experience: "14 tahun",
        education: "Universitas Indonesia, 2011",
        location: "RS Medlitik Pusat, Jakarta",
        availableDays: ["Senin", "Selasa", "Kamis", "Jumat"],
        availableHours: "09:00 - 15:00",
        price: "Rp 350.000",
        about: "Dr. Hendra Wijaya adalah spesialis jantung dengan pengalaman luas dalam pengelolaan penyakit kardiovaskular.",
        image: "https://placeholder.pics/svg/300/3570ff/FFFFFF/doctor-8",
        isOnline: true,
        languages: ["Indonesia", "Inggris"],
        treatments: ["Pemeriksaan Jantung", "Ekokardiografi", "Manajemen Penyakit Jantung"],
        insurance: ["BPJS", "AXA", "Prudential", "Cigna"]
      },
    ];
    
    setDoctors(mockDoctors);
    setFilteredDoctors(mockDoctors);
  }, []);

  // Filter doctors based on search and filter criteria
  useEffect(() => {
    let results = [...doctors];
    
    // Apply search term
    if (searchTerm) {
      results = results.filter(
        doctor =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply specialty filter
    if (selectedSpecialty !== "Semua") {
      results = results.filter(
        doctor => doctor.specialty === selectedSpecialty
      );
    }
    
    // Apply rating filter
    if (selectedRating !== "Semua") {
      const minRating = parseFloat(selectedRating);
      results = results.filter(
        doctor => doctor.rating >= minRating
      );
    }
    
    // Apply experience filter
    if (selectedExperience !== "Semua") {
      if (selectedExperience === "0-5 tahun") {
        results = results.filter(
          doctor => parseInt(doctor.experience) <= 5
        );
      } else if (selectedExperience === "5-10 tahun") {
        results = results.filter(
          doctor => parseInt(doctor.experience) > 5 && parseInt(doctor.experience) <= 10
        );
      } else if (selectedExperience === "10+ tahun") {
        results = results.filter(
          doctor => parseInt(doctor.experience) > 10
        );
      }
    }
    
    setFilteredDoctors(results);
  }, [searchTerm, selectedSpecialty, selectedRating, selectedExperience, doctors]);

  // Function to render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(rating)
                ? "text-yellow-400"
                : index < rating
                ? "text-yellow-300"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#f0f7ff] font-sans"
      initial="hidden"
      animate="visible"
      variants={pageTransition}
    >
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
                  item.label === "Dokter" 
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
      <section className="relative w-full bg-[#3570ff] py-20 overflow-hidden">
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
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tim Dokter Ahli Kami</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Temukan dokter terbaik yang sesuai dengan kebutuhan kesehatan Anda dari berbagai spesialisasi medis yang tersedia
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 -mt-16 relative z-20 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Pencarian
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Cari berdasarkan nama atau spesialisasi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3570ff] focus:border-[#3570ff] pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            
            <div className="md:w-1/4">
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                Spesialisasi
              </label>
              <select
                id="specialty"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3570ff] focus:border-[#3570ff]"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:w-1/4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                id="rating"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3570ff] focus:border-[#3570ff]"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
              >
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:w-1/4">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Pengalaman
              </label>
              <select
                id="experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3570ff] focus:border-[#3570ff]"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Menampilkan {filteredDoctors.length} dokter
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Tampilan:</span>
              <button
                className={`p-1 ${
                  currentView === "grid" ? "text-[#3570ff]" : "text-gray-400"
                }`}
                onClick={() => setCurrentView("grid")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                className={`p-1 ${
                  currentView === "list" ? "text-[#3570ff]" : "text-gray-400"
                }`}
                onClick={() => setCurrentView("list")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Listing */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className={
            currentView === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "flex flex-col space-y-6"
          }
        >
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                variants={itemFadeIn}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                  currentView === "list" ? "flex" : "block"
                }`}
              >
                {currentView === "grid" ? (
                  <>
                    <div className="relative h-48 bg-blue-50">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        className="object-cover object-center"
                        fill
                      />
                      {doctor.isOnline && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Online
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold text-[#1a2a3a] mb-1">{doctor.name}</h3>
                        <span className="text-[#3570ff] font-semibold">{doctor.price}</span>
                      </div>
                      <p className="text-[#3570ff] font-medium text-sm mb-2">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center mb-3">
                        {renderStars(doctor.rating)}
                        <span className="ml-1 text-xs text-gray-500">
                          ({doctor.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{doctor.experience} pengalaman</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{doctor.location}</span>
                      </div>
                      <div className="border-t border-gray-100 pt-4 mt-2">
                        <Link
                          href={`/landing_page/dokter/${doctor.id}`}
                          className="block text-center bg-[#3570ff] text-white py-2 px-4 rounded-lg hover:bg-[#2856b6] transition"
                        >
                          Lihat Profil & Jadwal
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative w-40 h-full bg-blue-50 flex-shrink-0">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        className="object-cover object-center"
                        fill
                      />
                      {doctor.isOnline && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Online
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-[#1a2a3a]">{doctor.name}</h3>
                          <p className="text-[#3570ff] font-medium text-sm">
                            {doctor.specialty}
                          </p>
                        </div>
                        <span className="text-[#3570ff] font-semibold">{doctor.price}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {renderStars(doctor.rating)}
                        <span className="ml-1 text-xs text-gray-500">
                          ({doctor.reviews} reviews)
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{doctor.experience} pengalaman</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{doctor.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Tersedia: {doctor.availableDays.join(", ")}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{doctor.availableHours}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {doctor.about}
                      </p>
                      <div className="mt-auto">
                        <Link
                          href={`/landing_page/dokter/${doctor.id}`}
                          className="block text-center bg-[#3570ff] text-white py-2 px-4 rounded-lg hover:bg-[#2856b6] transition"
                        >
                          Lihat Profil & Jadwal
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div variants={itemFadeIn} className="text-center py-12 col-span-full">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada dokter yang ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Consult CTA Section */}
      <section className="bg-gradient-to-r from-[#3570ff] to-[#6ad7e5] py-16 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Konsultasikan Kesehatan Anda dengan Dokter Ahli
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Dapatkan saran medis terbaik dari dokter spesialis berpengalaman
            untuk menjaga kesehatan Anda dan keluarga
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-white text-[#3570ff] px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition shadow-lg"
          >
            Daftar Sekarang
          </Link>
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
    </motion.div>
  );
}
