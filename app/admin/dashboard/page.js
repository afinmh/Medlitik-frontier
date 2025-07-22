"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 1250,
    newUsersToday: 38,
    userGrowthRate: 8.2,
    userRetentionRate: 85,
    activeUsers: 875,
    
    totalDoctors: 85,
    newDoctorsThisMonth: 12,
    doctorApplicationsPending: 8,
    topDoctorSpecialties: ['Cardiologist', 'Dermatologist', 'General Practice', 'Pediatrician'],
    doctorRating: 4.8,
    
    totalConsultations: 3420,
    activeConsultations: 24,
    avgConsultationTime: 24, // in minutes
    consultationCompletionRate: 92,
    
    monthlyRevenue: 125000000,
    monthlyGrowth: 12.5,
    topRevenueService: 'Video Consultation',
    revenueProjection: 150000000,
    
    customerSatisfaction: 4.7,
    platformUptime: 99.8,
    
    // AI Performance Stats
    aiAssistantUsage: 2340,
    aiAccuracyRate: 95.2,
    aiResponseTime: 0.3,
    aiSessionsToday: 185,
    totalRecoveryPrograms: 1420,
    activeRecoveryPrograms: 234,
    averageProgramDuration: 28, // days
    recoverySuccessRate: 94.5,
    warningSignsDetected: 42,
    warningSignsPrevented: 38
  });

  // Trend data for charts
  const [trends, setTrends] = useState({
    userGrowth: [820, 932, 1010, 1078, 1154, 1250],
    revenueData: [78000000, 82000000, 90000000, 102000000, 118000000, 125000000],
    consultationTrend: [2150, 2380, 2640, 2820, 3100, 3420],
    monthLabels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    doctorRatingTrend: [4.5, 4.6, 4.6, 4.7, 4.8, 4.8],
    userDemographics: [
      { age: '18-24', percentage: 28 },
      { age: '25-34', percentage: 35 },
      { age: '35-44', percentage: 22 },
      { age: '45-54', percentage: 10 },
      { age: '55+', percentage: 5 }
    ],
    topSpecialties: [
      { name: 'General Practice', count: 22 },
      { name: 'Cardiologist', count: 14 },
      { name: 'Dermatologist', count: 12 },
      { name: 'Pediatrician', count: 10 },
      { name: 'Psychiatrist', count: 8 }
    ],
    
    // AI Trends
    aiUsageTrend: [1850, 1920, 2010, 2150, 2280, 2340],
    aiAccuracyTrend: [93.2, 93.8, 94.1, 94.7, 95.0, 95.2],
    recoveryProgramTrend: [980, 1080, 1150, 1240, 1350, 1420],
    aiResponseTimeTrend: [0.4, 0.35, 0.32, 0.31, 0.3, 0.3],
    topAiFeatures: [
      { name: 'Recovery Plans', usage: 45 },
      { name: 'Warning Detection', usage: 28 },
      { name: 'Lifestyle Recommendations', usage: 18 },
      { name: 'Progress Monitoring', usage: 9 }
    ]
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'user_register', user: 'John Doe', time: '2 menit lalu', status: 'success' },
    { id: 2, type: 'consultation', user: 'Dr. Sarah Wilson', time: '5 menit lalu', status: 'ongoing' },
    { id: 3, type: 'payment', user: 'Jane Smith', time: '10 menit lalu', status: 'completed' },
    { id: 4, type: 'doctor_join', user: 'Dr. Michael Brown', time: '15 menit lalu', status: 'pending' },
    { id: 5, type: 'user_register', user: 'Ahmad Rahman', time: '25 menit lalu', status: 'success' },
    { id: 6, type: 'payment', user: 'Dina Wijaya', time: '32 menit lalu', status: 'completed' },
  ]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      localStorage.removeItem('user');
      router.push('/landing_page');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: just clear localStorage and redirect
      localStorage.removeItem('user');
      router.push('/landing_page');
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_register':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'consultation':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        );
      case 'doctor_join':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
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
              <Link href="/admin/dashboard" className="text-[#3570ff] font-medium">Dashboard</Link>
              <Link href="/admin/users" className="text-gray-600 hover:text-[#3570ff]">Users</Link>
              <Link href="/admin/doctors" className="text-gray-600 hover:text-[#3570ff]">Doctors</Link>
              <Link href="/admin/consultations" className="text-gray-600 hover:text-[#3570ff]">Consultations</Link>
              <Link href="/admin/ai" className="text-gray-600 hover:text-[#3570ff]">AI Monitoring</Link>
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
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang, Admin! 👋
          </h1>
          <p className="text-gray-600">
            Berikut adalah ringkasan aktivitas platform Medlitik hari ini.
          </p>
        </motion.div>

        {/* Key Performance Indicators */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* KPI Card: Users */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-medium text-gray-900">User Stats</p>
                <p className="text-sm text-gray-500">Overview of user growth</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-sm font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-sm font-semibold text-gray-900">{stats.activeUsers.toLocaleString()} <span className="text-xs text-green-600">({Math.round(stats.activeUsers/stats.totalUsers*100)}%)</span></p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">New Today</p>
                <p className="text-sm font-semibold text-green-600">+{stats.newUsersToday}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Retention Rate</p>
                <p className="text-sm font-semibold text-gray-900">{stats.userRetentionRate}%</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Monthly Growth</p>
                <p className="text-xs font-semibold text-green-600">+{stats.userGrowthRate}%</p>
              </div>
              <div className="mt-2 flex space-x-1">
                {trends.userGrowth.map((value, index) => (
                  <div 
                    key={index} 
                    className="flex-1 bg-blue-100 rounded-sm relative overflow-hidden"
                    style={{ height: '24px' }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500" 
                      style={{ 
                        height: `${(value / Math.max(...trends.userGrowth)) * 100}%`,
                      }}
                    ></div>
                    <div className="absolute bottom-0 w-full text-center text-xs font-medium text-blue-800">
                      {trends.monthLabels[index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* KPI Card: Doctors */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-medium text-gray-900">Doctor Stats</p>
                <p className="text-sm text-gray-500">Healthcare professionals</p>
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
                <p className="text-sm font-semibold text-gray-900">{stats.totalDoctors}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-sm font-semibold text-green-600">+{stats.newDoctorsThisMonth}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Pending Applications</p>
                <p className="text-sm font-semibold text-orange-500">{stats.doctorApplicationsPending}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Average Rating</p>
                <div className="flex items-center">
                  <p className="text-sm font-semibold text-gray-900 mr-1">{stats.doctorRating}</p>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500 mb-2">Top Specialties</p>
              <div className="space-y-2">
                {trends.topSpecialties.slice(0, 3).map((specialty, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="h-2 rounded-full bg-green-500" 
                      style={{ width: `${(specialty.count / trends.topSpecialties[0].count) * 100}%` }}
                    ></div>
                    <span className="ml-2 text-xs text-gray-600">{specialty.name} ({specialty.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* KPI Card: Consultations */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-medium text-gray-900">Consultation Stats</p>
                <p className="text-sm text-gray-500">Healthcare interactions</p>
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
                <p className="text-sm font-semibold text-gray-900">{stats.totalConsultations.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Active Now</p>
                <p className="text-sm font-semibold text-purple-600">{stats.activeConsultations}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-sm font-semibold text-gray-900">{stats.consultationCompletionRate}%</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Average Duration</p>
                <p className="text-sm font-semibold text-gray-900">{stats.avgConsultationTime} min</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Monthly Growth</p>
                <p className="text-xs font-semibold text-green-600">
                  +{Math.round((trends.consultationTrend[5] - trends.consultationTrend[4]) / trends.consultationTrend[4] * 100)}%
                </p>
              </div>
              <div className="mt-2 flex space-x-1">
                {trends.consultationTrend.map((value, index) => (
                  <div 
                    key={index} 
                    className="flex-1 bg-purple-100 rounded-sm relative overflow-hidden"
                    style={{ height: '24px' }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-purple-500" 
                      style={{ 
                        height: `${(value / Math.max(...trends.consultationTrend)) * 100}%`,
                      }}
                    ></div>
                    <div className="absolute bottom-0 w-full text-center text-xs font-medium text-purple-800">
                      {trends.monthLabels[index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* KPI Card: Revenue */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-medium text-gray-900">Revenue Stats</p>
                <p className="text-sm text-gray-500">Financial performance</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-sm font-semibold text-green-600">+{stats.monthlyGrowth}%</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Top Service</p>
                <p className="text-sm font-semibold text-gray-900">{stats.topRevenueService}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Next Month Projection</p>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(stats.revenueProjection)}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Revenue Trend</p>
                <p className="text-xs font-semibold text-green-600">Increasing</p>
              </div>
              <div className="mt-2 flex space-x-1">
                {trends.revenueData.map((value, index) => (
                  <div 
                    key={index} 
                    className="flex-1 bg-yellow-100 rounded-sm relative overflow-hidden"
                    style={{ height: '24px' }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-yellow-500" 
                      style={{ 
                        height: `${(value / Math.max(...trends.revenueData)) * 100}%`,
                      }}
                    ></div>
                    <div className="absolute bottom-0 w-full text-center text-xs font-medium text-yellow-800">
                      {trends.monthLabels[index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* AI Performance & Recovery Programs Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* AI Performance Metrics */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100"
            variants={fadeInLeft}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">AI Recovery Assistant Performance</h2>
                </div>
                <Link href="/admin/ai" className="text-sm text-[#3570ff] hover:text-[#2856b6] font-medium">
                  View Details
                </Link>
              </div>
            </div>
            <div className="p-6">
              {/* AI Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🤖</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.aiAccuracyRate}%</p>
                  <p className="text-xs text-gray-600">Accuracy Rate</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">⚡</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Fast</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.aiResponseTime}s</p>
                  <p className="text-xs text-gray-600">Response Time</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📈</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">High</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.recoverySuccessRate}%</p>
                  <p className="text-xs text-gray-600">Recovery Success</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">⚠️</span>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Alert</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.warningSignsDetected}</p>
                  <p className="text-xs text-gray-600">Warnings Detected</p>
                </div>
              </div>
              
              {/* AI Feature Usage */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">AI Feature Usage Distribution</h3>
                <div className="space-y-3">
                  {trends.topAiFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{feature.name}</span>
                          <span className="text-gray-900 font-medium">{feature.usage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                              index === 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                              index === 2 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              'bg-gradient-to-r from-orange-500 to-red-500'
                            }`}
                            style={{ width: `${feature.usage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recent AI Interactions */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Recent AI Interactions</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Recovery plan completed</p>
                        <p className="text-xs text-gray-500">Hypertension recovery program</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Warning sign detected</p>
                        <p className="text-xs text-gray-500">Elevated blood pressure alert sent</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">5 min ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Lifestyle recommendation sent</p>
                        <p className="text-xs text-gray-500">Custom diet plan generated</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">8 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recovery Programs Overview */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-100"
            variants={fadeInUp}
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recovery Programs</h2>
            </div>
            <div className="p-6">
              {/* Program Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-blue-800">{stats.totalRecoveryPrograms}</p>
                  <p className="text-xs text-blue-700">Total Programs</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-green-800">{stats.activeRecoveryPrograms}</p>
                  <p className="text-xs text-green-700">Active Now</p>
                </div>
              </div>
              
              {/* Program Duration */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Avg. Program Duration</p>
                  <p className="text-sm font-bold text-gray-900">{stats.averageProgramDuration} days</p>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                    style={{ width: `${(stats.averageProgramDuration/60)*100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Warning Signs Stats */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-600">Warning Signs (Today)</p>
                  <div className="text-right">
                    <p className="text-xs text-orange-600">{stats.warningSignsDetected} detected</p>
                    <p className="text-xs text-green-600">{stats.warningSignsPrevented} prevented</p>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-3 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-800">Detection Rate</span>
                    <span className="text-sm font-bold text-orange-900">
                      {Math.round((stats.warningSignsPrevented / stats.warningSignsDetected) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Recovery Trends */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-3">Recovery Success Trend</p>
                <div className="h-16 relative">
                  <div className="flex items-end justify-between h-full">
                    {[92, 93, 93.5, 94, 94.2, 94.5].map((value, index) => (
                      <div key={index} className="flex flex-col items-center w-6">
                        <div 
                          className="w-2 bg-gradient-to-t from-green-400 to-green-600 rounded-t"
                          style={{ height: `${((value - 90) / 10) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{trends.monthLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Data Insights & Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activities */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100"
            initial="initial"
            animate="animate"
            variants={fadeInLeft}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <Link href="/admin/activities" className="text-sm text-[#3570ff] hover:text-[#2856b6] font-medium">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.type === 'user_register' && 'Registered as new user'}
                        {activity.type === 'consultation' && 'Started consultation'}
                        {activity.type === 'payment' && 'Completed payment'}
                        {activity.type === 'doctor_join' && 'Applied as doctor'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === 'success' ? 'bg-green-100 text-green-800' :
                        activity.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        activity.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">Activity Summary</h3>
                  <div className="text-xs text-gray-500">Last 24 hours</div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-700 font-medium">New Users</p>
                    <p className="text-lg font-semibold text-blue-800">{stats.newUsersToday}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-700 font-medium">Consultations</p>
                    <p className="text-lg font-semibold text-green-800">124</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-xs text-yellow-700 font-medium">Payments</p>
                    <p className="text-lg font-semibold text-yellow-800">78</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-purple-700 font-medium">Doctor Apps</p>
                    <p className="text-lg font-semibold text-purple-800">{stats.doctorApplicationsPending}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Insights Panel */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-100"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Business Insights</h2>
            </div>
            <div className="p-6">
              {/* Customer Satisfaction */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
                  <div className="flex items-center">
                    <p className="text-sm font-bold text-gray-900">{stats.customerSatisfaction}</p>
                    <span className="ml-1">/5.0</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full" 
                    style={{ width: `${(stats.customerSatisfaction/5)*100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>1.0</span>
                  <span>5.0</span>
                </div>
              </div>
              
              {/* Platform Uptime */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Platform Uptime</p>
                  <p className="text-sm font-bold text-gray-900">{stats.platformUptime}%</p>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-500 rounded-full" 
                    style={{ width: `${stats.platformUptime}%` }}
                  ></div>
                </div>
              </div>
              
              {/* User Demographics */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-3">User Demographics</p>
                <div className="flex h-12">
                  {trends.userDemographics.map((item, index) => (
                    <div 
                      key={index}
                      className={`h-full ${
                        index === 0 ? 'bg-blue-500 rounded-l-lg' :
                        index === trends.userDemographics.length-1 ? 'bg-blue-900 rounded-r-lg' :
                        `bg-blue-${500 + (index * 100)}`
                      }`}
                      style={{ width: `${item.percentage}%` }}
                      title={`${item.age}: ${item.percentage}%`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  {trends.userDemographics.map((item, index) => (
                    <div key={index} className="text-gray-500">
                      <div className={`w-3 h-3 inline-block mr-1 bg-blue-${500 + (index * 100)}`}></div>
                      {item.age}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-600 mb-3">Quick Actions</p>
                <div className="space-y-3">
                  <Link 
                    href="/admin/reports/generate"
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Generate Report</span>
                  </Link>

                  <Link 
                    href="/admin/doctors/verify"
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Verify Doctors ({stats.doctorApplicationsPending})</span>
                  </Link>

                  <Link 
                    href="/admin/ai"
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">AI Monitoring & Control</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Advanced Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance & Trend Analysis */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-100"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
                <select className="text-sm border border-gray-300 rounded-md p-1">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              {/* Growth Indicators */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">User Growth</p>
                      <p className="text-xl font-bold text-gray-900">+{stats.userGrowthRate}%</p>
                    </div>
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">Compared to +6.8% last month</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Revenue Growth</p>
                      <p className="text-xl font-bold text-gray-900">+{stats.monthlyGrowth}%</p>
                    </div>
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">Compared to +10.2% last month</p>
                </div>
              </div>
              
              {/* Rating Trend */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-700">Doctor Rating Trend</p>
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-green-600 mr-1">↑ 0.1</span>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className="relative h-12">
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200"></div>
                  <div className="absolute bottom-6 left-0 w-full h-px bg-gray-200"></div>
                  <div className="flex items-end justify-between h-full relative">
                    {trends.doctorRatingTrend.map((value, index) => (
                      <div key={index} className="flex flex-col items-center w-8">
                        <div 
                          className="w-2 bg-blue-500 rounded-t"
                          style={{ height: `${(value - 4) * 24}px` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{trends.monthLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between w-full text-xs text-gray-400 mt-1">
                    <span>4.0</span>
                    <span>5.0</span>
                  </div>
                </div>
              </div>
              
              {/* Service Distribution */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Service Distribution</p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Video Consultation</span>
                      <span className="text-gray-800">56%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '56%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Chat Consultation</span>
                      <span className="text-gray-800">24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Home Visit</span>
                      <span className="text-gray-800">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Emergency Services</span>
                      <span className="text-gray-800">8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* System Status & Health */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-100"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">System Health & Monitoring</h2>
            </div>
            <div className="p-6">
              {/* Real-time Overview */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">System Status</p>
                      <p className="text-sm font-medium text-green-700">All Systems Operational</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Response Time</p>
                      <p className="text-sm font-medium text-green-700">248ms (Fast)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Resource Usage */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-4">Resource Usage</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Database</span>
                      <span className="text-xs text-gray-700">42% Used</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Storage</span>
                      <span className="text-xs text-yellow-700">85% Used</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Memory</span>
                      <span className="text-xs text-gray-700">56% Used</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '56%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Events */}
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700 mb-3">Recent System Events</p>
                <div className="space-y-2">
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <p className="text-xs text-gray-700">Database backup completed</p>
                    <p className="text-xs text-gray-500 ml-auto">30min ago</p>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <p className="text-xs text-gray-700">System update applied</p>
                    <p className="text-xs text-gray-500 ml-auto">2h ago</p>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    <p className="text-xs text-gray-700">Storage threshold warning</p>
                    <p className="text-xs text-gray-500 ml-auto">8h ago</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Link 
                  href="/admin/system/monitoring"
                  className="text-sm text-[#3570ff] hover:text-[#2856b6] font-medium"
                >
                  View detailed monitoring
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
