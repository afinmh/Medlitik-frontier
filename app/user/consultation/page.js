'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AIHealthAssistant from '../../../components/ai-health-assistant/AIHealthChat';
import { 
  ArrowLeftIcon,
  PaperAirplaneIcon,
  VideoCameraIcon,
  PhoneIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  FaceSmileIcon,
  PaperClipIcon,
  MicrophoneIcon,
  UserIcon,
  ClockIcon,
  CheckIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function ConsultationPage() {
  const router = useRouter();
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [consultationEnded, setConsultationEnded] = useState(false);
  const messagesEndRef = useRef(null);

  const consultations = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Wijaya',
      specialty: 'Dokter Umum',
      avatar: '/api/placeholder/50/50',
      status: 'online',
      lastSeen: 'Aktif sekarang',
      unreadCount: 1,
      lastMessage: 'Jika dalam 1 minggu tidak ada perbaikan atau malah bertambah parah, segera konsultasi lagi ya. Ada pertanyaan lain?',
      timestamp: '10:45',
      chatHistory: [
        {
          id: 1,
          sender: 'doctor',
          message: 'Selamat pagi! Saya Dr. Sarah. Ada yang bisa saya bantu hari ini?',
          timestamp: '10:25',
          status: 'read'
        },
        {
          id: 2,
          sender: 'user',
          message: 'Selamat pagi dok, saya ingin konsultasi tentang sakit kepala yang sering saya alami',
          timestamp: '10:27',
          status: 'read'
        },
        {
          id: 3,
          sender: 'doctor',
          message: 'Baik, bisa tolong ceritakan lebih detail? Sudah berapa lama mengalami sakit kepala ini?',
          timestamp: '10:28',
          status: 'read'
        },
        {
          id: 4,
          sender: 'user',
          message: 'Sudah sekitar 2 minggu dok. Biasanya muncul sore hari setelah pulang kerja. Rasanya seperti ditekan-tekan di area dahi dan pelipis',
          timestamp: '10:29',
          status: 'read'
        },
        {
          id: 5,
          sender: 'doctor',
          message: 'Apakah ada faktor pencetus yang Anda sadari? Misalnya stress, kurang tidur, atau pola makan yang tidak teratur?',
          timestamp: '10:30',
          status: 'read'
        },
        {
          id: 6,
          sender: 'user',
          message: 'Iya dok, lately memang agak stress karena deadline kerja. Tidur juga sering larut, kadang cuma 4-5 jam per hari',
          timestamp: '10:31',
          status: 'read'
        },
        {
          id: 7,
          sender: 'doctor',
          message: 'Bagaimana dengan intensitas nyerinya? Skala 1-10, berapa kira-kira? Dan apakah mengganggu aktivitas sehari-hari?',
          timestamp: '10:32',
          status: 'read'
        },
        {
          id: 8,
          sender: 'user',
          message: 'Sekitar 6-7 dok. Kadang sampai susah konsentrasi kerja. Pernah juga sampai mual sedikit kalau lagi parah',
          timestamp: '10:33',
          status: 'read'
        },
        {
          id: 9,
          sender: 'doctor',
          message: 'Apakah Anda sudah mencoba obat pereda nyeri seperti paracetamol atau ibuprofen?',
          timestamp: '10:34',
          status: 'read'
        },
        {
          id: 10,
          sender: 'user',
          message: 'Sudah dok, minum paracetamol. Memang agak mendingan, tapi kalau efeknya habis sakit lagi',
          timestamp: '10:35',
          status: 'read'
        },
        {
          id: 11,
          sender: 'doctor',
          message: 'Baik, berdasarkan gejala yang Anda ceritakan, kemungkinan besar ini adalah tension headache atau sakit kepala tegang yang dipicu oleh stress dan kurang tidur.',
          timestamp: '10:36',
          status: 'read'
        },
        {
          id: 12,
          sender: 'doctor',
          message: 'Saya akan berikan beberapa rekomendasi pengobatan dan perubahan gaya hidup. Apakah ada riwayat alergi obat?',
          timestamp: '10:37',
          status: 'read'
        },
        {
          id: 13,
          sender: 'user',
          message: 'Tidak ada dok, sejauh ini tidak ada masalah dengan obat-obatan',
          timestamp: '10:38',
          status: 'read'
        },
        {
          id: 14,
          sender: 'doctor',
          message: '📋 DIAGNOSIS:\n\n• Tension Headache (Sakit Kepala Tegang)\n• Dipicu oleh stress dan sleep deprivation\n• Intensitas sedang-berat (6-7/10)',
          timestamp: '10:39',
          status: 'read'
        },
        {
          id: 15,
          sender: 'doctor',
          message: 'Saya akan kirimkan resep obat dan saran penanganan. Silakan tunggu sebentar...',
          timestamp: '10:40',
          status: 'read'
        },
        {
          id: 16,
          sender: 'doctor',
          message: '📄 Resep dan rekomendasi sudah saya kirimkan melalui file. Silakan download dan baca dengan teliti.',
          timestamp: '10:41',
          status: 'read',
          attachment: {
            type: 'prescription',
            fileName: 'Resep_TensionHeadache_20250720.pdf',
            fileSize: '245 KB'
          }
        },
        {
          id: 17,
          sender: 'doctor',
          message: 'REKOMENDASI UTAMA:\n\n1. Perbaiki pola tidur (minimal 7-8 jam/hari)\n2. Kelola stress dengan teknik relaksasi\n3. Minum obat sesuai resep\n4. Hindari trigger seperti cahaya terang dan suara keras\n5. Olahraga ringan 30 menit/hari',
          timestamp: '10:42',
          status: 'read'
        },
        {
          id: 18,
          sender: 'user',
          message: 'Terima kasih dok, sudah saya download. Untuk obatnya diminum berapa lama ya?',
          timestamp: '10:43',
          status: 'read'
        },
        {
          id: 19,
          sender: 'doctor',
          message: 'Untuk paracetamol bisa diminum saat nyeri muncul, maksimal 3x sehari. Sedangkan obat pencegahan diminum rutin selama 2 minggu dulu, nanti kita evaluasi.',
          timestamp: '10:44',
          status: 'read'
        },
        {
          id: 20,
          sender: 'doctor',
          message: 'Jika dalam 1 minggu tidak ada perbaikan atau malah bertambah parah, segera konsultasi lagi ya. Ada pertanyaan lain?',
          timestamp: '10:45',
          status: 'delivered'
        }
      ]
    },
    {
      id: 2,
      doctorName: 'Dr. Budi Hartono',
      specialty: 'Dokter Mata',
      avatar: '/api/placeholder/50/50',
      status: 'away',
      lastSeen: '5 menit yang lalu',
      unreadCount: 0,
      lastMessage: 'Terima kasih atas konsultasinya',
      timestamp: 'Kemarin',
      chatHistory: [
        {
          id: 1,
          sender: 'doctor',
          message: 'Hasil pemeriksaan mata Anda menunjukkan kondisi yang normal',
          timestamp: 'Kemarin 14:30',
          status: 'read'
        },
        {
          id: 2,
          sender: 'user',
          message: 'Alhamdulillah dok, terima kasih',
          timestamp: 'Kemarin 14:32',
          status: 'read'
        },
        {
          id: 3,
          sender: 'doctor',
          message: 'Terima kasih atas konsultasinya',
          timestamp: 'Kemarin 14:35',
          status: 'read'
        }
      ]
    },
    {
      id: 3,
      doctorName: 'Dr. Lisa Chen',
      specialty: 'Psikolog',
      avatar: '/api/placeholder/50/50',
      status: 'offline',
      lastSeen: '2 jam yang lalu',
      unreadCount: 1,
      lastMessage: 'Sesi konsultasi kita akan dimulai dalam 30 menit',
      timestamp: '08:00',
      chatHistory: [
        {
          id: 1,
          sender: 'doctor',
          message: 'Sesi konsultasi kita akan dimulai dalam 30 menit',
          timestamp: '08:00',
          status: 'delivered'
        }
      ]
    }
  ];

  useEffect(() => {
    if (activeConsultation) {
      setMessages(activeConsultation.chatHistory);
    }
  }, [activeConsultation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim() && activeConsultation) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('id-ID', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        status: 'sent'
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate doctor response
      setTimeout(() => {
        const responses = [
          'Terima kasih atas informasinya. Saya akan analisis keluhan Anda.',
          'Baik, saya sudah mencatat keluhan Anda. Ada gejala lain yang menyertai?',
          'Saya memahami keluhan Anda. Mari kita diskusikan lebih lanjut.',
          'Berdasarkan informasi yang Anda berikan, saya akan memberikan saran yang tepat.',
          'Terima kasih sudah menceritakan kondisi Anda dengan detail.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const doctorResponse = {
          id: messages.length + 2,
          sender: 'doctor',
          message: randomResponse,
          timestamp: new Date().toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          status: 'delivered'
        };
        setMessages(prev => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDownloadAttachment = (attachment) => {
    // Simulate file download
    console.log('Downloading:', attachment.fileName);
    // In a real app, you would download the actual file from server
    alert(`Mengunduh ${attachment.fileName}...`);
  };

  const handleEndConsultation = () => {
    setConsultationEnded(true);
    
    // Simulate consultation end
    setTimeout(() => {
      setShowAIAssistant(true);
    }, 1000);
  };

  const getConsultationData = () => {
    if (!activeConsultation) return null;
    
    return {
      consultationId: activeConsultation.id,
      patientName: 'Pasien', // This would come from user data
      doctorName: activeConsultation.doctorName,
      diagnosis: 'Tension headache/Sakit kepala tegang', // Extracted from chat
      date: new Date(),
      prescription: {
        medications: [
          'Paracetamol 500mg - 3x sehari',
          'Ibuprofen 400mg - 2x sehari jika diperlukan'
        ],
        recommendations: [
          'Istirahat yang cukup',
          'Hindari stress berlebihan',
          'Minum air yang cukup',
          'Olahraga ringan secara teratur'
        ]
      }
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <CheckIcon className="h-4 w-4 text-gray-400" />;
      case 'delivered':
        return <CheckIcon className="h-4 w-4 text-gray-400" />;
      case 'read':
        return (
          <div className="flex">
            <CheckIcon className="h-4 w-4 text-blue-500 -mr-1" />
            <CheckIcon className="h-4 w-4 text-blue-500" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
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
                Konsultasi
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[calc(100vh-180px)]">
          {/* Consultation List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col max-h-[calc(100vh-200px)]">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1a2a3a]">
                    Konsultasi Aktif
                  </h3>
                  <button className="p-2 text-gray-400 hover:text-[#00a8cc] rounded-full hover:bg-blue-50">
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {consultations.map((consultation) => (
                  <motion.div
                    key={consultation.id}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      activeConsultation?.id === consultation.id
                        ? 'bg-blue-50 border-l-4 border-l-[#00a8cc]'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveConsultation(consultation)}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <UserIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(consultation.status)}`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {consultation.doctorName}
                          </h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">
                              {consultation.timestamp}
                            </span>
                            {consultation.unreadCount > 0 && (
                              <span className="bg-[#00a8cc] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {consultation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{consultation.specialty}</p>
                        <p className="text-xs text-gray-500 truncate">{consultation.lastMessage}</p>
                        <p className="text-xs text-gray-400">{consultation.lastSeen}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {activeConsultation ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[600px]">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <UserIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(activeConsultation.status)}`}></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {activeConsultation.doctorName}
                        </h4>
                        <p className="text-sm text-gray-600">{activeConsultation.specialty}</p>
                        <p className="text-xs text-gray-500">{activeConsultation.lastSeen}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        className="p-2 text-gray-600 hover:text-[#00a8cc] rounded-full hover:bg-blue-50"
                        onClick={() => setIsVideoCall(true)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <VideoCameraIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        className="p-2 text-gray-600 hover:text-[#00a8cc] rounded-full hover:bg-blue-50"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PhoneIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        className="px-3 py-1.5 bg-[#00a8cc] text-white text-sm rounded-lg hover:bg-[#0095b8] transition-colors font-medium"
                        onClick={handleEndConsultation}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Akhiri Konsultasi
                      </motion.button>
                      <motion.button
                        className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-300px)] min-h-[400px]">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                          msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          {msg.sender === 'doctor' && (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                              <UserIcon className="h-4 w-4 text-gray-600" />
                            </div>
                          )}
                          <div>
                            <div className={`rounded-2xl px-4 py-2 ${
                              msg.sender === 'user'
                                ? 'bg-[#00a8cc] text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm whitespace-pre-line">{msg.message}</p>
                            </div>
                            
                            {/* Attachment */}
                            {msg.attachment && (
                              <motion.div 
                                className={`mt-2 p-3 rounded-lg border border-gray-200 bg-white max-w-xs cursor-pointer hover:bg-gray-50 transition-colors ${
                                  msg.sender === 'user' ? 'ml-auto' : ''
                                }`}
                                onClick={() => handleDownloadAttachment(msg.attachment)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${
                                    msg.attachment.type === 'prescription' ? 'bg-green-100' : 'bg-blue-100'
                                  }`}>
                                    <DocumentTextIcon className={`h-5 w-5 ${
                                      msg.attachment.type === 'prescription' ? 'text-green-600' : 'text-blue-600'
                                    }`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {msg.attachment.fileName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {msg.attachment.fileSize}
                                    </p>
                                  </div>
                                  <ArrowDownTrayIcon className="h-4 w-4 text-gray-400" />
                                </div>
                                <div className="mt-2 text-xs text-gray-600">
                                  {msg.attachment.type === 'prescription' ? '📋 Resep & Rekomendasi Dokter' : '📄 Dokumen'}
                                </div>
                              </motion.div>
                            )}
                            
                            <div className={`flex items-center mt-1 space-x-1 ${
                              msg.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}>
                              <span className="text-xs text-gray-500">{msg.timestamp}</span>
                              {msg.sender === 'user' && getMessageStatusIcon(msg.status)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <PaperClipIcon className="h-5 w-5" />
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ketik pesan Anda..."
                        rows="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc] resize-none"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                        <FaceSmileIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <MicrophoneIcon className="h-5 w-5" />
                    </button>
                    <motion.button
                      onClick={handleSendMessage}
                      className="p-2 bg-[#00a8cc] text-white rounded-full hover:bg-[#0095b8] disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!message.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              /* No Active Consultation */
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChatBubbleLeftRightIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Pilih Konsultasi
                  </h3>
                  <p className="text-gray-500">
                    Pilih dokter dari daftar sebelah kiri untuk memulai konsultasi
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Call Modal */}
      <AnimatePresence>
        {isVideoCall && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black rounded-xl overflow-hidden w-full max-w-4xl h-full max-h-[600px] relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Video Call Interface */}
              <div className="relative h-full bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                    <UserIcon className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {activeConsultation?.doctorName}
                  </h3>
                  <p className="text-gray-300 mb-4">Video Call Active</p>
                  <div className="text-2xl font-mono">
                    00:03:47
                  </div>
                </div>

                {/* Video Call Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-4">
                    <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
                      <MicrophoneIcon className="h-6 w-6 text-white" />
                    </button>
                    <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
                      <VideoCameraIcon className="h-6 w-6 text-white" />
                    </button>
                    <button 
                      className="p-4 bg-red-600 rounded-full hover:bg-red-700"
                      onClick={() => setIsVideoCall(false)}
                    >
                      <PhoneIcon className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsVideoCall(false)}
                  className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                >
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Health Assistant Modal */}
      <AnimatePresence>
        {showAIAssistant && (
          <AIHealthAssistant
            isOpen={showAIAssistant}
            onClose={() => setShowAIAssistant(false)}
            consultationData={getConsultationData()}
            diagnosisFile={null} // Would be actual file in real implementation
            prescriptionFile={null} // Would be actual file in real implementation
          />
        )}
      </AnimatePresence>

      {/* Consultation Ended Success Message */}
      <AnimatePresence>
        {consultationEnded && !showAIAssistant && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="h-8 w-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Konsultasi Berhasil
              </h3>
              
              <p className="text-gray-600 mb-6">
                Terima kasih telah berkonsultasi dengan dokter. AI Health Assistant akan membantu pemulihan Anda.
              </p>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <SparklesIcon className="h-5 w-5 text-[#00a8cc]" />
                <span className="text-sm text-[#00a8cc] font-medium">
                  Sedang menganalisis diagnosis...
                </span>
              </div>
              
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00a8cc] mx-auto"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
