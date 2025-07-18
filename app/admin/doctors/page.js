"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DoctorsManagement() {
  // Doctor analytics data
  const [doctorAnalytics, setDoctorAnalytics] = useState({
    totalDoctors: 85,
    verifiedDoctors: 72,
    pendingVerification: 8,
    suspendedDoctors: 5,
    newDoctorsThisMonth: 12,
    averageRating: 4.7,
    topPerformer: {
      name: "Dr. Emily Davis",
      rating: 4.9,
      consultations: 203,
      specialty: "Pediatrician"
    },
    specialtyDistribution: [
      { name: "General Practice", count: 22 },
      { name: "Cardiologist", count: 14 },
      { name: "Dermatologist", count: 12 },
      { name: "Pediatrician", count: 10 },
      { name: "Psychiatrist", count: 8 }
    ],
    averageExperience: 8.5,
    averageResponseTime: 15, // minutes
    mostActiveTime: "15:00-18:00",
    satisfactionScore: 92
  });

  // Doctor trend data
  const [doctorTrends, setDoctorTrends] = useState({
    applications: [8, 10, 7, 12, 9, 12],
    ratings: [4.5, 4.6, 4.6, 4.7, 4.8, 4.7],
    consultationsPerDoctor: [9.2, 10.1, 11.5, 12.3, 13.8, 15.2],
    monthLabels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  });

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+62 814 5678 9012",
      specialization: "Cardiologist",
      license: "IDI-12345678",
      experience: "10 years",
      status: "verified",
      rating: 4.8,
      consultations: 145,
      joinDate: "2024-01-10",
      lastActive: "2024-07-18",
      hospital: "RS Medlitik Central",
      education: "University of Indonesia"
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      email: "michael.brown@email.com",
      phone: "+62 816 7890 1234",
      specialization: "Neurologist",
      license: "IDI-87654321",
      experience: "8 years",
      status: "pending",
      rating: 0,
      consultations: 0,
      joinDate: "2024-07-15",
      lastActive: "2024-07-18",
      hospital: "RS Harapan Bangsa",
      education: "Gadjah Mada University"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      email: "emily.davis@email.com",
      phone: "+62 817 8901 2345",
      specialization: "Pediatrician",
      license: "IDI-11223344",
      experience: "12 years",
      status: "verified",
      rating: 4.9,
      consultations: 203,
      joinDate: "2024-02-05",
      lastActive: "2024-07-17",
      hospital: "RS Anak Sehat",
      education: "Airlangga University"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      email: "james.wilson@email.com",
      phone: "+62 818 9012 3456",
      specialization: "Dermatologist",
      license: "IDI-55667788",
      experience: "6 years",
      status: "suspended",
      rating: 4.2,
      consultations: 67,
      joinDate: "2024-03-20",
      lastActive: "2024-06-30",
      hospital: "Klinik Kulit Sehat",
      education: "Padjadjaran University"
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+62 819 0123 4567",
      specialization: "Psychiatrist",
      license: "IDI-99887766",
      experience: "15 years",
      status: "verified",
      rating: 4.7,
      consultations: 189,
      joinDate: "2024-01-25",
      lastActive: "2024-07-18",
      hospital: "Mental Health Center",
      education: "University of Indonesia"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = filterSpecialization === "all" || doctor.specialization === filterSpecialization;
    const matchesStatus = filterStatus === "all" || doctor.status === filterStatus;
    
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case "verified":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "suspended":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "rejected":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleStatusChange = (doctorId, newStatus) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === doctorId ? { ...doctor, status: newStatus } : doctor
    ));
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center">
                <Image
                  src="https://placeholder.pics/svg/40x40/3570ff/000000/Logo"
                  alt="Logo Medlitik"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-2xl font-bold text-[#3570ff]">Medlitik</span>
                <span className="ml-3 px-2 py-1 bg-[#3570ff] text-white text-xs rounded-full">Admin</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/admin" className="text-gray-600 hover:text-[#3570ff]">Dashboard</Link>
              <Link href="/admin/users" className="text-gray-600 hover:text-[#3570ff]">Users</Link>
              <Link href="/admin/doctors" className="text-[#3570ff] font-medium">Doctors</Link>
              <Link href="/admin/consultations" className="text-gray-600 hover:text-[#3570ff]">Consultations</Link>
              <Link href="/admin/reports" className="text-gray-600 hover:text-[#3570ff]">Reports</Link>
            </nav>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-[#3570ff]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5-5 5-5h-5m-6 10v-2a6 6 0 016-6v2a4 4 0 00-4 4v2z" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <Image
                  src="https://placeholder.pics/svg/32x32/3570ff/000000/Admin"
                  alt="Admin Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Analytics Dashboard */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {/* Doctor Overview Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Doctor Overview</h2>
                <p className="text-sm text-gray-500">Healthcare professional statistics</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Total Doctors</p>
                <p className="text-sm font-semibold text-gray-900">{doctorAnalytics.totalDoctors}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-sm font-semibold text-green-600">{doctorAnalytics.verifiedDoctors} ({Math.round(doctorAnalytics.verifiedDoctors/doctorAnalytics.totalDoctors*100)}%)</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Pending Verification</p>
                <p className="text-sm font-semibold text-yellow-600">{doctorAnalytics.pendingVerification}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-sm font-semibold text-red-600">{doctorAnalytics.suspendedDoctors}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-sm font-semibold text-blue-600">+{doctorAnalytics.newDoctorsThisMonth}</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h2>
            
            {/* Average Rating */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-600">Average Rating</p>
                <div className="flex items-center">
                  <p className="text-sm font-semibold text-gray-900 mr-1">{doctorAnalytics.averageRating}</p>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="flex space-x-1">
                {doctorTrends.ratings.map((value, index) => (
                  <div 
                    key={index} 
                    className="flex-1 bg-yellow-100 rounded-sm relative overflow-hidden"
                    style={{ height: '40px' }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-yellow-500" 
                      style={{ height: `${((value - 4) / 1) * 100}%` }}
                    ></div>
                    <div className="absolute bottom-0 w-full text-center text-xs text-yellow-800">
                      {doctorTrends.monthLabels[index]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>4.0</span>
                <span>5.0</span>
              </div>
            </div>
            
            {/* Satisfaction Score */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-600">Patient Satisfaction</p>
                <p className="text-sm font-medium text-gray-900">{doctorAnalytics.satisfactionScore}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{width: `${doctorAnalytics.satisfactionScore}%`}}
                ></div>
              </div>
            </div>

            {/* Average Response Time */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-600">Avg. Response Time</p>
                <p className="text-sm font-medium text-gray-900">{doctorAnalytics.averageResponseTime} min</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{width: `${100 - ((doctorAnalytics.averageResponseTime / 30) * 100)}%`}}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Top Specialties & Top Performer */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Specialties & Top Performer</h2>
            
            {/* Top Specialties */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Top Specialties</p>
              <div className="space-y-2">
                {doctorAnalytics.specialtyDistribution.slice(0, 3).map((specialty, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 text-xs text-gray-600 truncate">{specialty.name}</div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full" 
                          style={{width: `${(specialty.count / doctorAnalytics.specialtyDistribution[0].count) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                    <div className="w-8 text-right text-xs text-gray-600">{specialty.count}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Top Performer */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Top Performer</p>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doctorAnalytics.topPerformer.name}</p>
                    <p className="text-xs text-gray-500">{doctorAnalytics.topPerformer.specialty}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900 mr-1">{doctorAnalytics.topPerformer.rating}</p>
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Consultations</p>
                    <p className="text-sm font-medium text-gray-900">{doctorAnalytics.topPerformer.consultations}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
              <p className="text-gray-600 mt-2">Kelola dan verifikasi dokter di platform Medlitik</p>
            </div>
            <div className="flex space-x-3">
              <Link 
                href="/admin/doctors/verify"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verify Pending
              </Link>
              <Link 
                href="/admin/doctors/new"
                className="bg-[#3570ff] text-white px-6 py-2 rounded-lg hover:bg-[#2856b6] transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Doctor
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">{doctors.filter(d => d.status === 'verified').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{doctors.filter(d => d.status === 'pending').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(doctors.filter(d => d.rating > 0).reduce((acc, d) => acc + d.rating, 0) / doctors.filter(d => d.rating > 0).length).toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Doctors
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none"
                  placeholder="Search by name, email, or specialization..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter by Specialization */}
            <div>
              <label htmlFor="filterSpecialization" className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <select
                id="filterSpecialization"
                value={filterSpecialization}
                onChange={(e) => setFilterSpecialization(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none"
              >
                <option value="all">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div>
              <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Doctors Table */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Doctors ({filteredDoctors.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Doctor
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Specialization
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Experience
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Status
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Rating
                      <svg className="w-4 h-4 ml-1 text-[#3570ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Consultations
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4 border-2 border-white shadow-sm overflow-hidden">
                          <Image
                            src={`https://placeholder.pics/svg/40x40/3570ff/FFFFFF/Dr${doctor.name.substring(0, 1)}`}
                            alt={doctor.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {doctor.name}
                            {doctor.status === 'verified' && (
                              <svg className="w-4 h-4 ml-1 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{doctor.email}</div>
                          <div className="text-xs text-gray-400 flex items-center">
                            <span className="mr-2">License: {doctor.license}</span>
                            <span className="px-1 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-md">{doctor.education.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
                          {doctor.specialization}
                        </span>
                        <div className="text-sm text-gray-500 mt-1 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {doctor.hospital}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                          parseInt(doctor.experience) > 10 ? 'bg-green-100 text-green-800' : 
                          parseInt(doctor.experience) > 5 ? 'bg-blue-100 text-blue-800' : 
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {parseInt(doctor.experience)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doctor.experience}</div>
                          <div className="text-xs text-gray-500">
                            {parseInt(doctor.experience) > 10 ? 'Senior' : 
                             parseInt(doctor.experience) > 5 ? 'Experienced' : 'Junior'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`${getStatusBadge(doctor.status)} flex items-center`}>
                          <span className={`w-2 h-2 rounded-full mr-1.5 ${
                            doctor.status === 'verified' ? 'bg-green-600' :
                            doctor.status === 'pending' ? 'bg-yellow-500' :
                            doctor.status === 'suspended' ? 'bg-red-600' : 'bg-gray-500'
                          } animate-pulse`}></span>
                          {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                        </span>
                        {doctor.status === 'pending' && (
                          <span className="ml-2 text-xs text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded-md">
                            Review Needed
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {doctor.rating > 0 ? (
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900 mr-1">{doctor.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-3.5 h-3.5 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            from {Math.floor(doctor.consultations * 0.7)} reviews
                          </div>
                        </div>
                      ) : (
                        <div className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded inline-block">
                          No ratings yet
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{doctor.consultations.toLocaleString()}</div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${Math.min(100, (doctor.consultations / 200) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center">
                          {doctor.consultations > 100 ? (
                            <>
                              <span className="text-green-600">●</span>
                              <span className="ml-1">High activity</span>
                            </>
                          ) : doctor.consultations > 50 ? (
                            <>
                              <span className="text-yellow-500">●</span>
                              <span className="ml-1">Medium activity</span>
                            </>
                          ) : (
                            <>
                              <span className="text-gray-400">●</span>
                              <span className="ml-1">Low activity</span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-[#3570ff] hover:text-[#2856b6] p-1 rounded-md hover:bg-blue-50" title="View Details">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        {doctor.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(doctor.id, 'verified')}
                              className="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50" 
                              title="Approve"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleStatusChange(doctor.id, 'rejected')}
                              className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50" 
                              title="Reject"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </>
                        )}
                        {doctor.status === 'verified' && (
                          <button 
                            onClick={() => handleStatusChange(doctor.id, 'suspended')}
                            className="text-orange-600 hover:text-orange-900 p-1 rounded-md hover:bg-orange-50" 
                            title="Suspend"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                            </svg>
                          </button>
                        )}
                        <div className="group relative">
                          <button className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                          <div className="hidden group-hover:block absolute right-0 z-10 w-48 bg-white rounded-md shadow-lg py-1 mt-1 border border-gray-200">
                            <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit Profile
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              View License
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove Doctor
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{filteredDoctors.length}</span> doctors
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-[#3570ff] text-sm font-medium text-white">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    8
                  </button>
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
