'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function WarningSystem({ 
  patientData, 
  currentSymptoms, 
  riskLevel,
  onEmergencyAlert,
  onDoctorRecommendation 
}) {
  const [activeWarnings, setActiveWarnings] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'IGD RS Medlitik', phone: '119', type: 'emergency' },
    { name: 'Dr. Sarah Wijaya', phone: '0812-3456-7890', type: 'doctor' },
    { name: 'Hotline Medlitik', phone: '1500-123', type: 'support' }
  ]);

  // Warning conditions based on medical condition
  const warningConditions = {
    diabetes: {
      critical: [
        {
          condition: 'blood_sugar_very_high',
          title: 'Gula Darah Sangat Tinggi',
          description: 'Gula darah >300 mg/dL atau gejala DKA',
          symptoms: ['Haus berlebihan', 'Buang air kecil terus menerus', 'Napas berbau buah'],
          action: 'emergency',
          message: 'SEGERA ke IGD - Risiko Ketoasidosis Diabetik'
        },
        {
          condition: 'blood_sugar_very_low',
          title: 'Hipoglikemia Berat',
          description: 'Gula darah <50 mg/dL',
          symptoms: ['Pusing berat', 'Berkeringat dingin', 'Kesadaran menurun'],
          action: 'emergency',
          message: 'SEGERA makan/minum yang manis, hubungi dokter'
        }
      ],
      warning: [
        {
          condition: 'blood_sugar_high',
          title: 'Gula Darah Tinggi',
          description: 'Gula darah 200-300 mg/dL',
          symptoms: ['Haus', 'Sering kencing', 'Lemas'],
          action: 'doctor_consultation',
          message: 'Konsultasi dengan dokter dalam 24 jam'
        },
        {
          condition: 'foot_wound',
          title: 'Luka Kaki Tidak Sembuh',
          description: 'Luka >1 minggu tidak membaik',
          symptoms: ['Luka terbuka', 'Kemerahan', 'Nyeri'],
          action: 'doctor_consultation',
          message: 'Perawatan luka diabetes memerlukan perhatian khusus'
        }
      ],
      info: [
        {
          condition: 'medication_missed',
          title: 'Obat Terlewat',
          description: 'Missed >2 dosis dalam seminggu',
          action: 'medication_reminder',
          message: 'Penting untuk konsistensi minum obat'
        }
      ]
    },
    hypertension: {
      critical: [
        {
          condition: 'bp_crisis',
          title: 'Krisis Hipertensi',
          description: 'Tekanan darah >180/120 mmHg',
          symptoms: ['Sakit kepala hebat', 'Pandangan kabur', 'Nyeri dada'],
          action: 'emergency',
          message: 'BAHAYA - Segera ke IGD'
        }
      ],
      warning: [
        {
          condition: 'bp_high',
          title: 'Tekanan Darah Tinggi',
          description: 'Tekanan darah >160/100 mmHg',
          symptoms: ['Sakit kepala', 'Pusing', 'Tengkuk tegang'],
          action: 'doctor_consultation',
          message: 'Perlu penyesuaian obat'
        }
      ]
    },
    general: {
      critical: [
        {
          condition: 'chest_pain',
          title: 'Nyeri Dada',
          description: 'Nyeri dada yang tidak biasa',
          symptoms: ['Nyeri dada', 'Sesak napas', 'Keringat dingin'],
          action: 'emergency',
          message: 'Kemungkinan masalah jantung - Segera ke IGD'
        },
        {
          condition: 'severe_shortness_breath',
          title: 'Sesak Napas Berat',
          description: 'Kesulitan bernapas parah',
          symptoms: ['Tidak bisa berbaring', 'Bibir biru', 'Gelisah'],
          action: 'emergency',
          message: 'Gangguan pernapasan serius - Segera ke IGD'
        }
      ],
      warning: [
        {
          condition: 'persistent_fever',
          title: 'Demam Persisten',
          description: 'Demam >38.5°C lebih dari 3 hari',
          symptoms: ['Demam tinggi', 'Menggigil', 'Lemas'],
          action: 'doctor_consultation',
          message: 'Perlu evaluasi lebih lanjut'
        }
      ]
    }
  };

  const checkWarningConditions = (symptoms, vitals) => {
    const warnings = [];
    const patientCondition = patientData?.primaryDiagnosis?.toLowerCase() || 'general';
    
    let relevantWarnings = warningConditions.general;
    
    if (patientCondition.includes('diabetes')) {
      relevantWarnings = { ...warningConditions.general, ...warningConditions.diabetes };
    } else if (patientCondition.includes('hipertensi')) {
      relevantWarnings = { ...warningConditions.general, ...warningConditions.hypertension };
    }
    
    // Check critical conditions
    relevantWarnings.critical?.forEach(warning => {
      if (shouldTriggerWarning(warning, symptoms, vitals)) {
        warnings.push({ ...warning, severity: 'critical' });
      }
    });
    
    // Check warning conditions
    relevantWarnings.warning?.forEach(warning => {
      if (shouldTriggerWarning(warning, symptoms, vitals)) {
        warnings.push({ ...warning, severity: 'warning' });
      }
    });
    
    // Check info conditions
    relevantWarnings.info?.forEach(warning => {
      if (shouldTriggerWarning(warning, symptoms, vitals)) {
        warnings.push({ ...warning, severity: 'info' });
      }
    });
    
    return warnings;
  };

  const shouldTriggerWarning = (warning, symptoms, vitals) => {
    // Logic to determine if warning should be triggered
    // This would normally use more sophisticated AI/ML algorithms
    
    if (warning.condition === 'chest_pain') {
      return symptoms?.includes('chest_pain') || symptoms?.includes('nyeri_dada');
    }
    
    if (warning.condition === 'severe_shortness_breath') {
      return symptoms?.includes('shortness_of_breath') && riskLevel === 'high';
    }
    
    if (warning.condition === 'persistent_fever') {
      return symptoms?.includes('fever') && vitals?.temperature > 38.5;
    }
    
    // Add more condition checks based on symptoms and vitals
    return false;
  };

  const handleEmergencyAction = (warning) => {
    if (warning.action === 'emergency') {
      onEmergencyAlert?.({
        warning,
        timestamp: new Date(),
        patientData
      });
    } else if (warning.action === 'doctor_consultation') {
      onDoctorRecommendation?.({
        warning,
        urgency: warning.severity,
        timestamp: new Date(),
        patientData
      });
    }
  };

  const WarningCard = ({ warning, onAction }) => {
    const getWarningStyle = (severity) => {
      switch (severity) {
        case 'critical':
          return {
            border: 'border-red-500',
            bg: 'bg-red-50',
            text: 'text-red-800',
            icon: 'text-red-600',
            button: 'bg-red-600 hover:bg-red-700'
          };
        case 'warning':
          return {
            border: 'border-yellow-500',
            bg: 'bg-yellow-50',
            text: 'text-yellow-800',
            icon: 'text-yellow-600',
            button: 'bg-yellow-600 hover:bg-yellow-700'
          };
        default:
          return {
            border: 'border-blue-500',
            bg: 'bg-blue-50',
            text: 'text-blue-800',
            icon: 'text-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700'
          };
      }
    };

    const style = getWarningStyle(warning.severity);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`border-2 ${style.border} ${style.bg} rounded-xl p-4 mb-4`}
      >
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full bg-white ${style.icon}`}>
            {warning.severity === 'critical' && <ExclamationTriangleIcon className="h-6 w-6" />}
            {warning.severity === 'warning' && <ExclamationTriangleIcon className="h-6 w-6" />}
            {warning.severity === 'info' && <InformationCircleIcon className="h-6 w-6" />}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-semibold ${style.text} mb-1`}>
              {warning.title}
            </h3>
            <p className={`text-sm ${style.text} mb-2`}>
              {warning.description}
            </p>
            
            {warning.symptoms && (
              <div className="mb-3">
                <p className={`text-xs font-medium ${style.text} mb-1`}>Gejala:</p>
                <div className="flex flex-wrap gap-1">
                  {warning.symptoms.map((symptom, index) => (
                    <span 
                      key={index}
                      className={`px-2 py-1 bg-white ${style.text} text-xs rounded-full`}
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className={`text-sm font-medium ${style.text} mb-3`}>
              {warning.message}
            </div>
            
            <div className="flex space-x-2">
              {warning.action === 'emergency' && (
                <>
                  <button
                    onClick={() => {
                      onAction(warning);
                      window.open('tel:119');
                    }}
                    className={`flex items-center px-3 py-2 ${style.button} text-white text-sm rounded-lg font-medium transition-colors`}
                  >
                    <PhoneIcon className="h-4 w-4 mr-1" />
                    Panggil 119
                  </button>
                  <button
                    onClick={() => onAction(warning)}
                    className="flex items-center px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg font-medium transition-colors"
                  >
                    <CalendarDaysIcon className="h-4 w-4 mr-1" />
                    Hubungi Dokter
                  </button>
                </>
              )}
              
              {warning.action === 'doctor_consultation' && (
                <>
                  <button
                    onClick={() => onAction(warning)}
                    className={`flex items-center px-3 py-2 ${style.button} text-white text-sm rounded-lg font-medium transition-colors`}
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                    Konsultasi Dokter
                  </button>
                  <button
                    className="flex items-center px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg font-medium transition-colors"
                  >
                    <CalendarDaysIcon className="h-4 w-4 mr-1" />
                    Buat Appointment
                  </button>
                </>
              )}
              
              {warning.action === 'medication_reminder' && (
                <button
                  className={`flex items-center px-3 py-2 ${style.button} text-white text-sm rounded-lg font-medium transition-colors`}
                >
                  <DocumentTextIcon className="h-4 w-4 mr-1" />
                  Set Reminder
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Mock active warnings for demonstration
  const mockWarnings = [
    {
      condition: 'blood_sugar_high',
      title: 'Gula Darah Tinggi Terdeteksi',
      description: 'Hasil monitoring menunjukkan gula darah 250 mg/dL',
      symptoms: ['Haus berlebihan', 'Sering buang air kecil', 'Lemas'],
      action: 'doctor_consultation',
      message: 'Disarankan konsultasi dengan dokter dalam 24 jam untuk penyesuaian obat',
      severity: 'warning'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#1a2a3a]">
            Warning System
          </h3>
          <div className="flex items-center space-x-2">
            {activeWarnings.length === 0 ? (
              <>
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600 font-medium">Semua Normal</span>
              </>
            ) : (
              <>
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-600 font-medium">
                  {activeWarnings.length} Peringatan
                </span>
              </>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Sistem peringatan otomatis berdasarkan kondisi medis Anda
        </p>
      </div>
      
      <div className="p-6">
        <AnimatePresence>
          {mockWarnings.length > 0 ? (
            mockWarnings.map((warning, index) => (
              <WarningCard 
                key={index} 
                warning={warning} 
                onAction={handleEmergencyAction}
              />
            ))
          ) : (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Kondisi Anda Stabil
              </h4>
              <p className="text-gray-500">
                Tidak ada peringatan kesehatan saat ini. Lanjutkan rutinitas perawatan Anda.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Emergency Contacts */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Kontak Darurat</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.phone}</p>
                </div>
                <button
                  onClick={() => window.open(`tel:${contact.phone}`)}
                  className="p-2 bg-[#00a8cc] text-white rounded-lg hover:bg-[#0095b8] transition-colors"
                >
                  <PhoneIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
