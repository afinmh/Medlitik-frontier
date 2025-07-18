"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminReports() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState("patients"); // Set patient reports as default
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const [reportData, setReportData] = useState({
    overview: {
      totalRevenue: 125000000,
      totalConsultations: 3420,
      totalUsers: 1250,
      totalDoctors: 85,
      growthRate: 12.5,
      avgConsultationTime: 32,
      customerSatisfaction: 4.7,
      platformUptime: 99.9
    },
    financial: {
      monthlyRevenue: [
        { month: "Jan", revenue: 98000000 },
        { month: "Feb", revenue: 105000000 },
        { month: "Mar", revenue: 112000000 },
        { month: "Apr", revenue: 125000000 }
      ],
      revenueBySpecialty: [
        { specialty: "General Practice", revenue: 45000000, percentage: 36 },
        { specialty: "Cardiology", revenue: 28000000, percentage: 22.4 },
        { specialty: "Dermatology", revenue: 23000000, percentage: 18.4 },
        { specialty: "Pediatrics", revenue: 18000000, percentage: 14.4 },
        { specialty: "Others", revenue: 11000000, percentage: 8.8 }
      ]
    },
    usage: {
      dailyActiveUsers: 450,
      weeklyActiveUsers: 2800,
      monthlyActiveUsers: 8500,
      avgSessionDuration: "24:30",
      peakHours: "14:00 - 16:00",
      mostUsedFeature: "Video Consultation"
    },
    patients: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+62 812-3456-7890",
        registeredDate: "2025-01-15",
        totalConsultations: 5,
        lastConsultation: "2025-01-19",
        totalSpent: 750000,
        favoriteSpecialty: "General Practice",
        status: "active"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+62 813-4567-8901",
        registeredDate: "2025-01-10",
        totalConsultations: 8,
        lastConsultation: "2025-01-18",
        totalSpent: 1200000,
        favoriteSpecialty: "Dermatology",
        status: "active"
      },
      {
        id: 3,
        name: "Bob Wilson",
        email: "bob.wilson@example.com",
        phone: "+62 814-5678-9012",
        registeredDate: "2024-12-20",
        totalConsultations: 3,
        lastConsultation: "2025-01-16",
        totalSpent: 450000,
        favoriteSpecialty: "Cardiology",
        status: "inactive"
      },
      {
        id: 4,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone: "+62 815-6789-0123",
        registeredDate: "2025-01-08",
        totalConsultations: 12,
        lastConsultation: "2025-01-19",
        totalSpent: 1800000,
        favoriteSpecialty: "Pediatrics",
        status: "active"
      }
    ],
    patientReports: [
      {
        id: 1,
        patientId: 1,
        patientName: "John Doe",
        doctorId: 1,
        doctorName: "Dr. Sarah Wilson",
        doctorSpecialty: "Cardiologist",
        consultationDate: "2025-01-19",
        reportDate: "2025-01-19",
        rating: 5,
        reportType: "Positive Feedback",
        complaint: null,
        comment: "Excellent consultation, very professional and helpful. Dr. Wilson explained everything clearly and provided great treatment.",
        status: "resolved"
      },
      {
        id: 2,
        patientId: 2,
        patientName: "Jane Smith",
        doctorId: 2,
        doctorName: "Dr. Ahmad Ridwan",
        doctorSpecialty: "Dermatologist",
        consultationDate: "2025-01-18",
        reportDate: "2025-01-18",
        rating: 4,
        reportType: "Service Quality",
        complaint: "Consultation was rushed",
        comment: "Good diagnosis but felt the consultation was a bit rushed. Would appreciate more time for questions.",
        status: "under_review"
      },
      {
        id: 3,
        patientId: 3,
        patientName: "Bob Wilson",
        doctorId: 3,
        doctorName: "Dr. Maya Sari",
        doctorSpecialty: "General Practitioner",
        consultationDate: "2025-01-16",
        reportDate: "2025-01-17",
        rating: 2,
        reportType: "Medical Concern",
        complaint: "Misdiagnosis suspected",
        comment: "I don't think the diagnosis was correct. Symptoms persisted and got worse after following the treatment plan.",
        status: "investigating"
      },
      {
        id: 4,
        patientId: 4,
        patientName: "Alice Johnson",
        doctorId: 4,
        doctorName: "Dr. Budi Hartono",
        doctorSpecialty: "Pediatrician",
        consultationDate: "2025-01-19",
        reportDate: "2025-01-19",
        rating: 5,
        reportType: "Positive Feedback",
        complaint: null,
        comment: "Amazing with children! My daughter felt comfortable throughout the consultation. Highly recommend.",
        status: "resolved"
      },
      {
        id: 5,
        patientId: 1,
        patientName: "John Doe",
        doctorId: 5,
        doctorName: "Dr. Lisa Chen",
        doctorSpecialty: "Psychiatrist",
        consultationDate: "2025-01-15",
        reportDate: "2025-01-16",
        rating: 3,
        reportType: "Communication Issue",
        complaint: "Language barrier",
        comment: "Dr. Chen is knowledgeable but there were some communication difficulties. Perhaps needs better explanation skills.",
        status: "under_review"
      }
    ],
    doctors: [
      {
        id: 1,
        name: "Dr. Sarah Wilson",
        email: "dr.sarah@medlitik.com",
        specialty: "Cardiologist",
        joinedDate: "2024-06-15",
        totalConsultations: 245,
        totalEarnings: 36750000,
        avgRating: 4.8,
        totalPatients: 128,
        availableHours: "08:00 - 17:00",
        status: "active"
      },
      {
        id: 2,
        name: "Dr. Ahmad Ridwan",
        email: "dr.ahmad@medlitik.com",
        specialty: "Dermatologist",
        joinedDate: "2024-08-20",
        totalConsultations: 189,
        totalEarnings: 28350000,
        avgRating: 4.7,
        totalPatients: 95,
        availableHours: "09:00 - 16:00",
        status: "active"
      },
      {
        id: 3,
        name: "Dr. Maya Sari",
        email: "dr.maya@medlitik.com",
        specialty: "General Practitioner",
        joinedDate: "2024-05-10",
        totalConsultations: 312,
        totalEarnings: 31200000,
        avgRating: 4.9,
        totalPatients: 156,
        availableHours: "07:00 - 15:00",
        status: "active"
      },
      {
        id: 4,
        name: "Dr. Budi Hartono",
        email: "dr.budi@medlitik.com",
        specialty: "Pediatrician",
        joinedDate: "2024-07-05",
        totalConsultations: 167,
        totalEarnings: 25050000,
        avgRating: 4.6,
        totalPatients: 89,
        availableHours: "10:00 - 18:00",
        status: "active"
      },
      {
        id: 5,
        name: "Dr. Lisa Chen",
        email: "dr.lisa@medlitik.com",
        specialty: "Psychiatrist",
        joinedDate: "2024-09-12",
        totalConsultations: 123,
        totalEarnings: 24600000,
        avgRating: 4.8,
        totalPatients: 67,
        availableHours: "13:00 - 20:00",
        status: "active"
      }
    ]
  });

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

  const exportReport = (format) => {
    alert(`Exporting report in ${format.toUpperCase()} format...`);
  };

  const formatCurrency = (amount) => {
    if (!isClient) return `Rp ${amount.toLocaleString()}`;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const formatNumber = (number) => {
    if (!isClient) return number.toString();
    return number.toLocaleString();
  };

  const calculateAverage = (total, count) => {
    if (!isClient || count === 0) return 0;
    return Math.round(total / count);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Prevent hydration issues by not rendering complex content until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3570ff]"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

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
              <Link href="/admin/consultations" className="text-gray-600 hover:text-[#3570ff]">Consultations</Link>
              <Link href="/admin/reports" className="text-[#3570ff] font-medium">Reports</Link>
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
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reports & Analytics 📊
          </h1>
          <p className="text-gray-600">
            Comprehensive insights and analytics for the Medlitik platform.
          </p>
        </motion.div>

        {/* Report Controls */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Report Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select 
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3570ff] focus:border-transparent"
                >
                  <option value="overview">Overview</option>
                  <option value="financial">Financial</option>
                  <option value="usage">Usage Analytics</option>
                  <option value="patients">Patient Reports</option>
                  <option value="doctors">Doctor Reports</option>
                </select>
              </div>

              {/* Period Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3570ff] focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex space-x-3">
              <button 
                onClick={() => exportReport('pdf')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Export PDF
              </button>
              <button 
                onClick={() => exportReport('excel')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Export Excel
              </button>
              <button 
                onClick={() => exportReport('csv')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Export CSV
              </button>
            </div>
          </div>
        </motion.div>

        {/* Overview Report */}
        {selectedReport === "overview" && (
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(reportData.overview.totalRevenue)}</p>
                    <p className="text-sm text-green-600">+{reportData.overview.growthRate}% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(reportData.overview.totalConsultations)}</p>
                    <p className="text-sm text-gray-500">This month</p>
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
                    <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.overview.customerSatisfaction}/5.0</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(reportData.overview.customerSatisfaction) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Platform Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.overview.platformUptime}%</p>
                    <p className="text-sm text-green-600">Excellent performance</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(reportData.overview.totalUsers)}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalDoctors}</p>
                  <p className="text-sm text-gray-600">Active Doctors</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{reportData.overview.avgConsultationTime} min</p>
                  <p className="text-sm text-gray-600">Avg Consultation Time</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Financial Report */}
        {selectedReport === "financial" && (
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Trend */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
                <div className="space-y-4">
                  {reportData.financial.monthlyRevenue.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.month} 2025</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(item.revenue)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue by Specialty */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Specialty</h3>
                <div className="space-y-4">
                  {reportData.financial.revenueBySpecialty.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{item.specialty}</span>
                        <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#3570ff] h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{formatCurrency(item.revenue)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Usage Analytics Report */}
        {selectedReport === "usage" && (
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Daily Active Users</h4>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(reportData.usage.dailyActiveUsers)}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Weekly Active Users</h4>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(reportData.usage.weeklyActiveUsers)}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Monthly Active Users</h4>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(reportData.usage.monthlyActiveUsers)}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Avg Session Duration</h4>
                <p className="text-3xl font-bold text-gray-900">{reportData.usage.avgSessionDuration}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Peak Hours</h4>
                <p className="text-3xl font-bold text-gray-900">{reportData.usage.peakHours}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Most Used Feature</h4>
                <p className="text-xl font-bold text-gray-900">{reportData.usage.mostUsedFeature}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Patient Reports */}
        {selectedReport === "patients" && (
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            {console.log('Rendering Patient Reports section, selectedReport:', selectedReport)}
            {console.log('reportData.patientReports in render:', reportData.patientReports)}
            {/* Patient Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.patients.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Patients</p>
                    <p className="text-2xl font-bold text-green-600">{reportData.patients.filter(p => p.status === 'active').length}</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(reportData.patients.reduce((sum, p) => sum + p.totalSpent, 0))}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Consultations</p>
                    <p className="text-2xl font-bold text-gray-900">{calculateAverage(reportData.patients.reduce((sum, p) => sum + p.totalConsultations, 0), reportData.patients.length)}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Patient Reports Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Patient Reports</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.patientReports ? reportData.patientReports.length : 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Report Rating</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(reportData.patientReports && reportData.patientReports.length > 0) 
                        ? (reportData.patientReports.reduce((sum, r) => sum + r.rating, 0) / reportData.patientReports.length).toFixed(1)
                        : '0.0'
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                    <p className="text-2xl font-bold text-orange-600">{reportData.patientReports ? reportData.patientReports.filter(r => r.status !== 'resolved').length : 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-4">Report Types Distribution</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Positive Feedback</span>
                    <span className="text-sm font-medium text-green-600">
                      {reportData.patientReports ? reportData.patientReports.filter(r => r.reportType === 'Positive Feedback').length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Service Quality</span>
                    <span className="text-sm font-medium text-blue-600">
                      {reportData.patientReports ? reportData.patientReports.filter(r => r.reportType === 'Service Quality').length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Medical Concern</span>
                    <span className="text-sm font-medium text-red-600">
                      {reportData.patientReports ? reportData.patientReports.filter(r => r.reportType === 'Medical Concern').length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Communication Issue</span>
                    <span className="text-sm font-medium text-yellow-600">
                      {reportData.patientReports ? reportData.patientReports.filter(r => r.reportType === 'Communication Issue').length : 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-4">Rating Distribution</h4>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">{rating}</span>
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {reportData.patientReports ? reportData.patientReports.filter(r => r.rating === rating).length : 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-4">Status Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Resolved</span>
                    <span className="text-sm font-medium text-green-600">
                      {reportData.patientReports ? reportData.patientReports.filter(r => r.status === 'resolved').length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Under Review</span>
                    <span className="text-sm font-medium text-yellow-600">
                      {reportData.patientReports ? reportData.patientReports.filter(r => r.status === 'under_review').length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Investigating</span>
                    <span className="text-sm font-medium text-red-600">
                      {reportData.patientReports ? reportData.patientReports.filter(r => r.status === 'investigating').length : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Patient Details</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultations</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Favorite Specialty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.patients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-blue-600">
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                              <div className="text-sm text-gray-500">ID: {patient.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{patient.email}</div>
                          <div className="text-sm text-gray-500">{patient.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{patient.registeredDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{patient.totalConsultations}</div>
                          <div className="text-sm text-gray-500">Last: {patient.lastConsultation}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(patient.totalSpent)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{patient.favoriteSpecialty}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Patient Reports/Complaints */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Patient Reports & Feedback</h3>
                <p className="text-sm text-gray-600 mt-1">Patient feedback and reports about doctor consultations</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultation Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.patientReports && reportData.patientReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-blue-600">
                                {report.patientName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{report.patientName}</div>
                              <div className="text-sm text-gray-500">ID: {report.patientId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.doctorName}</div>
                            <div className="text-sm text-gray-500">{report.doctorSpecialty}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{report.consultationDate}</div>
                          <div className="text-sm text-gray-500">Reported: {report.reportDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < report.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-2 text-sm font-medium text-gray-900">{report.rating}/5</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.reportType === 'Positive Feedback' ? 'bg-green-100 text-green-800' :
                            report.reportType === 'Medical Concern' ? 'bg-red-100 text-red-800' :
                            report.reportType === 'Communication Issue' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {report.reportType}
                          </span>
                          {report.complaint && (
                            <div className="text-xs text-red-600 mt-1">⚠ {report.complaint}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate" title={report.comment}>
                            {report.comment}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            report.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                            report.status === 'investigating' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status.replace('_', ' ').charAt(0).toUpperCase() + report.status.replace('_', ' ').slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                              onClick={() => alert(`Viewing full report for ${report.patientName}`)}
                            >
                              View
                            </button>
                            {report.status !== 'resolved' && (
                              <button 
                                className="text-green-600 hover:text-green-900 text-sm font-medium"
                                onClick={() => alert(`Resolving report #${report.id}`)}
                              >
                                Resolve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Doctor Reports */}
        {selectedReport === "doctors" && (
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            {/* Doctor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.doctors.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(reportData.doctors.reduce((sum, d) => sum + d.totalEarnings, 0))}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(reportData.doctors && reportData.doctors.length > 0)
                        ? (reportData.doctors.reduce((sum, d) => sum + d.avgRating, 0) / reportData.doctors.length).toFixed(1)
                        : '0.0'
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.doctors.reduce((sum, d) => sum + d.totalPatients, 0)}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Doctor Performance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultations</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.doctors.map((doctor) => (
                      <tr key={doctor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-green-600">
                                {doctor.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                              <div className="text-sm text-gray-500">{doctor.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {doctor.specialty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doctor.joinedDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{doctor.totalConsultations}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(doctor.totalEarnings)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < Math.floor(doctor.avgRating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-2 text-sm text-gray-600">{doctor.avgRating}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doctor.totalPatients}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doctor.availableHours}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
