'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  HeartIcon,
  ClockIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

export default function UserDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeMetric, setActiveMetric] = useState('Tekanan Darah');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Jika session NextAuth tersedia (login Google), pakai session
    if (session && session.user) {
      setUser({
        firstName: session.user.first_name || session.user.name?.split(' ')[0] || '',
        lastName: session.user.last_name || session.user.name?.split(' ').slice(1).join(' ') || '',
        email: session.user.email,
        role: session.user.role,
        id: session.user.id,
        image: session.user.image
      });
      setIsLoading(false);
      return;
    }
    // Jika tidak ada session, fallback ke localStorage (login manual)
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, [session]);

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

  // Health stats
  const healthStats = [
    {
      title: 'Konsultasi Bulan Ini',
      value: '3',
      icon: ChatBubbleLeftRightIcon,
      color: 'blue',
      change: '+20%',
      trend: 'up',
      description: 'Dari bulan sebelumnya'
    },
    {
      title: 'Appointment Mendatang',
      value: '2',
      icon: CalendarDaysIcon,
      color: 'green',
      change: '0%',
      trend: 'neutral',
      description: 'Sama dengan bulan lalu'
    },
    {
      title: 'Rekam Medis',
      value: '12',
      icon: DocumentTextIcon,
      color: 'purple',
      change: '+2',
      trend: 'up',
      description: 'Item terbaru ditambahkan'
    },
    {
      title: 'Health Score',
      value: '85%',
      icon: HeartIcon,
      color: 'red',
      change: '+5%',
      trend: 'up',
      description: 'Meningkat sejak cek terakhir'
    }
  ];
  
  // Notifications
  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Pengingat Janji Dokter',
      message: 'Janji dengan Dr. Sarah Wijaya besok pukul 10:00',
      time: '1 jam yang lalu',
      read: false
    },
    {
      id: 2,
      type: 'message',
      title: 'Pesan Baru',
      message: 'Dr. Ahmad Ridwan mengirim pesan terkait hasil pemeriksaan Anda',
      time: '3 jam yang lalu',
      read: false
    },
    {
      id: 3,
      type: 'result',
      title: 'Hasil Laboratorium',
      message: 'Hasil cek darah Anda telah tersedia',
      time: '1 hari yang lalu',
      read: true
    }
  ];
  
  // Health metrics
  const healthMetrics = [
    { 
      name: 'Tekanan Darah', 
      value: '120/80', 
      status: 'normal',
      lastChecked: '2 hari yang lalu',
      history: [110, 115, 120, 118, 120]
    },
    { 
      name: 'Detak Jantung', 
      value: '72 bpm', 
      status: 'normal',
      lastChecked: '2 hari yang lalu',
      history: [68, 72, 75, 70, 72]
    },
    { 
      name: 'Gula Darah', 
      value: '95 mg/dL', 
      status: 'normal',
      lastChecked: '1 minggu yang lalu',
      history: [92, 98, 100, 97, 95]
    },
    { 
      name: 'Indeks Masa Tubuh (BMI)', 
      value: '23.4', 
      status: 'normal',
      lastChecked: '2 minggu yang lalu',
      history: [24.1, 23.9, 23.7, 23.5, 23.4]
    }
  ];

  // Upcoming appointments
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Wijaya',
      specialty: 'Dokter Umum',
      date: '22 Juli 2025',
      time: '10:00',
      duration: '30 menit',
      type: 'Konsultasi Online',
      status: 'upcoming',
      location: 'Video Call - Medlitik App',
      reason: 'Konsultasi Umum',
      notes: 'Persiapkan pertanyaan tentang hasil lab terakhir',
      joinUrl: '#',
      imageUrl: '/api/placeholder/50/50'
    },
    {
      id: 2,
      doctor: 'Dr. Ahmad Ridwan',
      specialty: 'Spesialis Jantung',
      date: '25 Juli 2025',
      time: '14:30',
      duration: '45 menit',
      type: 'Klinik',
      status: 'upcoming',
      location: 'RS Medlitik - Lantai 3, Ruang 302',
      reason: 'Pemeriksaan Rutin',
      notes: 'Bawa kartu pasien dan hasil EKG terakhir',
      mapUrl: '#',
      imageUrl: '/api/placeholder/50/50'
    }
  ];
  
  // Recent medical activities
  const recentActivities = [
    {
      id: 1,
      type: 'consultation',
      title: 'Konsultasi dengan Dr. Maya Sari',
      date: '15 Juli 2025',
      description: 'Konsultasi dermatologi terkait kondisi kulit',
      result: 'Resep telah diberikan',
      status: 'completed'
    },
    {
      id: 2,
      type: 'lab',
      title: 'Tes Darah Rutin',
      date: '10 Juli 2025',
      description: 'Pemeriksaan darah lengkap',
      result: 'Hasil normal',
      status: 'completed'
    },
    {
      id: 3,
      type: 'prescription',
      title: 'Pengambilan Obat',
      date: '10 Juli 2025',
      description: 'Obat untuk kondisi kulit',
      result: 'Telah diambil',
      status: 'completed'
    }
  ];

  // Recommended doctors
  const recommendedDoctors = [
    {
      id: 1,
      name: 'Dr. Maya Sari',
      specialty: 'Dokter Kulit',
      rating: 4.9,
      experience: '8 tahun',
      price: 'Rp 150,000',
      avatar: '/api/placeholder/40/40',
      hospital: 'RS Medlitik Pusat',
      availability: 'Tersedia hari ini',
      nextAvailable: '16:00 - 18:00',
      education: 'Universitas Indonesia',
      patientCount: '500+',
      reviews: 86,
      badges: ['Top Rated', 'Cepat Respons'],
      languages: ['Indonesia', 'English']
    },
    {
      id: 2,
      name: 'Dr. Budi Hartono',
      specialty: 'Dokter Mata',
      rating: 4.8,
      experience: '12 tahun',
      price: 'Rp 200,000',
      avatar: '/api/placeholder/40/40',
      hospital: 'RS Medlitik Selatan',
      availability: 'Tersedia besok',
      nextAvailable: '09:00 - 12:00',
      education: 'Universitas Gadjah Mada',
      patientCount: '1,200+',
      reviews: 124,
      badges: ['Berpengalaman'],
      languages: ['Indonesia', 'English', '中文']
    },
    {
      id: 3,
      name: 'Dr. Lisa Chen',
      specialty: 'Psikolog',
      rating: 4.9,
      experience: '6 tahun',
      price: 'Rp 250,000',
      avatar: '/api/placeholder/40/40',
      hospital: 'Klinik Kesehatan Mental Medlitik',
      availability: 'Tersedia hari ini',
      nextAvailable: '13:00 - 15:00',
      education: 'National University of Singapore',
      patientCount: '300+',
      reviews: 62,
      badges: ['Highly Recommended'],
      languages: ['Indonesia', 'English', '中文']
    }
  ];
  
  // Specialization categories for filtering
  const specializations = [
    'Semua',
    'Dokter Umum',
    'Dokter Gigi',
    'Dokter Kulit',
    'Dokter Mata',
    'Psikolog',
    'Spesialis Jantung',
    'Spesialis Anak',
    'Spesialis Penyakit Dalam'
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: 30 },
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
  
  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };
  
  const pulseAnimation = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
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
                Medlitik <span className="text-[#00a8cc]">Health</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className={`p-2 rounded-full ${showNotifications ? 'bg-blue-50 text-[#00a8cc]' : 'text-gray-400 hover:text-gray-600'} relative`}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <BellIcon className="h-6 w-6" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">Notifikasi</h3>
                      <button className="text-sm text-[#00a8cc] hover:underline">
                        Tandai semua dibaca
                      </button>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex items-start">
                              <div className={`p-2 rounded-full mr-3 ${
                                notification.type === 'appointment' ? 'bg-green-100 text-green-600' :
                                notification.type === 'message' ? 'bg-blue-100 text-blue-600' :
                                'bg-yellow-100 text-yellow-600'
                              }`}>
                                {notification.type === 'appointment' && <CalendarDaysIcon className="h-5 w-5" />}
                                {notification.type === 'message' && <ChatBubbleLeftRightIcon className="h-5 w-5" />}
                                {notification.type === 'result' && <DocumentTextIcon className="h-5 w-5" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                              </div>
                              {!notification.read && (
                                <span className="h-2 w-2 bg-[#00a8cc] rounded-full"></span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          Tidak ada notifikasi baru
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button className="text-sm text-[#00a8cc] hover:underline">
                        Lihat semua notifikasi
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-[#00a8cc] to-[#0095b8] rounded-full flex items-center justify-center text-white font-medium">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-[#00a8cc]">Pasien</p>
                  </div>
                </div>
                
                <button className="p-2 text-gray-400 hover:text-[#00a8cc] rounded-full hover:bg-blue-50">
                  <Cog6ToothIcon className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
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
          <h2 className="text-3xl font-bold text-[#1a2a3a] mb-2">
            Selamat Datang, {user?.firstName}!
          </h2>
          <p className="text-gray-600">
            Kelola kesehatan Anda dengan mudah dan terhubung dengan dokter terbaik.
          </p>
        </motion.div>

        {/* Advanced Search & Promo */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="bg-gradient-to-r from-[#00a8cc] to-[#0095b8] rounded-xl p-6 text-white overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#pattern)" />
              </svg>
              <defs>
                <pattern id="pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="white" />
                </pattern>
              </defs>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">Temukan Pelayanan Kesehatan</h3>
                  <p className="text-blue-100 mt-1">Akses dokter terbaik dan layanan medis kapanpun Anda butuhkan</p>
                </div>
                <motion.div 
                  className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
                  animate={pulseAnimation}
                >
                  Promo Hari Ini
                </motion.div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                    <label className="block text-gray-700 text-xs font-medium mb-2">Jenis Layanan</label>
                    <div className="relative">
                      <select className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]">
                        <option>Semua Layanan</option>
                        <option>Konsultasi Online</option>
                        <option>Kunjungan Klinik</option>
                        <option>Rumah Sakit</option>
                        <option>Tes Lab</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                    <label className="block text-gray-700 text-xs font-medium mb-2">Spesialisasi</label>
                    <div className="relative">
                      <select className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]">
                        <option>Semua Spesialisasi</option>
                        <option>Dokter Umum</option>
                        <option>Dokter Anak</option>
                        <option>Dokter Kulit</option>
                        <option>Dokter Mata</option>
                        <option>Dokter Jantung</option>
                        <option>Dokter Gigi</option>
                        <option>Psikolog</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/3 px-2">
                    <label className="block text-gray-700 text-xs font-medium mb-2">Cari</label>
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Dokter, gejala, atau penyakit..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input id="today" type="checkbox" className="h-4 w-4 text-[#00a8cc] border-gray-300 rounded focus:ring-[#00a8cc]" />
                      <label htmlFor="today" className="ml-2 text-xs text-gray-700">Tersedia Hari Ini</label>
                    </div>
                    <div className="flex items-center">
                      <input id="topRated" type="checkbox" className="h-4 w-4 text-[#00a8cc] border-gray-300 rounded focus:ring-[#00a8cc]" />
                      <label htmlFor="topRated" className="ml-2 text-xs text-gray-700">Rating 4.5+</label>
                    </div>
                  </div>
                  <button className="bg-[#00a8cc] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0095b8] transition-colors">
                    Cari Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {healthStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  'bg-red-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-red-600'
                  }`} />
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-2xl font-bold text-[#1a2a3a]">
                  {stat.value}
                </p>
              </div>
              
              <div className="flex items-center text-xs">
                {stat.trend === 'up' && (
                  <span className="flex items-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                      <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                    </svg>
                    {stat.change}
                  </span>
                )}
                {stat.trend === 'down' && (
                  <span className="flex items-center text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                      <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                    </svg>
                    {stat.change}
                  </span>
                )}
                {stat.trend === 'neutral' && (
                  <span className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                      <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                    </svg>
                    {stat.change}
                  </span>
                )}
                <span className="ml-1 text-gray-500">{stat.description}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Health Metrics Dashboard */}
        <motion.div
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#1a2a3a]">
                Health Dashboard
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Pantau metrik kesehatan Anda
              </p>
            </div>
            
            <div className="p-6">
              <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                {healthMetrics.map((metric, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                      activeMetric === metric.name
                        ? 'bg-[#00a8cc] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveMetric(metric.name)}
                  >
                    {metric.name}
                  </button>
                ))}
              </div>
              
              {healthMetrics.map((metric) => {
                if (activeMetric !== metric.name) return null;
                
                return (
                  <motion.div 
                    key={metric.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-3xl font-bold text-[#1a2a3a]">
                          {metric.value}
                        </p>
                        <p className="text-sm text-gray-500">
                          Terakhir diperbarui: {metric.lastChecked}
                        </p>
                      </div>
                      <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {metric.status === 'normal' ? 'Normal' : 
                         metric.status === 'warning' ? 'Perhatian' :
                         metric.status === 'critical' ? 'Kritis' : ''}
                      </div>
                    </div>
                    
                    <div className="h-40 bg-gray-50 rounded-lg p-4 flex items-end">
                      {/* Simple chart visualization */}
                      {metric.history.map((value, i) => (
                        <div 
                          key={i} 
                          className="flex-1 mx-1"
                          style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                          }}
                        >
                          <div 
                            className="w-full bg-[#00a8cc] rounded-t-md"
                            style={{ 
                              height: `${(value / Math.max(...metric.history)) * 100}px`,
                              opacity: i === metric.history.length - 1 ? 1 : 0.7
                            }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-2">{value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>5 pemeriksaan terakhir</span>
                      <button className="text-[#00a8cc] hover:underline">
                        Lihat riwayat lengkap
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointments and Activities */}
          <motion.div 
            className="lg:col-span-2"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <button 
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'upcoming' 
                        ? 'bg-[#00a8cc] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    Appointment
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'history' 
                        ? 'bg-[#00a8cc] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('history')}
                  >
                    Riwayat Medis
                  </button>
                </div>
              </div>
              
              {activeTab === 'upcoming' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <motion.div 
                        key={appointment.id}
                        className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="h-14 w-14 bg-gradient-to-br from-[#00a8cc] to-[#0095b8] rounded-xl flex items-center justify-center text-white">
                                {appointment.type === 'Konsultasi Online' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h4 className="text-sm font-semibold text-[#1a2a3a]">
                                  {appointment.doctor}
                                </h4>
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Terjadwal
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-0.5">
                                {appointment.specialty}
                              </p>
                              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <CalendarDaysIcon className="h-4 w-4 mr-1 text-gray-400" />
                                  {appointment.date}
                                </div>
                                <div className="flex items-center">
                                  <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
                                  {appointment.time} ({appointment.duration})
                                </div>
                                <div className="flex items-center">
                                  {appointment.type === 'Konsultasi Online' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                  {appointment.location}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                          <p className="text-xs text-gray-500">Alasan: {appointment.reason}</p>
                          <div className="flex space-x-2">
                            {appointment.type === 'Konsultasi Online' ? (
                              <button className="px-3 py-1 bg-[#00a8cc] text-white text-sm rounded-lg hover:bg-[#0095b8] transition-colors">
                                Gabung Video Call
                              </button>
                            ) : (
                              <button className="px-3 py-1 bg-[#00a8cc] text-white text-sm rounded-lg hover:bg-[#0095b8] transition-colors">
                                Lihat Lokasi
                              </button>
                            )}
                            <button className="px-3 py-1 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-100 transition-colors">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button 
                    className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#00a8cc] hover:text-[#00a8cc] transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Buat Appointment Baru</span>
                  </motion.button>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="p-6">
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div className="space-y-6 pl-10">
                      {recentActivities.map((activity) => (
                        <motion.div 
                          key={activity.id}
                          className="relative"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Timeline dot */}
                          <div className={`absolute -left-10 p-1 rounded-full ${
                            activity.type === 'consultation' ? 'bg-blue-100' :
                            activity.type === 'lab' ? 'bg-purple-100' :
                            'bg-green-100'
                          }`}>
                            <div className={`h-5 w-5 rounded-full ${
                              activity.type === 'consultation' ? 'bg-blue-500' :
                              activity.type === 'lab' ? 'bg-purple-500' :
                              'bg-green-500'
                            }`}></div>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-[#1a2a3a]">{activity.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                                activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {activity.status === 'completed' ? 'Selesai' :
                                 activity.status === 'pending' ? 'Pending' :
                                 'Dibatalkan'}
                              </span>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                              <div className="text-sm text-gray-500">{activity.date}</div>
                              <div className="text-sm text-gray-700 font-medium">{activity.result}</div>
                            </div>
                            
                            <div className="mt-3 flex space-x-2">
                              <button className="px-3 py-1 border border-[#00a8cc] text-[#00a8cc] text-sm rounded-lg hover:bg-blue-50 transition-colors">
                                Lihat Detail
                              </button>
                              <button className="px-3 py-1 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-100 transition-colors">
                                Download
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button className="px-4 py-2 text-sm font-medium text-[#00a8cc] hover:underline">
                      Tampilkan lebih banyak
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="space-y-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2a3a]">
                  Aksi Cepat
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Akses layanan dengan mudah
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 p-6">
                <motion.button 
                  className="flex flex-col items-center justify-center p-5 bg-gradient-to-r from-[#00a8cc] to-[#0095b8] text-white rounded-xl hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/user/appointment')}
                >
                  <CalendarDaysIcon className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Appointment</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center justify-center p-5 bg-white border border-[#00a8cc] text-[#00a8cc] rounded-xl hover:bg-blue-50 hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/user/consultation')}
                >
                  <ChatBubbleLeftRightIcon className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Konsultasi</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center justify-center p-5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/user/medical-records')}
                >
                  <DocumentTextIcon className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Rekam Medis</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center justify-center p-5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/user/health-tracker')}
                >
                  <HeartIcon className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Health Tracker</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center justify-center p-5 col-span-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/user/ai-health')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span className="text-sm font-medium">AI Health Assistant</span>
                </motion.button>
              </div>
            </div>

            {/* Recommended Doctors
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1a2a3a]">
                    Dokter Rekomendasi
                  </h3>
                  <button className="text-sm text-[#00a8cc] hover:underline">
                    Lihat Semua
                  </button>
                </div>
                
                <div className="mt-3 mb-2">
                  <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                    {specializations.map((specialty, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSpecialty(specialty)}
                        className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                          selectedSpecialty === specialty
                            ? 'bg-[#00a8cc] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="relative mb-4">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari dokter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a8cc] focus:border-[#00a8cc]"
                  />
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {recommendedDoctors.map((doctor) => (
                    <motion.div 
                      key={doctor.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <UserIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="text-sm font-semibold text-[#1a2a3a]">
                              {doctor.name}
                            </h4>
                            {doctor.badges.length > 0 && (
                              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {doctor.badges[0]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            {doctor.specialty} • {doctor.experience}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-3 text-xs">
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 font-medium text-gray-700">{doctor.rating}</span>
                          <span className="ml-1 text-gray-500">({doctor.reviews})</span>
                        </div>
                        <div className="font-medium text-[#00a8cc]">{doctor.price}</div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                          <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                        </svg>
                        {doctor.hospital}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs">
                          <span className="text-green-600 font-medium">{doctor.availability}</span>
                        </div>
                        <button className="px-3 py-1 bg-[#00a8cc] text-white text-xs font-medium rounded-lg hover:bg-[#0095b8] transition-colors">
                          Jadwalkan
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div> */}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
