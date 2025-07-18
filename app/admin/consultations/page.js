"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminConsultations() {
  const router = useRouter();
  
  // Consultation analytics
  const [consultationAnalytics, setConsultationAnalytics] = useState({
    totalConsultations: 3420,
    ongoingConsultations: 24,
    scheduledConsultations: 56,
    completedToday: 32,
    cancelledToday: 5,
    averageDuration: 24, // minutes
    completionRate: 92,
    satisfactionRate: 4.7,
    typeDistribution: {
      video: 56,
      chat: 32,
      voice: 12
    },
    peakHours: [
      { hour: '08:00', count: 15 },
      { hour: '10:00', count: 28 },
      { hour: '14:00', count: 42 },
      { hour: '16:00', count: 35 },
      { hour: '18:00', count: 21 },
      { hour: '20:00', count: 12 }
    ],
    mostRequestedSpecialties: [
      { name: 'General Practice', count: 125 },
      { name: 'Dermatologist', count: 84 },
      { name: 'Pediatrician', count: 76 },
      { name: 'Psychiatrist', count: 62 },
      { name: 'Cardiologist', count: 45 }
    ]
  });

  // Consultation trend data
  const [consultationTrends, setConsultationTrends] = useState({
    daily: [108, 95, 125, 87, 115, 132, 118],
    dayLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthly: [2150, 2380, 2640, 2820, 3100, 3420],
    monthLabels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    satisfaction: [4.5, 4.6, 4.5, 4.6, 4.8, 4.7],
    completionRates: [87, 89, 90, 91, 90, 92]
  });

  const [consultations, setConsultations] = useState([
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "2025-01-19",
      time: "14:30",
      status: "ongoing",
      type: "video",
      duration: "30 min",
      payment: "completed"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      doctorName: "Dr. Ahmad Ridwan",
      specialty: "Dermatologist",
      date: "2025-01-19",
      time: "15:00",
      status: "scheduled",
      type: "chat",
      duration: "45 min",
      payment: "pending"
    },
    {
      id: 3,
      patientName: "Bob Wilson",
      doctorName: "Dr. Maya Sari",
      specialty: "General Practitioner",
      date: "2025-01-19",
      time: "13:15",
      status: "completed",
      type: "video",
      duration: "20 min",
      payment: "completed"
    },
    {
      id: 4,
      patientName: "Alice Johnson",
      doctorName: "Dr. Budi Hartono",
      specialty: "Pediatrician",
      date: "2025-01-19",
      time: "16:30",
      status: "cancelled",
      type: "video",
      duration: "30 min",
      payment: "refunded"
    },
    {
      id: 5,
      patientName: "Mike Brown",
      doctorName: "Dr. Lisa Chen",
      specialty: "Psychiatrist",
      date: "2025-01-20",
      time: "09:00",
      status: "scheduled",
      type: "chat",
      duration: "60 min",
      payment: "completed"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      localStorage.removeItem('user');
      router.push('/landing_page');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('user');
      router.push('/landing_page');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      ongoing: "bg-blue-100 text-blue-800",
      scheduled: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentBadge = (payment) => {
    const badges = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      refunded: "bg-red-100 text-red-800"
    };
    return badges[payment] || "bg-gray-100 text-gray-800";
  };

  const filteredConsultations = consultations.filter(consultation => {
    const statusMatch = filterStatus === "all" || consultation.status === filterStatus;
    const typeMatch = filterType === "all" || consultation.type === filterType;
    return statusMatch && typeMatch;
  });

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
              <Image
                src="https://placeholder.pics/svg/40x40/3570ff/000000/Logo"
                alt="Logo Medlitik"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-2xl font-bold text-[#3570ff]">Medlitik</span>
              <span className="ml-3 px-2 py-1 bg-[#3570ff] text-white text-xs rounded-full">Admin</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/admin" className="text-gray-600 hover:text-[#3570ff]">Dashboard</Link>
              <Link href="/admin/users" className="text-gray-600 hover:text-[#3570ff]">Users</Link>
              <Link href="/admin/doctors" className="text-gray-600 hover:text-[#3570ff]">Doctors</Link>
              <Link href="/admin/consultations" className="text-[#3570ff] font-medium">Consultations</Link>
              <Link href="/admin/reports" className="text-gray-600 hover:text-[#3570ff]">Reports</Link>
            </nav>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-[#3570ff]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5-5 5-5h-5m-6 10v-2a6 6 0 016-6v2a4 4 0 00-4 4v2z" />
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
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
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Consultation Analytics Dashboard */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {/* Consultation Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Consultation Stats</h2>
                <p className="text-sm text-gray-500">Overview of consultations</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Total Consultations</p>
                <p className="text-sm font-semibold text-gray-900">{consultationAnalytics.totalConsultations.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Ongoing Now</p>
                <p className="text-sm font-semibold text-blue-600">{consultationAnalytics.ongoingConsultations}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-sm font-semibold text-yellow-600">{consultationAnalytics.scheduledConsultations}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-sm font-semibold text-green-600">{consultationAnalytics.completedToday}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Cancelled Today</p>
                <p className="text-sm font-semibold text-red-600">{consultationAnalytics.cancelledToday}</p>
              </div>
            </div>
          </div>

          {/* Consultation Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h2>
            
            {/* Completion Rate */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-sm font-medium text-gray-900">{consultationAnalytics.completionRate}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{width: `${consultationAnalytics.completionRate}%`}}
                ></div>
              </div>
            </div>

            {/* Daily Trend */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Daily Consultations</p>
              <div className="flex items-end h-20 space-x-1">
                {consultationTrends.daily.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-purple-500 rounded-t-sm"
                      style={{ height: `${(value / Math.max(...consultationTrends.daily)) * 100}%` }}
                    ></div>
                    <p className="text-xs text-gray-500 mt-1">{consultationTrends.dayLabels[index]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Satisfaction Rate */}
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-600">Patient Satisfaction</p>
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900 mr-1">{consultationAnalytics.satisfactionRate}</p>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{width: `${(consultationAnalytics.satisfactionRate/5)*100}%`}}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Consultation Type & Peak Hours */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Types & Peak Hours</h2>
            
            {/* Consultation Types */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Consultation Types</p>
              <div className="flex h-4 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-blue-500" 
                  style={{width: `${consultationAnalytics.typeDistribution.video}%`}}
                  title={`Video: ${consultationAnalytics.typeDistribution.video}%`}
                ></div>
                <div 
                  className="bg-green-500" 
                  style={{width: `${consultationAnalytics.typeDistribution.chat}%`}}
                  title={`Chat: ${consultationAnalytics.typeDistribution.chat}%`}
                ></div>
                <div 
                  className="bg-yellow-500" 
                  style={{width: `${consultationAnalytics.typeDistribution.voice}%`}}
                  title={`Voice: ${consultationAnalytics.typeDistribution.voice}%`}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                  <span>Video {consultationAnalytics.typeDistribution.video}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  <span>Chat {consultationAnalytics.typeDistribution.chat}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                  <span>Voice {consultationAnalytics.typeDistribution.voice}%</span>
                </div>
              </div>
            </div>
            
            {/* Peak Hours */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Peak Hours</p>
              <div className="flex items-end h-24 space-x-1">
                {consultationAnalytics.peakHours.map((hour, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-purple-400 rounded-t-sm"
                      style={{ height: `${(hour.count / Math.max(...consultationAnalytics.peakHours.map(h => h.count))) * 100}%` }}
                    ></div>
                    <p className="text-xs text-gray-500 mt-1">{hour.hour.split(':')[0]}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">Hours of the day</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consultation Management 👨‍⚕️
          </h1>
          <p className="text-gray-600">
            Monitor and manage all consultations on the platform.
          </p>
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
                <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                <p className="text-2xl font-bold text-gray-900">{consultations.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ongoing</p>
                <p className="text-2xl font-bold text-blue-600">{consultations.filter(c => c.status === 'ongoing').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{consultations.filter(c => c.status === 'completed').length}</p>
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
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-yellow-600">{consultations.filter(c => c.status === 'scheduled').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Consultations Table */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-100"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h2 className="text-lg font-semibold text-gray-900">All Consultations</h2>
              
              {/* Filters */}
              <div className="flex space-x-4">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3570ff] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3570ff] focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="video">Video Call</option>
                  <option value="chat">Chat</option>
                </select>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search consultations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none"
                />
              </div>
              <div className="ml-4">
                <Link
                  href="/admin/consultations/export"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3570ff]"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Patient
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
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
                      Date & Time
                      <svg className="w-4 h-4 ml-1 text-[#3570ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Type
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
                      Payment
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
                {filteredConsultations.map((consultation) => (
                  <tr key={consultation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-9 h-9 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3 border-2 border-white shadow-sm">
                          <span className="text-xs font-medium text-blue-800">
                            {consultation.patientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{consultation.patientName}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Patient #{(consultation.id + 1000).toString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-9 h-9 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mr-3 border-2 border-white shadow-sm">
                          <span className="text-xs font-medium text-indigo-800">
                            {consultation.doctorName.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{consultation.doctorName}</div>
                          <div className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md inline-block">
                            {consultation.specialty}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{consultation.date}</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {consultation.time} ({consultation.duration})
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-start">
                        {consultation.type === 'video' ? (
                          <span className="flex items-center px-2.5 py-1 bg-blue-50 text-blue-800 rounded-md text-xs font-medium">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Video Call
                          </span>
                        ) : (
                          <span className="flex items-center px-2.5 py-1 bg-green-50 text-green-800 rounded-md text-xs font-medium">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Chat
                          </span>
                        )}
                        <div className="text-xs text-gray-500 mt-1.5 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {consultation.duration}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-start">
                        <span className={`flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getStatusBadge(consultation.status)}`}>
                          <span className={`w-2 h-2 rounded-full mr-1.5 ${
                            consultation.status === 'ongoing' ? 'bg-blue-600 animate-pulse' :
                            consultation.status === 'scheduled' ? 'bg-yellow-500' :
                            consultation.status === 'completed' ? 'bg-green-600' : 'bg-red-600'
                          }`}></span>
                          {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                        </span>
                        {consultation.status === 'ongoing' && (
                          <div className="text-xs text-blue-600 mt-1.5">
                            Started 24 min ago
                          </div>
                        )}
                        {consultation.status === 'scheduled' && (
                          <div className="text-xs text-yellow-600 mt-1.5">
                            Starts in 3 hours
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-start">
                        <span className={`flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getPaymentBadge(consultation.payment)}`}>
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {consultation.payment === 'completed' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                          </svg>
                          {consultation.payment.charAt(0).toUpperCase() + consultation.payment.slice(1)}
                        </span>
                        <div className="text-xs text-gray-500 mt-1.5">
                          {consultation.payment === 'completed' ? 'via BCA' : 'due after session'}
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
                        {consultation.status === 'scheduled' && (
                          <button className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100" title="Reschedule">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Medical Records
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit Details
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Cancel Session
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
                  <span className="font-medium">{filteredConsultations.length}</span> consultations
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
                    7
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
          
          {filteredConsultations.length === 0 && (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No consultations found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
