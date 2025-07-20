'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftIcon,
  HeartIcon,
  ChartBarIcon,
  PlusIcon,
  TrophyIcon,
  CalendarDaysIcon,
  ClockIcon,
  FireIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function HealthTrackerPage() {
  const router = useRouter();
  const [selectedMetric, setSelectedMetric] = useState('blood_pressure');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ value: '', notes: '' });
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const healthMetrics = [
    {
      id: 'blood_pressure',
      name: 'Tekanan Darah',
      unit: 'mmHg',
      icon: HeartIcon,
      color: 'red',
      currentValue: '120/80',
      status: 'normal',
      goal: 'Jaga < 140/90',
      trend: 'stable',
      data: [
        { date: '2025-07-14', value: '118/78', notes: 'Setelah olahraga pagi' },
        { date: '2025-07-15', value: '120/80', notes: 'Kondisi normal' },
        { date: '2025-07-16', value: '122/82', notes: 'Setelah kerja' },
        { date: '2025-07-17', value: '119/79', notes: 'Pagi hari' },
        { date: '2025-07-18', value: '121/81', notes: 'Sore hari' },
        { date: '2025-07-19', value: '120/80', notes: 'Kondisi rileks' },
        { date: '2025-07-20', value: '118/78', notes: 'Setelah meditasi' }
      ]
    },
    {
      id: 'heart_rate',
      name: 'Detak Jantung',
      unit: 'bpm',
      icon: HeartIcon,
      color: 'pink',
      currentValue: '72',
      status: 'normal',
      goal: 'Jaga 60-100 bpm',
      trend: 'improving',
      data: [
        { date: '2025-07-14', value: '75', notes: 'Istirahat' },
        { date: '2025-07-15', value: '73', notes: 'Pagi hari' },
        { date: '2025-07-16', value: '74', notes: 'Setelah makan' },
        { date: '2025-07-17', value: '72', notes: 'Kondisi normal' },
        { date: '2025-07-18', value: '71', notes: 'Rileks' },
        { date: '2025-07-19', value: '73', notes: 'Sore hari' },
        { date: '2025-07-20', value: '72', notes: 'Stabil' }
      ]
    },
    {
      id: 'blood_sugar',
      name: 'Gula Darah',
      unit: 'mg/dL',
      icon: ChartBarIcon,
      color: 'blue',
      currentValue: '95',
      status: 'normal',
      goal: 'Jaga < 100 mg/dL',
      trend: 'stable',
      data: [
        { date: '2025-07-14', value: '98', notes: 'Puasa' },
        { date: '2025-07-15', value: '95', notes: 'Sebelum makan' },
        { date: '2025-07-16', value: '92', notes: 'Pagi hari' },
        { date: '2025-07-17', value: '96', notes: 'Puasa' },
        { date: '2025-07-18', value: '94', notes: 'Normal' },
        { date: '2025-07-19', value: '97', notes: 'Sebelum makan' },
        { date: '2025-07-20', value: '95', notes: 'Stabil' }
      ]
    },
    {
      id: 'weight',
      name: 'Berat Badan',
      unit: 'kg',
      icon: ChartBarIcon,
      color: 'green',
      currentValue: '68.5',
      status: 'normal',
      goal: 'Target: 65 kg',
      trend: 'declining',
      data: [
        { date: '2025-07-14', value: '69.2', notes: 'Pagi hari' },
        { date: '2025-07-15', value: '69.0', notes: 'Setelah olahraga' },
        { date: '2025-07-16', value: '68.8', notes: 'Diet sehat' },
        { date: '2025-07-17', value: '68.6', notes: 'Konsisten' },
        { date: '2025-07-18', value: '68.7', notes: 'Naik sedikit' },
        { date: '2025-07-19', value: '68.5', notes: 'Target tercapai' },
        { date: '2025-07-20', value: '68.4', notes: 'Progress baik' }
      ]
    },
    {
      id: 'steps',
      name: 'Langkah Harian',
      unit: 'steps',
      icon: FireIcon,
      color: 'orange',
      currentValue: '8,450',
      status: 'good',
      goal: 'Target: 10,000 steps',
      trend: 'improving',
      data: [
        { date: '2025-07-14', value: '7,850', notes: 'Aktif' },
        { date: '2025-07-15', value: '8,200', notes: 'Jalan pagi' },
        { date: '2025-07-16', value: '8,650', notes: 'Naik tangga' },
        { date: '2025-07-17', value: '8,100', notes: 'Santai' },
        { date: '2025-07-18', value: '8,900', notes: 'Olahraga' },
        { date: '2025-07-19', value: '8,450', notes: 'Konsisten' },
        { date: '2025-07-20', value: '8,750', notes: 'Semangat' }
      ]
    },
    {
      id: 'sleep',
      name: 'Durasi Tidur',
      unit: 'jam',
      icon: ClockIcon,
      color: 'purple',
      currentValue: '7.5',
      status: 'good',
      goal: 'Target: 7-9 jam',
      trend: 'stable',
      data: [
        { date: '2025-07-14', value: '7.2', notes: 'Cukup' },
        { date: '2025-07-15', value: '7.8', notes: 'Nyenyak' },
        { date: '2025-07-16', value: '7.0', notes: 'Begadang sedikit' },
        { date: '2025-07-17', value: '7.5', notes: 'Normal' },
        { date: '2025-07-18', value: '8.0', notes: 'Tidur lebih awal' },
        { date: '2025-07-19', value: '7.3', notes: 'Baik' },
        { date: '2025-07-20', value: '7.5', notes: 'Stabil' }
      ]
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Konsisten 7 Hari',
      description: 'Mencatat kesehatan selama 7 hari berturut-turut',
      icon: CheckCircleIcon,
      earned: true,
      date: '2025-07-20'
    },
    {
      id: 2,
      title: 'Target Berat Badan',
      description: 'Mencapai target berat badan ideal',
      icon: TrophyIcon,
      earned: false,
      progress: 85
    },
    {
      id: 3,
      title: '10,000 Steps Master',
      description: 'Mencapai 10,000 langkah dalam sehari',
      icon: FireIcon,
      earned: false,
      progress: 84
    }
  ];

  const currentMetric = healthMetrics.find(m => m.id === selectedMetric);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving':
        return (
          <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'declining':
        return (
          <svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'stable':
      default:
        return (
          <svg className="h-4 w-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const handleAddEntry = () => {
    if (newEntry.value.trim()) {
      // Here you would normally save to backend
      console.log('Adding new entry:', {
        metric: selectedMetric,
        value: newEntry.value,
        notes: newEntry.notes,
        date: new Date().toISOString().split('T')[0]
      });
      setNewEntry({ value: '', notes: '' });
      setShowAddModal(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short'
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
                Health Tracker
              </h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#00a8cc] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0095b8] transition-colors flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Tambah Data</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Metrics Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2a3a]">
                  Metrik Kesehatan
                </h3>
              </div>
              
              <div className="p-2">
                {healthMetrics.map((metric) => (
                  <motion.button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`w-full p-4 rounded-lg mb-2 text-left transition-all ${
                      selectedMetric === metric.id
                        ? 'bg-blue-50 border border-[#00a8cc]'
                        : 'hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                        <metric.icon className={`h-5 w-5 text-${metric.color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {metric.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {metric.currentValue} {metric.unit}
                        </p>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2a3a]">
                  Pencapaian
                </h3>
              </div>
              
              <div className="p-4 space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`p-3 rounded-lg border ${
                    achievement.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <achievement.icon className={`h-5 w-5 ${
                          achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {achievement.description}
                        </p>
                        {achievement.progress && !achievement.earned && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <div className="mt-1 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-[#00a8cc] h-1.5 rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Metric Overview */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedMetric}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-${currentMetric.color}-100`}>
                    <currentMetric.icon className={`h-8 w-8 text-${currentMetric.color}-600`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1a2a3a]">
                      {currentMetric.name}
                    </h2>
                    <p className="text-gray-600">{currentMetric.goal}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#1a2a3a] mb-1">
                    {currentMetric.currentValue}
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(currentMetric.status)}`}>
                      {currentMetric.status === 'normal' ? 'Normal' :
                       currentMetric.status === 'good' ? 'Baik' :
                       currentMetric.status === 'warning' ? 'Perhatian' :
                       'Kritis'}
                    </span>
                    {getTrendIcon(currentMetric.trend)}
                  </div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Trend 7 Hari Terakhir</h3>
                  <div className="flex space-x-2">
                    {['week', 'month', '3months'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1 text-xs rounded-full ${
                          selectedPeriod === period
                            ? 'bg-[#00a8cc] text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {period === 'week' ? '7 Hari' :
                         period === 'month' ? '1 Bulan' :
                         '3 Bulan'}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Simple Chart Visualization */}
                <div className="h-40 flex items-end space-x-2">
                  {currentMetric.data.slice(-7).map((entry, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full bg-${currentMetric.color}-500 rounded-t-md opacity-70 hover:opacity-100 transition-opacity`}
                        style={{ 
                          height: `${60 + (index * 10)}px`, // Simple visualization
                        }}
                        title={`${entry.date}: ${entry.value} ${currentMetric.unit}`}
                      />
                      <div className="text-xs text-gray-500 mt-2">
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Entries */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2a3a]">
                  Entri Terbaru - {currentMetric.name}
                </h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {currentMetric.data.slice().reverse().map((entry, index) => (
                  <motion.div 
                    key={index}
                    className="p-4 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {formatDate(entry.date)}
                          </span>
                        </div>
                        <div className="text-lg font-semibold text-[#00a8cc]">
                          {entry.value} {currentMetric.unit}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.notes}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Entry Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
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
                  Tambah Data - {currentMetric.name}
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nilai ({currentMetric.unit})
                  </label>
                  <input
                    type="text"
                    value={newEntry.value}
                    onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
                    placeholder={`Masukkan nilai ${currentMetric.name.toLowerCase()}`}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan (Opsional)
                  </label>
                  <textarea
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                    placeholder="Tambahkan catatan tentang pengukuran ini..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a8cc] focus:border-[#00a8cc] resize-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleAddEntry}
                    disabled={!newEntry.value.trim()}
                    className="flex-1 py-3 bg-[#00a8cc] text-white rounded-lg font-medium hover:bg-[#0095b8] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Simpan
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
