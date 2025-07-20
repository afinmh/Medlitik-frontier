'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PaperAirplaneIcon,
  DocumentTextIcon,
  PhotoIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

export default function AIHealthAssistant({ 
  isOpen, 
  onClose, 
  consultationData,
  diagnosisFile,
  prescriptionFile 
}) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('initializing'); // initializing, chatting, monitoring
  const [recoveryPlan, setRecoveryPlan] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Simulate AI initialization and analysis
  useEffect(() => {
    if (isOpen && consultationData) {
      initializeAIAssistant();
    }
  }, [isOpen, consultationData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeAIAssistant = async () => {
    setIsLoading(true);
    setCurrentPhase('initializing');
    
    // Simulate AI analysis of diagnosis and prescription
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate recovery plan based on diagnosis
    const generatedPlan = generateRecoveryPlan(consultationData);
    setRecoveryPlan(generatedPlan);
    
    // Send initial greeting and recommendations
    const initialMessages = [
      {
        id: 1,
        type: 'ai',
        content: `Halo ${consultationData.patientName}! 👋\n\nSaya AI Health Assistant Anda. Saya telah menganalisis hasil konsultasi dengan ${consultationData.doctorName} dan siap membantu pemulihan Anda.`,
        timestamp: new Date(),
        category: 'greeting'
      },
      {
        id: 2,
        type: 'ai',
        content: `Berdasarkan diagnosis "${consultationData.diagnosis}", saya telah menyiapkan rencana pemulihan personal untuk Anda:`,
        timestamp: new Date(),
        category: 'analysis'
      },
      {
        id: 3,
        type: 'ai',
        content: generatedPlan.summary,
        timestamp: new Date(),
        category: 'recovery_plan',
        data: generatedPlan
      }
    ];
    
    setMessages(initialMessages);
    setCurrentPhase('chatting');
    setIsLoading(false);
    
    // Send follow-up after a delay
    setTimeout(() => {
      addAIMessage("Apakah ada yang ingin Anda tanyakan tentang rencana pemulihan ini? Saya siap membantu! 😊", 'question');
    }, 3000);
  };

  const generateRecoveryPlan = (consultationData) => {
    // This would normally use ML/AI to generate personalized plan
    const commonRecommendations = {
      diabetes: {
        summary: `📋 **Rencana Pemulihan Diabetes Anda:**\n\n✅ **Monitoring Gula Darah**: 2-3x sehari\n✅ **Diet**: Rendah gula, tinggi serat\n✅ **Olahraga**: 30 menit/hari, 5x seminggu\n✅ **Obat**: Sesuai resep dokter\n\n⚠️ **Warning Signs**: Pusing, berkeringat berlebih, luka sulit sembuh`,
        lifestyle: ["Monitor gula darah rutin", "Diet seimbang rendah gula", "Olahraga teratur", "Kelola stress"],
        medications: ["Metformin 500mg - 2x sehari", "Insulin rapid acting - sebelum makan"],
        warnings: ["Hipoglikemia (gula darah < 70)", "Luka yang tidak sembuh", "Pandangan kabur mendadak"],
        schedule: {
          daily: ["Cek gula darah pagi", "Minum obat teratur", "Olahraga ringan"],
          weekly: ["Evaluasi berat badan", "Review makanan"],
          monthly: ["Konsultasi follow-up", "Cek HbA1c"]
        }
      },
      hypertension: {
        summary: `📋 **Rencana Pemulihan Hipertensi Anda:**\n\n✅ **Monitoring Tekanan Darah**: Harian\n✅ **Diet**: DASH diet, rendah garam\n✅ **Olahraga**: Kardio ringan 30 menit\n✅ **Obat**: ACE inhibitor sesuai dosis\n\n⚠️ **Warning Signs**: Nyeri dada, sesak napas, pusing berat`,
        lifestyle: ["Diet rendah garam", "Olahraga kardio ringan", "Kelola stress", "Cukup tidur"],
        medications: ["Lisinopril 10mg - 1x sehari pagi", "Amlodipine 5mg - 1x sehari"],
        warnings: ["Nyeri dada", "Sesak napas", "Pusing berat", "Sakit kepala hebat"],
        schedule: {
          daily: ["Cek tekanan darah", "Minum obat pagi", "Olahraga ringan"],
          weekly: ["Timbang berat badan", "Evaluasi gejala"],
          monthly: ["Konsultasi dokter", "Cek laboratorium"]
        }
      },
      general: {
        summary: `📋 **Rencana Pemulihan Anda:**\n\n✅ **Istirahat**: Cukup tidur 7-8 jam\n✅ **Nutrisi**: Makanan bergizi seimbang\n✅ **Aktivitas**: Bertahap sesuai kemampuan\n✅ **Obat**: Ikuti resep dokter\n\n⚠️ **Warning Signs**: Demam tinggi, nyeri hebat, gejala memburuk`,
        lifestyle: ["Istirahat cukup", "Nutrisi seimbang", "Aktivitas bertahap", "Hindari stress"],
        medications: ["Sesuai resep dokter"],
        warnings: ["Demam > 38.5°C", "Nyeri yang memburuk", "Gejala tidak membaik dalam 3 hari"],
        schedule: {
          daily: ["Minum obat teratur", "Monitor gejala", "Istirahat cukup"],
          weekly: ["Evaluasi kemajuan", "Aktivitas bertahap"],
          monthly: ["Follow-up dengan dokter"]
        }
      }
    };

    const diagnosis = consultationData.diagnosis?.toLowerCase() || '';
    if (diagnosis.includes('diabetes')) {
      return commonRecommendations.diabetes;
    } else if (diagnosis.includes('hipertensi') || diagnosis.includes('darah tinggi')) {
      return commonRecommendations.hypertension;
    } else {
      return commonRecommendations.general;
    }
  };

  const addAIMessage = (content, category = 'response', data = null) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        type: 'ai',
        content,
        timestamp: new Date(),
        category,
        data
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response based on user message
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, recoveryPlan);
      addAIMessage(aiResponse.content, aiResponse.category, aiResponse.data);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (userMessage, plan) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('obat') || message.includes('medication')) {
      return {
        content: `💊 **Panduan Pengobatan Anda:**\n\n${plan.medications.map((med, index) => `${index + 1}. ${med}`).join('\n')}\n\n**Tips:**\n- Minum obat di waktu yang sama setiap hari\n- Jangan skip dosis\n- Hubungi dokter jika ada efek samping\n\nApakah ada efek samping yang Anda rasakan?`,
        category: 'medication_info'
      };
    }
    
    if (message.includes('diet') || message.includes('makan')) {
      return {
        content: `🍎 **Panduan Diet Anda:**\n\n**Makanan yang Disarankan:**\n- Sayuran hijau (bayam, brokoli)\n- Protein tanpa lemak (ayam, ikan)\n- Karbohidrat kompleks (oats, quinoa)\n- Buah-buahan segar\n\n**Hindari:**\n- Makanan tinggi gula\n- Makanan olahan\n- Gorengan berlebihan\n\nIngin saran menu harian yang spesifik?`,
        category: 'diet_info'
      };
    }
    
    if (message.includes('olahraga') || message.includes('exercise')) {
      return {
        content: `🏃‍♀️ **Program Olahraga Anda:**\n\n**Minggu 1-2:**\n- Jalan kaki 15-20 menit\n- Stretching ringan\n\n**Minggu 3-4:**\n- Jalan cepat 25-30 menit\n- Yoga atau tai chi\n\n**Bulan 2+:**\n- Jogging ringan\n- Latihan kekuatan ringan\n\n⚠️ **Perhatian:** Stop jika merasa pusing atau sesak napas`,
        category: 'exercise_info'
      };
    }
    
    if (message.includes('gejala') || message.includes('symptom')) {
      return {
        content: `⚠️ **Warning Signs yang Perlu Diwaspadai:**\n\n${plan.warnings.map((warning, index) => `${index + 1}. ${warning}`).join('\n')}\n\n🚨 **Segera hubungi dokter jika:**\n- Gejala memburuk drastis\n- Muncul gejala baru yang tidak biasa\n- Merasa sangat tidak nyaman\n\nBagaimana kondisi Anda saat ini?`,
        category: 'warning_info'
      };
    }
    
    if (message.includes('kapan') || message.includes('when') || message.includes('kontrol')) {
      return {
        content: `📅 **Jadwal Follow-up Anda:**\n\n**Kontrol Rutin:**\n- Minggu ke-2: Evaluasi awal\n- Bulan ke-1: Check-up menyeluruh\n- Bulan ke-3: Evaluasi progress\n\n**Monitoring Mandiri:**\n- Harian: ${plan.schedule.daily.join(', ')}\n- Mingguan: ${plan.schedule.weekly.join(', ')}\n\nSaya akan mengingatkan Anda secara berkala! 📱`,
        category: 'schedule_info'
      };
    }
    
    // Default response
    return {
      content: `Saya memahami pertanyaan Anda. Berdasarkan kondisi Anda saat ini, saya sarankan untuk:\n\n1. Tetap ikuti rencana pemulihan yang telah dibuat\n2. Monitor gejala secara rutin\n3. Jangan ragu bertanya jika ada yang tidak jelas\n\nAda aspek spesifik lain yang ingin Anda ketahui? Misalnya tentang obat, diet, olahraga, atau gejala?`,
      category: 'general_response'
    };
  };

  const quickActions = [
    {
      icon: DocumentTextIcon,
      label: "Panduan Obat",
      action: () => setInputMessage("Bagaimana cara minum obat yang benar?")
    },
    {
      icon: HeartIcon,
      label: "Tips Diet",
      action: () => setInputMessage("Apa saja makanan yang disarankan untuk kondisi saya?")
    },
    {
      icon: ClockIcon,
      label: "Jadwal Kontrol",
      action: () => setInputMessage("Kapan saya harus kontrol ke dokter lagi?")
    },
    {
      icon: ExclamationTriangleIcon,
      label: "Warning Signs",
      action: () => setInputMessage("Apa saja gejala yang perlu saya waspadai?")
    }
  ];

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00a8cc] to-[#0095b8] text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">AI Health Assistant</h2>
              <p className="text-blue-100 text-sm">
                {currentPhase === 'initializing' ? 'Menganalisis data medis...' : 
                 currentPhase === 'chatting' ? 'Siap membantu pemulihan Anda' :
                 'Monitoring kesehatan Anda'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
        >
          {isLoading && currentPhase === 'initializing' && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a8cc] mx-auto mb-4"></div>
                <p className="text-gray-600">Menganalisis diagnosis dan resep...</p>
                <p className="text-sm text-gray-500 mt-2">Menyiapkan rencana pemulihan personal</p>
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-3xl ${
                  message.type === 'user' 
                    ? 'bg-[#00a8cc] text-white rounded-2xl rounded-br-md' 
                    : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-200'
                } p-4`}>
                  {message.type === 'ai' && (
                    <div className="flex items-center mb-2">
                      <div className="h-6 w-6 bg-gradient-to-r from-[#00a8cc] to-[#0095b8] rounded-full flex items-center justify-center mr-2">
                        <ChatBubbleLeftRightIcon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">AI Health Assistant</span>
                    </div>
                  )}
                  
                  <div className="whitespace-pre-line text-sm">
                    {message.content}
                  </div>
                  
                  {message.category === 'recovery_plan' && message.data && (
                    <div className="mt-4 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={action.action}
                            className="flex items-center space-x-2 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-[#00a8cc] rounded-full text-xs transition-colors"
                          >
                            <action.icon className="h-3 w-3" />
                            <span>{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white rounded-2xl rounded-bl-md shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">AI sedang mengetik...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanyakan tentang pemulihan, obat, diet, atau gejala..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00a8cc] focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-[#00a8cc] text-white rounded-xl hover:bg-[#0095b8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <PaperAirplaneIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>💡 Tips: Tanya tentang obat, diet, olahraga, atau gejala yang perlu diwaspadai</span>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-4 w-4 text-green-500" />
              <span>Data aman & terenkripsi</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
