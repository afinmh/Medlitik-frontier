'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  CalendarDaysIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      localStorage.removeItem('user');
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: just clear localStorage and redirect
      localStorage.removeItem('user');
      router.push('/auth/login');
    }
  };

  // Enhanced stats data with more comprehensive metrics
  const stats = [
    {
      title: 'Total Pasien',
      value: '156',
      change: '+12%',
      trend: 'up',
      description: 'Dibandingkan bulan lalu',
      icon: UserGroupIcon,
      color: 'blue'
    },
    {
      title: 'Konsultasi Hari Ini',
      value: '8',
      change: '+3',
      trend: 'up',
      description: 'Dari rata-rata harian',
      icon: CalendarDaysIcon,
      color: 'green'
    },
    {
      title: 'Pendapatan Bulan Ini',
      value: 'Rp 15.2M',
      change: '+8%',
      trend: 'up',
      description: 'Dibandingkan bulan lalu',
      icon: CurrencyDollarIcon,
      color: 'yellow'
    },
    {
      title: 'Rating Kepuasan',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      description: '97% pasien puas',
      icon: StarIcon,
      color: 'purple'
    }
  ];
  
  // Performance metrics - additional data
  const performanceMetrics = {
    consultationCompletionRate: 98,
    responseTimeAverage: 15, // in minutes
    patientRetentionRate: 85, // percentage
    reviewCount: 124,
    monthlySummary: {
      totalConsultations: 142,
      completedConsultations: 138,
      cancelledConsultations: 4,
      noShowRate: 2
    },
    consultationTrend: [15, 18, 22, 19, 24, 28, 26]
  };
  
  // Patient demographics
  const patientDemographics = {
    ageDistribution: [
      { group: '0-18', percentage: 25 },
      { group: '19-35', percentage: 30 },
      { group: '36-50', percentage: 28 },
      { group: '51-65', percentage: 12 },
      { group: '65+', percentage: 5 }
    ],
    topConditions: [
      { name: 'Hipertensi', count: 32 },
      { name: 'Diabetes', count: 28 },
      { name: 'ISPA', count: 24 },
      { name: 'Dermatitis', count: 18 },
      { name: 'Gastritis', count: 16 }
    ],
    genderDistribution: {
      male: 46,
      female: 54
    }
  };

  // Enhanced appointments with more detailed information
  const appointments = [
    {
      id: 1,
      patient: 'Ahmad Rizki',
      patientId: 'P-23451',
      age: 45,
      gender: 'Pria',
      time: '09:00',
      duration: '30 min',
      type: 'Konsultasi Rutin',
      condition: 'Hipertensi',
      lastVisit: '15 Jun 2025',
      status: 'upcoming',
      notes: 'Kontrol tekanan darah dan evaluasi pengobatan',
      insurance: 'BPJS Kesehatan'
    },
    {
      id: 2,
      patient: 'Siti Nurhaliza',
      patientId: 'P-23562',
      age: 32,
      gender: 'Wanita',
      time: '10:30',
      duration: '30 min',
      type: 'Follow-up',
      condition: 'Post Operasi',
      lastVisit: '02 Jul 2025',
      status: 'upcoming',
      notes: 'Evaluasi pemulihan pasca operasi appendix',
      insurance: 'Mandiri Inhealth'
    },
    {
      id: 3,
      patient: 'Budi Santoso',
      patientId: 'P-24001',
      age: 28,
      gender: 'Pria',
      time: '11:00',
      duration: '45 min',
      type: 'Konsultasi Baru',
      condition: 'Nyeri Dada',
      lastVisit: 'Pasien Baru',
      status: 'upcoming',
      notes: 'Keluhan nyeri dada selama 2 minggu',
      insurance: 'Prudential'
    },
    {
      id: 4,
      patient: 'Maya Putri',
      patientId: 'P-22478',
      age: 40,
      gender: 'Wanita',
      time: '14:00',
      duration: '20 min',
      type: 'Telehealth',
      condition: 'Dermatitis',
      lastVisit: '22 Jun 2025',
      status: 'upcoming',
      notes: 'Follow up pengobatan dermatitis',
      insurance: 'Asuransi Sinarmas'
    }
  ];
  
  // Upcoming tasks and reminders
  const tasks = [
    {
      id: 1,
      title: 'Lengkapi rekam medis Tn. Adi',
      priority: 'high',
      due: 'Hari ini'
    },
    {
      id: 2,
      title: 'Review hasil laboratorium Ny. Diana',
      priority: 'medium',
      due: 'Besok'
    },
    {
      id: 3,
      title: 'Perpanjang sertifikasi dokter',
      priority: 'high',
      due: '25 Jul'
    },
    {
      id: 4,
      title: 'Jadwal seminar kesehatan',
      priority: 'low',
      due: '30 Jul'
    }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a8cc] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#1a2a3a]">
                Medlitik <span className="text-[#00a8cc]">Doctor</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Dr. {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">Dokter</p>
                  </div>
                </div>
                
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Cog6ToothIcon className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
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
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2a3a] mb-2">
                Selamat Datang, Dr. {user?.firstName}!
              </h2>
              <p className="text-gray-600">
                Berikut adalah ringkasan aktivitas praktik Anda hari ini.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
              <ClockIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-purple-100'
                }`}>
                  <stat.icon className={`h-5 w-5 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    'text-purple-600'
                  }`} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a2a3a] mb-1">
                  {stat.value}
                </p>
                <div className="flex items-center">
                  {stat.trend === 'up' ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                  <p className={`text-sm ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Performance Summary */}
        <motion.div
          className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1a2a3a]">
              Ringkasan Performa Profesional
            </h3>
            <div className="mt-2 md:mt-0">
              <select className="text-sm border border-gray-300 rounded-md p-1">
                <option>30 Hari Terakhir</option>
                <option>3 Bulan Terakhir</option>
                <option>6 Bulan Terakhir</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Tingkat Penyelesaian Konsultasi</p>
                  <p className="text-sm font-medium text-gray-900">{performanceMetrics.consultationCompletionRate}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{width: `${performanceMetrics.consultationCompletionRate}%`}}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Retensi Pasien</p>
                  <p className="text-sm font-medium text-gray-900">{performanceMetrics.patientRetentionRate}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{width: `${performanceMetrics.patientRetentionRate}%`}}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Rata-rata Waktu Respon</p>
                  <p className="text-sm font-medium text-gray-900">{performanceMetrics.responseTimeAverage} menit</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{width: `${100 - (performanceMetrics.responseTimeAverage / 30 * 100)}%`}}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Ringkasan Konsultasi Bulan Ini</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Total Konsultasi</p>
                  <p className="text-xs font-medium text-gray-800">{performanceMetrics.monthlySummary.totalConsultations}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Konsultasi Selesai</p>
                  <p className="text-xs font-medium text-green-600">{performanceMetrics.monthlySummary.completedConsultations}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Konsultasi Dibatalkan</p>
                  <p className="text-xs font-medium text-red-600">{performanceMetrics.monthlySummary.cancelledConsultations}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Tingkat No-Show</p>
                  <p className="text-xs font-medium text-gray-800">{performanceMetrics.monthlySummary.noShowRate}%</p>
                </div>
                
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-medium text-gray-700">Ulasan Pasien</p>
                    <div className="flex items-center">
                      <StarIcon className="h-3 w-3 text-yellow-400" />
                      <p className="text-xs font-medium text-gray-700 ml-1">{stats[3].value} ({performanceMetrics.reviewCount})</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tren Konsultasi 7 Hari Terakhir</h4>
              <div className="flex items-end h-32 space-x-1">
                {performanceMetrics.consultationTrend.map((count, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t-sm"
                      style={{ height: `${(count / Math.max(...performanceMetrics.consultationTrend)) * 100}%` }}
                    ></div>
                    <p className="text-xs text-gray-500 mt-1">{['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][index]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Appointments */}
          <motion.div 
            className="lg:col-span-2"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="h-5 w-5 text-[#00a8cc]" />
                    <h3 className="text-lg font-semibold text-[#1a2a3a]">
                      Jadwal Konsultasi Hari Ini
                    </h3>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {appointments.length} Pasien
                    </span>
                    <button className="text-[#00a8cc] hover:text-[#008ba6] text-sm font-medium">
                      Lihat Semua
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-[#00a8cc] text-white text-sm rounded-md">
                      Semua
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200">
                      Terjadwal
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200">
                      Selesai
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200">
                      Dibatalkan
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="p-4 bg-white">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-[#00a8cc] rounded-full flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#1a2a3a]">
                                {appointment.patient}
                              </p>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>{appointment.patientId}</span>
                                <span>•</span>
                                <span>{appointment.age} Tahun</span>
                                <span>•</span>
                                <span>{appointment.gender}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-[#1a2a3a]">
                              {appointment.time}
                            </p>
                            <p className="text-xs text-gray-600">{appointment.duration}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs text-gray-500">Tipe Konsultasi</p>
                            <p className="text-sm font-medium text-gray-900">{appointment.type}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs text-gray-500">Kondisi</p>
                            <p className="text-sm font-medium text-gray-900">{appointment.condition}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs text-gray-500">Kunjungan Terakhir</p>
                            <p className="text-sm font-medium text-gray-900">{appointment.lastVisit}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                            {appointment.insurance}
                          </p>
                          <div className="flex space-x-2">
                            <button className="px-2 py-1 bg-[#00a8cc] text-white text-xs rounded hover:bg-[#008ba6]">
                              Mulai Konsultasi
                            </button>
                            <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                              Lihat Rekam Medis
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 px-4 py-2 border-t border-blue-100">
                        <p className="text-xs text-blue-700">
                          <span className="font-medium">Catatan:</span> {appointment.notes}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Patient Demographics */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#1a2a3a] mb-4">
                Demografi Pasien
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Distribusi Usia</h4>
                  <div className="space-y-2">
                    {patientDemographics.ageDistribution.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{item.group} tahun</span>
                          <span className="text-gray-800">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{width: `${item.percentage}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Kondisi Teratas</h4>
                  <div className="space-y-2">
                    {patientDemographics.topConditions.map((condition, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{condition.name}</span>
                          <span className="text-gray-800">{condition.count} pasien</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{width: `${(condition.count / Math.max(...patientDemographics.topConditions.map(c => c.count))) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar with Quick Actions, Tasks & Notifications */}
          <motion.div 
            className="space-y-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {/* Professional Status */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm border border-blue-100 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center border-2 border-[#00a8cc]">
                  <UserIcon className="h-6 w-6 text-[#00a8cc]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2a3a]">
                    Dr. {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">Dokter Spesialis</p>
                </div>
              </div>
              
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-600">Status Praktik</span>
                <span className="text-green-600 font-medium">Aktif</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Jadwal Praktik</span>
                  <span className="text-gray-700">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Konsultasi Tersisa</span>
                  <span className="text-gray-700">12 dari 20</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1a2a3a]">
                    Aksi Cepat
                  </h3>
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    Atur ulang
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                    <CalendarDaysIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium text-center">Jadwal Konsultasi</span>
                  </button>
                  
                  <button className="flex flex-col items-center justify-center p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium text-center">Pesan Pasien</span>
                  </button>
                  
                  <button className="flex flex-col items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
                    <DocumentTextIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium text-center">Rekam Medis</span>
                  </button>
                  
                  <button className="flex flex-col items-center justify-center p-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg transition-colors">
                    <ChartBarIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium text-center">Laporan</span>
                  </button>
                </div>
                
                <button className="mt-3 w-full flex items-center justify-center space-x-2 p-2 text-[#00a8cc] border border-[#00a8cc] rounded-lg hover:bg-blue-50 transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm">Resep Digital</span>
                </button>
              </div>
            </div>

            {/* Tasks & Reminders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1a2a3a]">
                    Tugas & Pengingat
                  </h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tasks.length} Tugas
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div 
                      key={task.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg border-l-4 border-l-gray-400 hover:bg-gray-100 transition-colors"
                      style={{
                        borderLeftColor: task.priority === 'high' ? '#ef4444' : 
                                        task.priority === 'medium' ? '#f59e0b' : '#6b7280'
                      }}
                    >
                      <input type="checkbox" className="h-4 w-4 text-[#00a8cc] rounded" />
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-700">{task.title}</p>
                        <p className="text-xs text-gray-500">Deadline: {task.due}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.priority === 'high' ? 'Tinggi' : 
                         task.priority === 'medium' ? 'Sedang' : 'Rendah'}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full p-2 text-sm text-center text-[#00a8cc] hover:underline">
                  Lihat semua tugas
                </button>
              </div>
            </div>

            {/* Recent Activities & Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1a2a3a]">
                    Aktivitas & Notifikasi
                  </h3>
                  <button className="text-xs text-[#00a8cc]">
                    Tandai semua sudah dibaca
                  </button>
                </div>
              </div>
              
              <div className="max-h-80 overflow-auto">
                <div className="p-4 space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Konsultasi dengan Ahmad Rizki selesai
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        5 menit yang lalu
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Resep untuk Siti Nurhaliza dikirim
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        20 menit yang lalu
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        3 pesan baru dari pasien
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        45 menit yang lalu
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Pengingat jadwal rapat tim medis
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        2 jam yang lalu
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <button className="w-full p-2 text-sm text-center text-[#00a8cc] hover:underline">
                  Lihat semua notifikasi
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
