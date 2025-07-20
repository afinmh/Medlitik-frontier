'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  XMarkIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

export default function MedicalRecordsPage() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const recordTypes = [
    { value: 'all', label: 'Semua Rekam Medis' },
    { value: 'consultation', label: 'Hasil Konsultasi' },
    { value: 'lab', label: 'Hasil Laboratorium' },
    { value: 'prescription', label: 'Resep Obat' },
    { value: 'imaging', label: 'Hasil Imaging' },
    { value: 'vaccine', label: 'Riwayat Vaksinasi' },
    { value: 'surgery', label: 'Riwayat Operasi' }
  ];

  const mockRecords = [
    {
      id: 1,
      title: 'Konsultasi Dokter Umum',
      type: 'consultation',
      doctor: 'Dr. Sarah Wijaya',
      date: '2025-07-15',
      description: 'Konsultasi mengenai sakit kepala berkepanjangan',
      diagnosis: 'Tension headache',
      treatment: 'Istirahat yang cukup, hindari stress, obat pereda nyeri bila perlu',
      documents: ['konsultasi-150725.pdf'],
      status: 'completed'
    },
    {
      id: 2,
      title: 'Tes Darah Lengkap',
      type: 'lab',
      doctor: 'Dr. Ahmad Rahman',
      date: '2025-07-10',
      description: 'Pemeriksaan darah rutin untuk check-up kesehatan',
      results: {
        'Hemoglobin': '13.5 g/dL (Normal)',
        'Leukosit': '7.200 /μL (Normal)',
        'Trombosit': '285.000 /μL (Normal)',
        'Gula Darah': '95 mg/dL (Normal)',
        'Kolesterol': '180 mg/dL (Normal)'
      },
      documents: ['lab-result-100725.pdf'],
      status: 'completed'
    },
    {
      id: 3,
      title: 'Resep Obat Kulit',
      type: 'prescription',
      doctor: 'Dr. Maya Sari',
      date: '2025-07-08',
      description: 'Resep untuk pengobatan dermatitis',
      medications: [
        { name: 'Hydrocortisone Cream 1%', dosage: '2x sehari, oleskan tipis', duration: '7 hari' },
        { name: 'Cetirizine 10mg', dosage: '1x sehari malam', duration: '5 hari' }
      ],
      documents: ['resep-080725.pdf'],
      status: 'active'
    },
    {
      id: 4,
      title: 'Foto Rontgen Dada',
      type: 'imaging',
      doctor: 'Dr. Budi Santoso',
      date: '2025-06-28',
      description: 'Pemeriksaan rontgen untuk check-up rutin',
      findings: 'Tidak ditemukan kelainan pada paru-paru dan jantung',
      documents: ['xray-280625.jpg', 'report-280625.pdf'],
      status: 'completed'
    },
    {
      id: 5,
      title: 'Vaksinasi COVID-19 Booster',
      type: 'vaccine',
      doctor: 'Dr. Lisa Chen',
      date: '2025-06-20',
      description: 'Vaksinasi booster COVID-19 dosis ketiga',
      vaccine: 'Pfizer-BioNTech',
      batch: 'FL8894',
      nextDue: '2026-06-20',
      documents: ['vaccine-cert-200625.pdf'],
      status: 'completed'
    }
  ];

  useEffect(() => {
    setRecords(mockRecords);
    setFilteredRecords(mockRecords);
  }, []);

  useEffect(() => {
    let filtered = records;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(record => 
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(record => record.type === selectedType);
    }

    setFilteredRecords(filtered);
  }, [searchQuery, selectedType, records]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'consultation':
        return <UserIcon className="h-5 w-5" />;
      case 'lab':
        return <DocumentTextIcon className="h-5 w-5" />;
      case 'prescription':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
        );
      case 'imaging':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        );
      case 'vaccine':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        );
      default:
        return <DocumentTextIcon className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-purple-100 text-purple-800';
      case 'prescription': return 'bg-green-100 text-green-800';
      case 'imaging': return 'bg-orange-100 text-orange-800';
      case 'vaccine': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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
                Rekam Medis
              </h1>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-[#00a8cc] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0095b8] transition-colors flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Upload Dokumen</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Rekam Medis
              </label>
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]"
                >
                  {recordTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Rekam Medis
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan judul, dokter, atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]"
                />
              </div>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                Menampilkan {filteredRecords.length} dari {records.length} rekam medis
              </div>
            </div>
          </div>
        </motion.div>

        {/* Records List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-lg ${getTypeColor(record.type)}`}>
                      {getTypeIcon(record.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-[#1a2a3a]">
                          {record.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === 'completed' ? 'bg-green-100 text-green-800' :
                          record.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status === 'completed' ? 'Selesai' :
                           record.status === 'active' ? 'Aktif' :
                           'Pending'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-1" />
                          {record.doctor}
                        </div>
                        <div className="flex items-center">
                          <CalendarDaysIcon className="h-4 w-4 mr-1" />
                          {formatDate(record.date)}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{record.description}</p>
                      
                      {record.documents && record.documents.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {record.documents.map((doc, i) => (
                            <span key={i} className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                              <DocumentTextIcon className="h-3 w-3 mr-1" />
                              {doc}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <motion.button
                      onClick={() => handleViewRecord(record)}
                      className="p-2 text-gray-600 hover:text-[#00a8cc] rounded-full hover:bg-blue-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <EyeIcon className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      className="p-2 text-gray-600 hover:text-[#00a8cc] rounded-full hover:bg-blue-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredRecords.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tidak ada rekam medis ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah filter pencarian atau upload dokumen baru
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedRecord && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1a2a3a]">
                  {selectedRecord.title}
                </h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dokter
                    </label>
                    <p className="text-gray-900">{selectedRecord.doctor}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal
                    </label>
                    <p className="text-gray-900">{formatDate(selectedRecord.date)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <p className="text-gray-900 bg-gray-50 rounded-lg p-4">
                    {selectedRecord.description}
                  </p>
                </div>

                {selectedRecord.diagnosis && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diagnosis
                    </label>
                    <p className="text-gray-900 bg-blue-50 rounded-lg p-4">
                      {selectedRecord.diagnosis}
                    </p>
                  </div>
                )}

                {selectedRecord.treatment && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pengobatan
                    </label>
                    <p className="text-gray-900 bg-green-50 rounded-lg p-4">
                      {selectedRecord.treatment}
                    </p>
                  </div>
                )}

                {selectedRecord.results && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hasil Pemeriksaan
                    </label>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {Object.entries(selectedRecord.results).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-medium">{key}:</span>
                          <span className="text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRecord.medications && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Obat-obatan
                    </label>
                    <div className="bg-green-50 rounded-lg p-4 space-y-3">
                      {selectedRecord.medications.map((med, index) => (
                        <div key={index} className="border-l-4 border-green-400 pl-4">
                          <p className="font-medium text-gray-900">{med.name}</p>
                          <p className="text-sm text-gray-600">
                            Dosis: {med.dosage} • Durasi: {med.duration}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRecord.documents && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dokumen
                    </label>
                    <div className="space-y-2">
                      {selectedRecord.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-900">{doc}</span>
                          </div>
                          <button className="text-[#00a8cc] hover:text-[#0095b8] text-sm font-medium">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a2a3a]">
                  Upload Dokumen Medis
                </h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Dokumen
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]">
                    {recordTypes.filter(type => type.value !== 'all').map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Dokumen
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan judul dokumen"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Klik untuk memilih file atau drag & drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, JPG, PNG (Max 10MB)
                    </p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button className="flex-1 py-3 bg-[#00a8cc] text-white rounded-lg font-medium hover:bg-[#0095b8]">
                    Upload
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
