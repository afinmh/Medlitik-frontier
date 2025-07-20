'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  VideoCameraIcon,
  BuildingOfficeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function AppointmentPage() {
  const router = useRouter();
  const [selectedConsultationType, setSelectedConsultationType] = useState('online');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const specialties = [
    'Dokter Umum',
    'Dokter Anak',
    'Dokter Kulit',
    'Dokter Mata',
    'Dokter Jantung',
    'Dokter Gigi',
    'Psikolog',
    'Spesialis Penyakit Dalam'
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Wijaya',
      specialty: 'Dokter Umum',
      rating: 4.9,
      experience: '8 tahun',
      price: 150000,
      avatar: '/api/placeholder/60/60',
      hospital: 'RS Medlitik Pusat',
      availability: 'Tersedia hari ini',
      onlineConsultation: true,
      offlineConsultation: true,
      timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      reviews: 186,
      badges: ['Top Rated', 'Cepat Respons'],
      languages: ['Indonesia', 'English'],
      education: 'Universitas Indonesia',
      about: 'Dokter berpengalaman dengan spesialisasi dalam pelayanan kesehatan umum dan preventif.',
      nextAvailable: '09:00'
    },
    {
      id: 2,
      name: 'Dr. Budi Hartono',
      specialty: 'Dokter Mata',
      rating: 4.8,
      experience: '12 tahun',
      price: 200000,
      avatar: '/api/placeholder/60/60',
      hospital: 'RS Medlitik Selatan',
      availability: 'Tersedia besok',
      onlineConsultation: true,
      offlineConsultation: true,
      timeSlots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
      reviews: 224,
      badges: ['Berpengalaman', 'Ahli Mata'],
      languages: ['Indonesia', 'English'],
      education: 'Universitas Gadjah Mada',
      about: 'Spesialis mata dengan pengalaman luas dalam menangani berbagai gangguan penglihatan.',
      nextAvailable: '10:30'
    },
    {
      id: 3,
      name: 'Dr. Lisa Chen',
      specialty: 'Psikolog',
      rating: 4.9,
      experience: '6 tahun',
      price: 250000,
      avatar: '/api/placeholder/60/60',
      hospital: 'Klinik Kesehatan Mental Medlitik',
      availability: 'Tersedia hari ini',
      onlineConsultation: true,
      offlineConsultation: false,
      timeSlots: ['10:00', '11:00', '13:00', '14:00', '15:00'],
      reviews: 162,
      badges: ['Highly Recommended', 'Konseling'],
      languages: ['Indonesia', 'English', 'Mandarin'],
      education: 'National University of Singapore',
      about: 'Psikolog klinis dengan fokus pada terapi kognitif-behavioral dan konseling keluarga.',
      nextAvailable: '14:00'
    },
    {
      id: 4,
      name: 'Dr. Ahmad Ridwan',
      specialty: 'Spesialis Jantung',
      rating: 4.7,
      experience: '15 tahun',
      price: 350000,
      avatar: '/api/placeholder/60/60',
      hospital: 'RS Medlitik Jantung',
      availability: 'Tersedia lusa',
      onlineConsultation: true,
      offlineConsultation: true,
      timeSlots: ['08:00', '09:00', '10:00', '14:00', '15:00'],
      reviews: 298,
      badges: ['Senior Consultant', 'Kardiologi'],
      languages: ['Indonesia', 'English'],
      education: 'Universitas Indonesia',
      about: 'Spesialis jantung senior dengan expertise dalam intervensi kardiovaskular.',
      nextAvailable: '08:00'
    }
  ];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesConsultationType = selectedConsultationType === 'online' 
      ? doctor.onlineConsultation 
      : doctor.offlineConsultation;
    
    return matchesSearch && matchesSpecialty && matchesConsultationType;
  });

  // Generate calendar dates
  const generateCalendarDates = () => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const dates = [];
    
    for (let i = 1; i <= endDate.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      if (date >= new Date()) {
        dates.push(date);
      }
    }
    return dates;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleBooking = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      setShowBookingModal(true);
      setBookingStep(1);
    }
  };

  const confirmBooking = () => {
    // Here you would normally send the booking data to your API
    console.log('Booking confirmed:', {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      type: selectedConsultationType
    });
    setShowBookingModal(false);
    router.push('/user');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-[#1a2a3a]">
                Buat Appointment
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Consultation Type Selection */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold text-[#1a2a3a] mb-4">
                Pilih Jenis Konsultasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedConsultationType === 'online'
                      ? 'border-[#00a8cc] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedConsultationType('online')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <VideoCameraIcon className={`h-8 w-8 mx-auto mb-2 ${
                    selectedConsultationType === 'online' ? 'text-[#00a8cc]' : 'text-gray-400'
                  }`} />
                  <h4 className="font-medium text-gray-900">Konsultasi Online</h4>
                  <p className="text-sm text-gray-600 mt-1">Video call dengan dokter</p>
                </motion.button>

                <motion.button
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedConsultationType === 'offline'
                      ? 'border-[#00a8cc] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedConsultationType('offline')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BuildingOfficeIcon className={`h-8 w-8 mx-auto mb-2 ${
                    selectedConsultationType === 'offline' ? 'text-[#00a8cc]' : 'text-gray-400'
                  }`} />
                  <h4 className="font-medium text-gray-900">Kunjungan Klinik</h4>
                  <p className="text-sm text-gray-600 mt-1">Bertemu langsung di klinik</p>
                </motion.button>
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spesialisasi
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]"
                  >
                    <option value="">Semua Spesialisasi</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cari Dokter
                  </label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Nama dokter..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Doctor List */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {filteredDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all ${
                    selectedDoctor?.id === doctor.id
                      ? 'border-[#00a8cc] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <UserIcon className="h-8 w-8 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-[#1a2a3a]">
                          {doctor.name}
                        </h4>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#00a8cc]">
                            {formatCurrency(doctor.price)}
                          </p>
                          <p className="text-xs text-gray-500">per konsultasi</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {doctor.specialty} • {doctor.experience}
                      </p>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm font-medium text-gray-700">{doctor.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({doctor.reviews})</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {doctor.hospital}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {doctor.badges.map((badge, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {badge}
                          </span>
                        ))}
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {doctor.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Date & Time Selection */}
          <div className="space-y-6">
            {/* Date Selection */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-lg font-semibold text-[#1a2a3a] mb-4">
                Pilih Tanggal
              </h3>
              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <h4 className="font-medium">
                  {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </h4>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                  <div key={day} className="p-2 font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {generateCalendarDates().slice(0, 21).map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? 'bg-[#00a8cc] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Time Selection */}
            {selectedDoctor && selectedDate && (
              <motion.div 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-lg font-semibold text-[#1a2a3a] mb-4">
                  Pilih Waktu
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDoctor.timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selectedTime === time
                          ? 'bg-[#00a8cc] text-white border-[#00a8cc]'
                          : 'border-gray-200 hover:border-[#00a8cc] hover:bg-blue-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Booking Summary */}
            {selectedDoctor && selectedDate && selectedTime && (
              <motion.div 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-lg font-semibold text-[#1a2a3a] mb-4">
                  Ringkasan Booking
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Dokter</p>
                    <p className="font-medium">{selectedDoctor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal & Waktu</p>
                    <p className="font-medium">{formatDate(selectedDate)} - {selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Jenis Konsultasi</p>
                    <p className="font-medium">
                      {selectedConsultationType === 'online' ? 'Online' : 'Klinik'}
                    </p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600">Total Biaya</p>
                    <p className="text-xl font-bold text-[#00a8cc]">
                      {formatCurrency(selectedDoctor.price)}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleBooking}
                  className="w-full mt-6 bg-[#00a8cc] text-white py-3 rounded-lg font-medium hover:bg-[#0095b8] transition-colors"
                >
                  Konfirmasi Booking
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#1a2a3a]">
                  Konfirmasi Booking
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {bookingStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Detail Appointment:</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Dokter:</strong> {selectedDoctor.name}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Tanggal:</strong> {formatDate(selectedDate)}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Waktu:</strong> {selectedTime}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Biaya:</strong> {formatCurrency(selectedDoctor.price)}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                    >
                      Batal
                    </button>
                    <button
                      onClick={confirmBooking}
                      className="flex-1 py-3 bg-[#00a8cc] text-white rounded-lg font-medium hover:bg-[#0095b8]"
                    >
                      Konfirmasi
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
