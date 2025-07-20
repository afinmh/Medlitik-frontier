'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  HeartIcon,
  ChartBarIcon,
  BellIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function ScheduledMonitoring({ 
  aiSessionId, 
  patientData, 
  onHealthUpdate,
  onDoctorAlert 
}) {
  const [currentCheckIn, setCurrentCheckIn] = useState(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState({
    overallCondition: '',
    painLevel: 5,
    symptoms: [],
    medicationAdherence: 0,
    notes: ''
  });
  const [checkInHistory, setCheckInHistory] = useState([]);
  const [nextCheckIn, setNextCheckIn] = useState(null);
  const [riskAssessment, setRiskAssessment] = useState(null);

  useEffect(() => {
    // Initialize monitoring schedule
    initializeMonitoringSchedule();
    loadCheckInHistory();
  }, [aiSessionId]);

  const initializeMonitoringSchedule = () => {
    // Calculate next check-in based on condition severity and last consultation
    const now = new Date();
    const nextWeekly = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextMonthly = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    setNextCheckIn({
      weekly: nextWeekly,
      monthly: nextMonthly,
      type: 'weekly' // or 'monthly' based on condition
    });
  };

  const loadCheckInHistory = () => {
    // Load previous check-ins from API
    // This would normally fetch from database
    const mockHistory = [
      {
        id: 1,
        date: new Date('2025-01-13'),
        type: 'weekly',
        overallCondition: 'improving',
        painLevel: 3,
        aiAssessment: 'positive_progress',
        requiresDoctorVisit: false
      },
      {
        id: 2,
        date: new Date('2025-01-06'),
        type: 'weekly',
        overallCondition: 'stable',
        painLevel: 4,
        aiAssessment: 'stable_condition',
        requiresDoctorVisit: false
      }
    ];
    
    setCheckInHistory(mockHistory);
  };

  const handleStartCheckIn = (type) => {
    setCurrentCheckIn({ type, date: new Date() });
    setIsCheckInOpen(true);
    
    // Reset health metrics
    setHealthMetrics({
      overallCondition: '',
      painLevel: 5,
      symptoms: [],
      medicationAdherence: 0,
      notes: ''
    });
  };

  const handleSymptomToggle = (symptom) => {
    setHealthMetrics(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const submitCheckIn = async () => {
    const checkInData = {
      sessionId: aiSessionId,
      date: currentCheckIn.date,
      type: currentCheckIn.type,
      ...healthMetrics
    };

    // AI Assessment based on responses
    const assessment = performAIAssessment(healthMetrics);
    
    const checkInRecord = {
      ...checkInData,
      aiAssessment: assessment.status,
      requiresDoctorVisit: assessment.requiresDoctorVisit,
      recommendations: assessment.recommendations,
      riskLevel: assessment.riskLevel
    };

    // Save check-in (API call)
    console.log('Saving check-in:', checkInRecord);
    
    // Update history
    setCheckInHistory(prev => [checkInRecord, ...prev]);
    
    // Update risk assessment
    setRiskAssessment(assessment);
    
    // Trigger callbacks
    onHealthUpdate?.(checkInRecord);
    
    if (assessment.requiresDoctorVisit) {
      onDoctorAlert?.(checkInRecord);
    }
    
    // Close check-in
    setIsCheckInOpen(false);
    setCurrentCheckIn(null);
    
    // Schedule next check-in
    scheduleNextCheckIn(assessment);
  };

  const performAIAssessment = (metrics) => {
    let riskLevel = 'low';
    let requiresDoctorVisit = false;
    let recommendations = [];
    
    // Pain level assessment
    if (metrics.painLevel >= 8) {
      riskLevel = 'high';
      requiresDoctorVisit = true;
      recommendations.push('Nyeri tinggi memerlukan evaluasi medis segera');
    } else if (metrics.painLevel >= 6) {
      riskLevel = 'medium';
      recommendations.push('Pertimbangkan penyesuaian pengobatan nyeri');
    }
    
    // Overall condition assessment
    if (metrics.overallCondition === 'worsening') {
      riskLevel = 'high';
      requiresDoctorVisit = true;
      recommendations.push('Kondisi memburuk, perlu konsultasi dokter');
    } else if (metrics.overallCondition === 'stable') {
      recommendations.push('Lanjutkan perawatan saat ini');
    } else if (metrics.overallCondition === 'improving') {
      recommendations.push('Progress baik, pertahankan rutinitas');
    }
    
    // Medication adherence
    if (metrics.medicationAdherence < 50) {
      riskLevel = riskLevel === 'low' ? 'medium' : riskLevel;
      recommendations.push('Tingkatkan kepatuhan minum obat');
    }
    
    // Symptom assessment
    const criticalSymptoms = ['chest_pain', 'shortness_of_breath', 'severe_headache'];
    const hasCriticalSymptoms = metrics.symptoms.some(s => criticalSymptoms.includes(s));
    
    if (hasCriticalSymptoms) {
      riskLevel = 'high';
      requiresDoctorVisit = true;
      recommendations.push('Gejala serius detected, segera hubungi dokter');
    }
    
    return {
      status: metrics.overallCondition === 'improving' ? 'positive_progress' : 
              metrics.overallCondition === 'worsening' ? 'concerning_decline' : 'stable_condition',
      riskLevel,
      requiresDoctorVisit,
      recommendations,
      confidenceScore: 0.85
    };
  };

  const scheduleNextCheckIn = (assessment) => {
    const now = new Date();
    let nextCheckInDate;
    
    if (assessment.riskLevel === 'high') {
      // Daily check-in for high risk
      nextCheckInDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    } else if (assessment.riskLevel === 'medium') {
      // Every 3 days for medium risk
      nextCheckInDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    } else {
      // Weekly for low risk
      nextCheckInDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
    
    setNextCheckIn({
      date: nextCheckInDate,
      type: assessment.riskLevel === 'high' ? 'daily' : 
            assessment.riskLevel === 'medium' ? 'frequent' : 'weekly'
    });
  };

  const commonSymptoms = [
    { id: 'pain', label: 'Nyeri/sakit', icon: '😣' },
    { id: 'fatigue', label: 'Kelelahan', icon: '😴' },
    { id: 'nausea', label: 'Mual', icon: '🤢' },
    { id: 'dizziness', label: 'Pusing', icon: '😵' },
    { id: 'chest_pain', label: 'Nyeri dada', icon: '💔' },
    { id: 'shortness_of_breath', label: 'Sesak napas', icon: '🫁' },
    { id: 'severe_headache', label: 'Sakit kepala hebat', icon: '🤕' },
    { id: 'fever', label: 'Demam', icon: '🌡️' },
    { id: 'cough', label: 'Batuk', icon: '😷' },
    { id: 'stomach_pain', label: 'Sakit perut', icon: '🤮' }
  ];

  if (isCheckInOpen) {
    return (
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#1a2a3a] mb-2">
              {currentCheckIn?.type === 'weekly' ? 'Check-in Mingguan' : 'Check-in Bulanan'}
            </h2>
            <p className="text-gray-600 text-sm">
              Mari evaluasi kondisi kesehatan Anda saat ini
            </p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Overall Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Bagaimana kondisi Anda secara keseluruhan?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'improving', label: 'Membaik', icon: '😊', color: 'green' },
                  { value: 'stable', label: 'Stabil', icon: '😐', color: 'yellow' },
                  { value: 'worsening', label: 'Memburuk', icon: '😟', color: 'red' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setHealthMetrics(prev => ({ ...prev, overallCondition: option.value }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      healthMetrics.overallCondition === option.value
                        ? `border-${option.color}-500 bg-${option.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Pain Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Level nyeri/ketidaknyamanan (0 = tidak ada, 10 = sangat parah)
              </label>
              <div className="px-3">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={healthMetrics.painLevel}
                  onChange={(e) => setHealthMetrics(prev => ({ ...prev, painLevel: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span className="font-medium text-lg">{healthMetrics.painLevel}</span>
                  <span>10</span>
                </div>
              </div>
            </div>
            
            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gejala yang Anda rasakan saat ini:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => handleSymptomToggle(symptom.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      healthMetrics.symptoms.includes(symptom.id)
                        ? 'border-[#00a8cc] bg-blue-50 text-[#00a8cc]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{symptom.icon}</span>
                    <span className="text-sm">{symptom.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Medication Adherence */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Seberapa baik Anda mengikuti jadwal minum obat? (0% - 100%)
              </label>
              <div className="px-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={healthMetrics.medicationAdherence}
                  onChange={(e) => setHealthMetrics(prev => ({ ...prev, medicationAdherence: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span className="font-medium text-lg">{healthMetrics.medicationAdherence}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
            
            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Catatan tambahan (opsional):
              </label>
              <textarea
                value={healthMetrics.notes}
                onChange={(e) => setHealthMetrics(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Ceritakan kondisi atau keluhan lain yang Anda rasakan..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a8cc] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex space-x-3">
            <button
              onClick={() => setIsCheckInOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={submitCheckIn}
              disabled={!healthMetrics.overallCondition}
              className="flex-1 px-4 py-2 bg-[#00a8cc] text-white rounded-lg hover:bg-[#0095b8] disabled:opacity-50 transition-colors"
            >
              Kirim Check-in
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#1a2a3a]">
            Monitoring Kesehatan
          </h3>
          <div className="flex items-center space-x-2">
            <BellIcon className="h-5 w-5 text-[#00a8cc]" />
            <span className="text-sm text-[#00a8cc] font-medium">Aktif</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          AI akan memantau progress pemulihan Anda secara berkala
        </p>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Next Check-in */}
        {nextCheckIn && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[#1a2a3a] mb-1">
                  Check-in Berikutnya
                </h4>
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarDaysIcon className="h-4 w-4 mr-1" />
                  {nextCheckIn.date?.toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <button
                onClick={() => handleStartCheckIn(nextCheckIn.type)}
                className="px-4 py-2 bg-[#00a8cc] text-white rounded-lg text-sm font-medium hover:bg-[#0095b8] transition-colors"
              >
                Mulai Check-in
              </button>
            </div>
          </div>
        )}
        
        {/* Risk Assessment */}
        {riskAssessment && (
          <div className={`rounded-lg p-4 ${
            riskAssessment.riskLevel === 'high' ? 'bg-red-50 border border-red-200' :
            riskAssessment.riskLevel === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                riskAssessment.riskLevel === 'high' ? 'bg-red-100' :
                riskAssessment.riskLevel === 'medium' ? 'bg-yellow-100' :
                'bg-green-100'
              }`}>
                {riskAssessment.riskLevel === 'high' && <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />}
                {riskAssessment.riskLevel === 'medium' && <ClockIcon className="h-5 w-5 text-yellow-600" />}
                {riskAssessment.riskLevel === 'low' && <CheckCircleIcon className="h-5 w-5 text-green-600" />}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[#1a2a3a] mb-1">
                  Penilaian AI Terkini
                </h4>
                <p className={`text-sm mb-2 ${
                  riskAssessment.riskLevel === 'high' ? 'text-red-700' :
                  riskAssessment.riskLevel === 'medium' ? 'text-yellow-700' :
                  'text-green-700'
                }`}>
                  Risk Level: {riskAssessment.riskLevel.toUpperCase()}
                </p>
                <div className="space-y-1">
                  {riskAssessment.recommendations.map((rec, index) => (
                    <p key={index} className="text-xs text-gray-600">
                      • {rec}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Check-in History */}
        <div>
          <h4 className="font-medium text-[#1a2a3a] mb-3">Riwayat Check-in</h4>
          <div className="space-y-3">
            {checkInHistory.slice(0, 3).map((checkIn) => (
              <div key={checkIn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    checkIn.aiAssessment === 'positive_progress' ? 'bg-green-100' :
                    checkIn.aiAssessment === 'concerning_decline' ? 'bg-red-100' :
                    'bg-yellow-100'
                  }`}>
                    {checkIn.aiAssessment === 'positive_progress' && <CheckCircleIcon className="h-4 w-4 text-green-600" />}
                    {checkIn.aiAssessment === 'concerning_decline' && <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />}
                    {checkIn.aiAssessment === 'stable_condition' && <ChartBarIcon className="h-4 w-4 text-yellow-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {checkIn.date.toLocaleDateString('id-ID')}
                    </p>
                    <p className="text-xs text-gray-500">
                      Pain Level: {checkIn.painLevel}/10 • {checkIn.overallCondition}
                    </p>
                  </div>
                </div>
                {checkIn.requiresDoctorVisit && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Perlu Dokter
                  </span>
                )}
              </div>
            ))}
          </div>
          
          {checkInHistory.length > 3 && (
            <button className="w-full mt-3 text-sm text-[#00a8cc] hover:underline">
              Lihat semua riwayat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
