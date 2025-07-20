'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AIHealthChat from '../../../components/ai-health-assistant/AIHealthChat';
import ScheduledMonitoring from '../../../components/ai-health-assistant/ScheduledMonitoring';
import { 
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  SparklesIcon,
  DocumentTextIcon,
  HeartIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function AIHealthDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [aiSessions, setAiSessions] = useState([]);
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    loadAISessions();
    loadHealthStatus();
  }, []);

  const loadAISessions = () => {
    // Mock AI sessions data - setiap session dari konsultasi terpisah
    const mockSessions = [
      {
        id: 1,
        consultationId: 'CONS_001',
        doctorName: 'Dr. Sarah Wijaya',
        diagnosis: 'Tension Headache (Sakit Kepala Tegang)',
        consultationDate: new Date('2025-01-20'),
        status: 'active',
        riskLevel: 'low',
        nextCheckIn: new Date('2025-01-27'),
        recoveryProgress: 75,
        lastInteraction: new Date('2025-01-19'),
        totalMessages: 15,
        checkInCount: 3,
        warningCount: 0,
        prescription: {
          medications: ['Paracetamol 500mg - 3x sehari', 'Ibuprofen 400mg - jika diperlukan'],
          recommendations: ['Istirahat cukup', 'Hindari stress', 'Minum air yang cukup']
        },
        monitoringSchedule: [
          { 
            date: new Date('2025-01-23'),
            status: 'completed',
            painLevel: 6,
            message: 'Sakit kepala masih ada tapi sudah berkurang. Tidur lebih baik.'
          },
          { 
            date: new Date('2025-01-26'),
            status: 'completed',
            painLevel: 4,
            message: 'Kondisi membaik, sakit kepala hanya sesekali. Obat diminum teratur.'
          },
          { 
            date: new Date('2025-01-29'),
            status: 'pending',
            dueToday: true
          },
          { 
            date: new Date('2025-02-02'),
            status: 'upcoming'
          },
          { 
            date: new Date('2025-02-05'),
            status: 'upcoming'
          }
        ]
      },
      {
        id: 2,
        consultationId: 'CONS_002', 
        doctorName: 'Dr. Ahmad Ridwan',
        diagnosis: 'Hypertension (Hipertensi)',
        consultationDate: new Date('2025-01-15'),
        status: 'monitoring',
        riskLevel: 'medium',
        nextCheckIn: new Date('2025-01-25'),
        recoveryProgress: 60,
        lastInteraction: new Date('2025-01-18'),
        totalMessages: 28,
        checkInCount: 5,
        warningCount: 1,
        prescription: {
          medications: ['Lisinopril 10mg - 1x sehari', 'Amlodipine 5mg - 1x sehari'],
          recommendations: ['Diet rendah garam', 'Olahraga teratur', 'Monitor tekanan darah']
        },
        monitoringSchedule: [
          { 
            date: new Date('2025-01-18'),
            status: 'completed',
            painLevel: 3,
            message: 'Tekanan darah stabil, tidak ada keluhan berarti.'
          },
          { 
            date: new Date('2025-01-22'),
            status: 'completed',
            painLevel: 2,
            message: 'Merasa lebih baik, tekanan darah terkontrol dengan obat.'
          },
          { 
            date: new Date('2025-01-25'),
            status: 'overdue',
            daysPastDue: 4
          },
          { 
            date: new Date('2025-01-29'),
            status: 'upcoming'
          }
        ]
      },
      {
        id: 3,
        consultationId: 'CONS_003',
        doctorName: 'Dr. Maya Sari',
        diagnosis: 'Dermatitis (Eksim)',
        consultationDate: new Date('2025-01-10'),
        status: 'completed',
        riskLevel: 'low',
        nextCheckIn: null,
        recoveryProgress: 95,
        lastInteraction: new Date('2025-01-12'),
        totalMessages: 8,
        checkInCount: 2,
        warningCount: 0,
        prescription: {
          medications: ['Hydrocortisone cream 1%', 'Cetirizine 10mg - 1x sehari'],
          recommendations: ['Hindari sabun keras', 'Gunakan moisturizer', 'Jaga kebersihan kulit']
        },
        monitoringSchedule: [
          { 
            date: new Date('2025-01-13'),
            status: 'completed',
            painLevel: 2,
            message: 'Kulit sudah mulai membaik, gatal berkurang.'
          },
          { 
            date: new Date('2025-01-16'),
            status: 'completed',
            painLevel: 1,
            message: 'Kondisi sangat baik, hampir tidak ada gejala.'
          }
        ]
      },
      {
        id: 4,
        consultationId: 'CONS_004',
        doctorName: 'Dr. Budi Hartono',
        diagnosis: 'Gastritis Akut (Radang Lambung)',
        consultationDate: new Date('2025-01-12'),
        status: 'active',
        riskLevel: 'high',
        nextCheckIn: new Date('2025-01-21'),
        recoveryProgress: 25,
        lastInteraction: new Date('2025-01-20'),
        totalMessages: 22,
        checkInCount: 4,
        warningCount: 3,
        prescription: {
          medications: ['Omeprazole 20mg - 2x sehari', 'Sucralfate 1g - 3x sehari', 'Domperidone 10mg - 3x sehari'],
          recommendations: ['Diet BRAT', 'Hindari makanan pedas/asam', 'Makan dalam porsi kecil tapi sering']
        },
        monitoringSchedule: [
          { 
            date: new Date('2025-01-15'),
            status: 'completed',
            painLevel: 8,
            message: 'Masih terasa nyeri hebat di perut, mual dan muntah. Obat belum efektif.'
          },
          { 
            date: new Date('2025-01-18'),
            status: 'completed',
            painLevel: 9,
            message: 'Kondisi memburuk, nyeri semakin intens. Susah makan dan minum.'
          },
          { 
            date: new Date('2025-01-21'),
            status: 'overdue',
            daysPastDue: 1
          },
          { 
            date: new Date('2025-01-24'),
            status: 'upcoming'
          }
        ]
      }
    ];
    
    setAiSessions(mockSessions);
    // Set session pertama sebagai default selected
    setSelectedSession(mockSessions[0]);
  };

  const loadHealthStatus = () => {
    // Mock health status berdasarkan semua sessions
    const activeSessionsCount = aiSessions.filter(s => s.status === 'active').length;
    const totalSessions = aiSessions.length;
    
    const mockStatus = {
      overallScore: 82,
      riskLevel: 'low',
      activeSessions: activeSessionsCount || 2,
      totalSessions: totalSessions || 3,
      completedSessions: aiSessions.filter(s => s.status === 'completed').length || 1,
      lastCheckIn: new Date('2025-01-19'),
      nextAction: 'weekly_checkin'
    };
    
    setHealthStatus(mockStatus);
  };

  const handleSelectSession = (session) => {
    setSelectedSession(session);
    // Tidak perlu ganti tab, biarkan user tetap di tab yang sama
  };

  const handleStartNewSession = () => {
    // Redirect to consultation page instead of creating new session
    // Karena AI session dibuat otomatis setelah konsultasi selesai
    router.push('/user/consultation');
  };

  const handleHealthUpdate = (checkInData) => {
    console.log('Health update received:', checkInData);
    // Update health status and trigger notifications if needed
  };

  const handleDoctorAlert = (alertData) => {
    console.log('Doctor alert triggered:', alertData);
    // Send alert to doctor and schedule urgent consultation
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600" />;
      case 'monitoring':
        return <HeartIcon className="h-5 w-5 text-blue-600" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-gray-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMonitoringStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getMonitoringStatusText = (schedule) => {
    switch (schedule.status) {
      case 'completed': return 'Sudah Mengajukan';
      case 'pending': return schedule.dueToday ? 'Belum Mengajukan (Hari Ini)' : 'Belum Mengajukan';
      case 'overdue': return `Terlambat ${schedule.daysPastDue} hari`;
      case 'upcoming': return 'Akan Datang';
      default: return 'Unknown';
    }
  };

  const canSubmitReport = (schedule) => {
    return schedule.status === 'pending' || schedule.status === 'overdue';
  };

  const getCurrentPendingReport = (session) => {
    return session.monitoringSchedule?.find(s => s.status === 'pending' || s.status === 'overdue');
  };

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
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-7 w-7 text-[#00a8cc]" />
                <div>
                  <h1 className="text-xl font-bold text-[#1a2a3a]">
                    AI Health Assistant
                  </h1>
                  <p className="text-xs text-gray-500">Pemantauan kesehatan cerdas</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleStartNewSession}
                className="flex items-center space-x-2 px-4 py-2 bg-[#00a8cc] text-white rounded-lg hover:bg-[#0095b8] transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Konsultasi Dokter</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Health Status Overview */}
        {healthStatus && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold text-[#1a2a3a]">{healthStatus.overallScore}%</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <HeartIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Risk Level</p>
                  <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${getRiskColor(healthStatus.riskLevel)}`}>
                    {healthStatus.riskLevel.toUpperCase()}
                  </span>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <HeartIcon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                  <p className="text-2xl font-bold text-[#1a2a3a]">{healthStatus.activeSessions}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-[#1a2a3a]">{healthStatus.totalSessions}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <ChartBarIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {[
                { key: 'overview', label: 'Overview', icon: ChartBarIcon },
                { key: 'monitoring', label: 'Monitoring', icon: CalendarDaysIcon },
                { key: 'history', label: 'History', icon: DocumentTextIcon }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-[#00a8cc] text-[#00a8cc]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* No Session Selected State */}
          {!selectedSession && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-12 text-center">
                <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Pilih AI Session
                </h3>
                <p className="text-gray-500 mb-6">
                  Pilih session di atas untuk melihat detail, monitoring, warning, dan riwayat
                </p>
                <button
                  onClick={handleStartNewSession}
                  className="px-6 py-3 bg-[#00a8cc] text-white rounded-lg hover:bg-[#0095b8] transition-colors font-medium"
                >
                  Konsultasi dengan Dokter
                </button>
              </div>
            </div>
          )}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Session Selector - Left Column */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Pilih AI Session:</h3>
                  <div className="space-y-2">
                    {aiSessions.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => handleSelectSession(session)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                          selectedSession?.id === session.id
                            ? 'border-[#00a8cc] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-full ${
                          session.status === 'active' ? 'bg-green-100' :
                          session.status === 'monitoring' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          {getStatusIcon(session.status)}
                        </div>
                        <div className="flex-1 text-left">
                          <p className={`text-sm font-medium ${
                            selectedSession?.id === session.id ? 'text-[#00a8cc]' : 'text-gray-900'
                          }`}>
                            {session.diagnosis}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.doctorName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {session.consultationDate.toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(session.riskLevel)}`}>
                          {session.riskLevel}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content - Right 2 Columns */}
              <div className="lg:col-span-2">
                {!selectedSession ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-12 text-center">
                      <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        Pilih AI Session
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Pilih session di sebelah kiri untuk melihat detail, monitoring, warning, dan riwayat
                      </p>
                      <button
                        onClick={handleStartNewSession}
                        className="px-6 py-3 bg-[#00a8cc] text-white rounded-lg hover:bg-[#0095b8] transition-colors font-medium"
                      >
                        Konsultasi dengan Dokter
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Selected Session Details - Left Side */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-[#1a2a3a]">
                              Session Details
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {selectedSession.diagnosis}
                            </p>
                          </div>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRiskColor(selectedSession.riskLevel)}`}>
                            {selectedSession.riskLevel.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dokter</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{selectedSession.doctorName}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tanggal Konsultasi</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {selectedSession.consultationDate.toLocaleDateString('id-ID', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Progress Pemulihan</p>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-[#00a8cc] h-3 rounded-full transition-all duration-500"
                                style={{ width: `${selectedSession.recoveryProgress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-[#00a8cc]">
                              {selectedSession.recoveryProgress}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                          <div className="text-center">
                            <p className="text-lg font-semibold text-gray-900">{selectedSession.totalMessages}</p>
                            <p className="text-xs text-gray-500">Total Chat</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-gray-900">{selectedSession.checkInCount}</p>
                            <p className="text-xs text-gray-500">Check-ins</p>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <button 
                            onClick={() => {
                              setShowAIChat(true);
                            }}
                            className="w-full bg-[#00a8cc] text-white py-2 px-4 rounded-lg hover:bg-[#0095b8] transition-colors font-medium"
                          >
                            Buka Chat AI
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prescription & Recommendations - Right Side */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-[#1a2a3a]">
                          Resep & Rekomendasi
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Dari konsultasi dengan {selectedSession.doctorName}
                        </p>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                            Obat-obatan
                          </h4>
                          <div className="space-y-2">
                            {selectedSession.prescription.medications.map((med, index) => (
                              <div key={index} className="bg-red-50 rounded-lg p-3">
                                <p className="text-sm text-gray-800">{med}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                            Rekomendasi
                          </h4>
                          <div className="space-y-2">
                            {selectedSession.prescription.recommendations.map((rec, index) => (
                              <div key={index} className="bg-green-50 rounded-lg p-3">
                                <p className="text-sm text-gray-800">• {rec}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {selectedSession.nextCheckIn && (
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-blue-800 mb-1">
                              Check-in Berikutnya
                            </h4>
                            <p className="text-sm text-blue-700">
                              {selectedSession.nextCheckIn.toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'monitoring' && !selectedSession && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8 text-center">
                <CalendarDaysIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Pilih Session untuk Monitoring
                </h3>
                <p className="text-gray-500">
                  Pilih AI session di atas untuk melihat jadwal monitoring dan check-in
                </p>
              </div>
            </div>
          )}

          {activeTab === 'history' && !selectedSession && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8 text-center">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Pilih Session untuk Melihat Riwayat
                </h3>
                <p className="text-gray-500">
                  Pilih AI session di atas untuk melihat riwayat lengkap interaksi AI
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'monitoring' && selectedSession && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header dengan informasi session */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <HeartIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Health Monitoring: {selectedSession.diagnosis}
                    </h3>
                    <p className="text-sm text-blue-600">
                      Konsultasi dengan {selectedSession.doctorName} - {selectedSession.consultationDate.toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/70 rounded-lg p-4">
                    <p className="text-sm text-blue-600 font-medium">Next Check-in</p>
                    <p className="text-lg font-bold text-blue-900">
                      {selectedSession.nextCheckIn ? selectedSession.nextCheckIn.toLocaleDateString('id-ID') : 'Completed'}
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-4">
                    <p className="text-sm text-blue-600 font-medium">Recovery Progress</p>
                    <p className="text-lg font-bold text-blue-900">{selectedSession.recoveryProgress}%</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-4">
                    <p className="text-sm text-blue-600 font-medium">Completed Reports</p>
                    <p className="text-lg font-bold text-blue-900">
                      {selectedSession.monitoringSchedule?.filter(s => s.status === 'completed').length || 0} / {selectedSession.monitoringSchedule?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Jadwal Monitoring */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CalendarDaysIcon className="h-5 w-5 mr-2" />
                    Jadwal Monitoring
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Anda hanya dapat memberikan laporan sesuai jadwal yang telah ditentukan
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    {selectedSession.monitoringSchedule?.map((schedule, index) => (
                      <div key={index} className={`p-4 rounded-lg border-2 ${
                        schedule.dueToday ? 'border-yellow-300 bg-yellow-50' :
                        schedule.status === 'completed' ? 'border-green-200 bg-green-50' :
                        schedule.status === 'overdue' ? 'border-red-200 bg-red-50' :
                        'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <CalendarDaysIcon className="h-4 w-4 text-gray-500" />
                              <span className="font-medium text-gray-900">
                                {schedule.date.toLocaleDateString('id-ID', {
                                  weekday: 'long',
                                  day: 'numeric',
                                  month: 'long'
                                })}
                              </span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMonitoringStatusColor(schedule.status)}`}>
                              {getMonitoringStatusText(schedule)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {schedule.status === 'completed' && (
                              <div className="text-sm text-gray-600">
                                Pain Level: {schedule.painLevel}/10
                              </div>
                            )}
                            {canSubmitReport(schedule) && (
                              <button
                                onClick={() => {
                                  document.getElementById('monitoring-form').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-4 py-2 bg-[#00a8cc] text-white rounded-lg hover:bg-[#0095b8] transition-colors text-sm font-medium"
                              >
                                Kirim Laporan
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {schedule.status === 'completed' && schedule.message && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-700 italic">
                              "{schedule.message}"
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Laporan - Hanya muncul jika ada jadwal pending */}
              {(() => {
                const pendingReport = getCurrentPendingReport(selectedSession);
                if (!pendingReport) return null;
                
                return (
                  <div id="monitoring-form" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#00a8cc] rounded-lg">
                          <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Laporan Monitoring - {pendingReport.date.toLocaleDateString('id-ID')}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {pendingReport.status === 'overdue' 
                              ? `⚠️ Laporan terlambat ${pendingReport.daysPastDue} hari. Silakan lengkapi segera.`
                              : '📅 Saatnya untuk laporan monitoring hari ini.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-6">
                        {/* Quick Status Buttons */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Status Kondisi Saat Ini
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: '😊 Merasa Baik', color: 'bg-green-50 text-green-700 border-green-200' },
                              { label: '😐 Biasa Saja', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
                              { label: '😔 Kurang Baik', color: 'bg-orange-50 text-orange-700 border-orange-200' },
                              { label: '😰 Tidak Baik', color: 'bg-red-50 text-red-700 border-red-200' }
                            ].map((status) => (
                              <button
                                key={status.label}
                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:shadow-md ${status.color}`}
                              >
                                {status.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Message Textarea */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Ceritakan kondisi Anda secara detail
                          </label>
                          <textarea
                            placeholder="Contoh: Hari ini saya merasa sakit kepala sudah berkurang, sudah bisa tidur lebih nyenyak. Tapi masih ada sedikit pusing saat bangun pagi. Sudah minum obat sesuai jadwal..."
                            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc] transition-colors resize-none"
                          />
                        </div>

                        {/* Additional Questions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tingkat Nyeri (1-10)
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]">
                              <option>Pilih tingkat nyeri...</option>
                              {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1} - {i === 0 ? 'Tidak ada nyeri' : i < 3 ? 'Ringan' : i < 7 ? 'Sedang' : 'Berat'}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Konsumsi Obat
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]">
                              <option>Status konsumsi obat...</option>
                              <option>Sudah minum sesuai jadwal</option>
                              <option>Terlambat minum obat</option>
                              <option>Lupa minum obat</option>
                              <option>Tidak minum obat</option>
                            </select>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-500">
                            <span className="flex items-center">
                              <SparklesIcon className="h-4 w-4 mr-1" />
                              Laporan untuk tanggal {pendingReport.date.toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              // Handle submit logic here
                              alert(`Laporan untuk ${pendingReport.date.toLocaleDateString('id-ID')} berhasil dikirim! AI sedang menganalisis...`);
                            }}
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00a8cc] to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
                          >
                            <span>Kirim Laporan</span>
                            <ChartBarIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* No Pending Reports Message */}
              {!getCurrentPendingReport(selectedSession) && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tidak Ada Laporan Pending
                  </h3>
                  <p className="text-gray-500">
                    Semua laporan monitoring sudah lengkap sesuai jadwal. Laporan berikutnya akan tersedia sesuai jadwal yang ditentukan.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && selectedSession && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2a3a]">
                  Riwayat AI Session
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Riwayat untuk {selectedSession.diagnosis}
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {/* AI Overall Summary */}
                  <div className={`p-6 rounded-xl border-2 ${
                    selectedSession.recoveryProgress >= 90 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                      : selectedSession.recoveryProgress >= 70
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
                      : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${
                        selectedSession.recoveryProgress >= 90 
                          ? 'bg-green-500'
                          : selectedSession.recoveryProgress >= 70
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                      }`}>
                        <SparklesIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className={`text-lg font-bold ${
                            selectedSession.recoveryProgress >= 90 
                              ? 'text-green-900'
                              : selectedSession.recoveryProgress >= 70
                              ? 'text-blue-900'
                              : selectedSession.recoveryProgress >= 50
                              ? 'text-yellow-900'
                              : 'text-red-900'
                          }`}>
                            Kesimpulan AI Health Assistant
                          </h4>
                          <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                            selectedSession.recoveryProgress >= 90 
                              ? 'bg-green-200 text-green-800'
                              : selectedSession.recoveryProgress >= 70
                              ? 'bg-blue-200 text-blue-800'
                              : selectedSession.recoveryProgress >= 50
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-red-200 text-red-800 animate-pulse'
                          }`}>
                            Progress: {selectedSession.recoveryProgress}%
                          </div>
                        </div>
                        
                        <div className={`text-sm leading-relaxed mb-4 ${
                          selectedSession.recoveryProgress >= 90 
                            ? 'text-green-800'
                            : selectedSession.recoveryProgress >= 70
                            ? 'text-blue-800'
                            : selectedSession.recoveryProgress >= 50
                            ? 'text-yellow-800'
                            : 'text-red-800'
                        }`}>
                          {selectedSession.recoveryProgress >= 90 ? (
                            <>
                              <p className="font-semibold mb-2">🎉 Kondisi Anda sudah sangat membaik!</p>
                              <p>Berdasarkan analisis dari {selectedSession.checkInCount} laporan monitoring, kondisi <strong>{selectedSession.diagnosis}</strong> Anda menunjukkan perbaikan yang sangat signifikan. Gejala telah berkurang drastis dan Anda sudah dapat beraktivitas normal.</p>
                            </>
                          ) : selectedSession.recoveryProgress >= 70 ? (
                            <>
                              <p className="font-semibold mb-2">📈 Kondisi Anda terus membaik</p>
                              <p>Progress pemulihan <strong>{selectedSession.diagnosis}</strong> Anda berjalan dengan baik. Meskipun masih ada beberapa gejala ringan, trend perbaikan sangat positif. Lanjutkan pengobatan dan pola hidup sehat.</p>
                            </>
                          ) : selectedSession.recoveryProgress >= 50 ? (
                            <>
                              <p className="font-semibold mb-2">⚠️ Masih perlu perhatian khusus</p>
                              <p>Kondisi <strong>{selectedSession.diagnosis}</strong> Anda masih memerlukan monitoring ketat. Beberapa gejala masih persisten dan progress pemulihan belum optimal. Disarankan untuk konsultasi ulang dengan dokter.</p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold mb-2">🚨 Kondisi memburuk - Perlu tindakan segera</p>
                              <p>Kondisi <strong>{selectedSession.diagnosis}</strong> Anda menunjukkan tanda-tanda memburuk. Gejala semakin intensif dan tidak merespons pengobatan dengan baik.</p>
                              <p className="mt-2 font-medium">Saran tindakan segera:</p>
                              <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                                <li>Segera datang ke <strong>rumah sakit</strong> atau <strong>klinik terdekat</strong></li>
                                <li>Konsultasi langsung dengan <strong>dokter spesialis</strong> untuk penanganan khusus</li>
                                <li>Kondisi Anda memerlukan evaluasi medis menyeluruh dan mungkin perlu penanganan intensif</li>
                              </ul>
                            </>
                          )}
                        </div>
                        
                        {/* Recommendation */}
                        <div className={`p-4 rounded-lg ${
                          selectedSession.recoveryProgress >= 90 
                            ? 'bg-green-100 border border-green-200'
                            : selectedSession.recoveryProgress >= 70
                            ? 'bg-blue-100 border border-blue-200'
                            : selectedSession.recoveryProgress >= 50
                            ? 'bg-yellow-100 border border-yellow-200'
                            : 'bg-red-100 border border-red-200'
                        }`}>
                          <div className="flex items-start space-x-3">
                            <div className={`p-1 rounded-full ${
                              selectedSession.recoveryProgress >= 90 
                                ? 'bg-green-500'
                                : selectedSession.recoveryProgress >= 70
                                ? 'bg-blue-500'
                                : selectedSession.recoveryProgress >= 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}>
                              {selectedSession.recoveryProgress >= 90 ? (
                                <CheckCircleIcon className="h-4 w-4 text-white" />
                              ) : selectedSession.recoveryProgress >= 70 ? (
                                <ClockIcon className="h-4 w-4 text-white" />
                              ) : selectedSession.recoveryProgress >= 50 ? (
                                <CalendarDaysIcon className="h-4 w-4 text-white" />
                              ) : (
                                <ExclamationTriangleIcon className="h-4 w-4 text-white" />
                              )}
                            </div>
                            <div>
                              <h5 className={`font-semibold text-sm mb-1 ${
                                selectedSession.recoveryProgress >= 90 
                                  ? 'text-green-800'
                                  : selectedSession.recoveryProgress >= 70
                                  ? 'text-blue-800'
                                  : selectedSession.recoveryProgress >= 50
                                  ? 'text-yellow-800'
                                  : 'text-red-800'
                              }`}>
                                Rekomendasi AI:
                              </h5>
                              <p className={`text-sm ${
                                selectedSession.recoveryProgress >= 90 
                                  ? 'text-green-700'
                                  : selectedSession.recoveryProgress >= 70
                                  ? 'text-blue-700'
                                  : selectedSession.recoveryProgress >= 50
                                  ? 'text-yellow-700'
                                  : 'text-red-700'
                              }`}>
                                {selectedSession.recoveryProgress >= 90 ? (
                                  <>✅ Anda dapat mengurangi frekuensi monitoring. Lakukan check-up rutin 1 bulan sekali untuk memastikan kondisi tetap stabil. Tetap jaga pola hidup sehat!</>
                                ) : selectedSession.recoveryProgress >= 70 ? (
                                  <>🔄 Lanjutkan monitoring mingguan. Jika dalam 2 minggu progress tetap positif, Anda dapat mengurangi frekuensi konsultasi. Tetap konsisten dengan pengobatan.</>
                                ) : selectedSession.recoveryProgress >= 50 ? (
                                  <>⚡ Segera konsultasi kembali dengan {selectedSession.doctorName}. Kondisi Anda memerlukan evaluasi lebih lanjut dan kemungkinan penyesuaian pengobatan.</>
                                ) : (
                                  <>🚨 PERHATIAN: Kondisi memburuk! Segera cari bantuan medis. Datang ke rumah sakit/klinik terdekat atau hubungi dokter spesialis untuk penanganan segera. Jangan tunda untuk mendapatkan perawatan medis yang tepat.</>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-xs text-gray-500">
                            Analisis berdasarkan {selectedSession.checkInCount} laporan • Terakhir diperbarui: {selectedSession.lastInteraction.toLocaleDateString('id-ID')}
                          </div>
                          <div className="flex space-x-2">
                            {selectedSession.recoveryProgress < 30 ? (
                              <>
                                <button 
                                  onClick={() => router.push('/user/emergency')}
                                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                                >
                                  🚨 Bantuan Darurat
                                </button>
                                <button 
                                  onClick={() => router.push('/user/specialist')}
                                  className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                                >
                                  Dokter Spesialis
                                </button>
                              </>
                            ) : selectedSession.recoveryProgress < 70 ? (
                              <button 
                                onClick={() => router.push('/user/consultation')}
                                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                              >
                                Konsultasi Dokter
                              </button>
                            ) : (
                              <button className="px-4 py-2 bg-[#00a8cc] text-white text-sm font-medium rounded-lg hover:bg-[#0095b8] transition-colors">
                                Lanjut Monitoring
                              </button>
                            )}
                            <button 
                              onClick={() => setShowAIChat(true)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Chat AI
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Session Timeline */}
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div className="space-y-8 pl-12">
                      {/* Konsultasi Awal */}
                      <div className="relative">
                        <div className="absolute -left-12 p-2 bg-white border-2 border-[#00a8cc] rounded-full">
                          <CheckCircleIcon className="h-4 w-4 text-[#00a8cc]" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">Konsultasi dengan Dokter</h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {selectedSession.doctorName} - {selectedSession.diagnosis}
                              </p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {selectedSession.consultationDate.toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs text-green-600 font-medium">✓ AI Session Dimulai</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Check-ins */}
                      {Array.from({ length: selectedSession.checkInCount }, (_, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-12 p-2 bg-white border-2 border-blue-500 rounded-full">
                            <HeartIcon className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-blue-900">Health Check-in #{i + 1}</h4>
                                <p className="text-sm text-blue-700 mt-1">
                                  Kondisi: Stabil • Pain Level: {Math.floor(Math.random() * 5) + 1}/10
                                </p>
                              </div>
                              <span className="text-sm text-blue-600">
                                {new Date(selectedSession.consultationDate.getTime() + (i + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID')}
                              </span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-blue-200">
                              <p className="text-xs text-blue-600">✓ AI Assessment: Progress Normal</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Current Status */}
                      <div className="relative">
                        <div className="absolute -left-12 p-2 bg-white border-2 border-green-500 rounded-full">
                          <ClockIcon className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-green-900">Status Saat Ini</h4>
                              <p className="text-sm text-green-700 mt-1">
                                Progress: {selectedSession.recoveryProgress}% • Status: {selectedSession.status}
                              </p>
                            </div>
                            <span className="text-sm text-green-600">
                              {selectedSession.lastInteraction.toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-green-200">
                            {selectedSession.nextCheckIn ? (
                              <p className="text-xs text-green-600">
                                📅 Next Check-in: {selectedSession.nextCheckIn.toLocaleDateString('id-ID')}
                              </p>
                            ) : (
                              <p className="text-xs text-green-600">✓ Session Completed</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Session Statistics */}
                  <div className="bg-gray-50 rounded-lg p-4 mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Statistik Session</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{selectedSession.totalMessages}</p>
                        <p className="text-sm text-gray-600">Total Chat</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{selectedSession.checkInCount}</p>
                        <p className="text-sm text-gray-600">Check-ins</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">
                          {Math.floor((new Date() - selectedSession.consultationDate) / (1000 * 60 * 60 * 24))} hari
                        </p>
                        <p className="text-sm text-gray-600">Durasi Monitoring</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* AI Chat Modal */}
      {showAIChat && selectedSession && (
        <AIHealthChat
          isOpen={showAIChat}
          onClose={() => setShowAIChat(false)}
          consultationData={{
            consultationId: selectedSession.consultationId,
            patientName: 'User',
            doctorName: selectedSession.doctorName,
            diagnosis: selectedSession.diagnosis,
            date: selectedSession.consultationDate,
            prescription: selectedSession.prescription
          }}
          diagnosisFile={null}
          prescriptionFile={null}
        />
      )}
    </div>
  );
}
