"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AIMonitoring() {
  const router = useRouter();
  const [aiStats, setAiStats] = useState({
    // Core Performance Metrics
    totalSessions: 2340,
    todaySessions: 185,
    averageAccuracy: 95.2,
    averageResponseTime: 0.3,
    
    // AI Cost & Resource Metrics
    monthlyAICost: 125000000, // IDR
    dailyAICost: 4200000,
    costPerSession: 1800,
    totalTokensUsed: 8540000,
    monthlyTokenCost: 89500000,
    inferenceOperations: 156000,
    
    // AI Development & Learning Metrics
    modelTrainingHours: 2840,
    trainingCost: 45000000,
    dataProcessingCost: 12500000,
    storageAndBackupCost: 8200000,
    
    // Recovery Program Metrics
    activePrograms: 234,
    completedPrograms: 1186,
    successRate: 94.5,
    averageDuration: 28,
    
    // AI Performance Evolution
    modelIterations: 47,
    accuracyImprovement: 8.3, // percentage improvement over 6 months
    responseTimeImprovement: 45.2, // percentage improvement
    costEfficiencyGain: 23.1, // percentage cost reduction per operation
    
    // Resource Utilization
    gpuUtilization: 78.5,
    memoryUsage: 12.8, // GB
    storageUsed: 2.4, // TB
    bandwidthUsed: 845, // GB
    
    // User Engagement Metrics
    userSatisfactionScore: 4.6,
    returnUserRate: 78.3,
    averageSessionDuration: 12.5,
    
    // AI Learning & Improvement
    modelVersion: "v2.1.4",
    lastModelUpdate: "2024-07-18",
    trainingDataSize: "1.2M cases",
    learningAccuracy: 96.8,
    
    // ROI & Financial Analysis
    roiPercentage: 285,
    totalRevenue: 850000000,
    costSavings: 320000000,
    monthlyRevenue: 142000000,
    efficiencyImprovement: 45,
    patientSatisfaction: 4.8,
    recoverySuccessRate: 87,
    initialInvestment: 450000000,
    monthlyOperationalCost: 85000000,
    totalInvestment: 960000000,
    
    // Advanced Analytics
    accuracyImprovement: 18,
    responseTimeImprovement: 32,
    errorReduction: 47,
    predictedSessions: 12500,
    predictedRevenue: 185000000,
    predictedCosts: 135000000,
    cachingSavings: 25000000,
    batchOptimization: 15,
    compressionGain: 85,
    
    // Cost Breakdown
    computeCost: 45000000,
    apiCalls: 12500000,
    dataStorage: 8200000,
    modelTraining: 32000000,
    infrastructure: 18500000,
    monitoring: 4200000
  });

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    currentLoad: 23,
    queuedRequests: 2,
    processingTime: 0.28,
    apiStatus: "healthy",
    modelStatus: "active",
    databaseStatus: "optimal"
  });

  const [aiTrends, setAiTrends] = useState({
    accuracyTrend: [93.2, 93.8, 94.1, 94.7, 95.0, 95.2],
    usageTrend: [1850, 1920, 2010, 2150, 2280, 2340],
    responseTrend: [0.4, 0.35, 0.32, 0.31, 0.3, 0.3],
    successRateTrend: [92.1, 92.8, 93.4, 93.9, 94.2, 94.5],
    monthLabels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    
    // Cost Trends
    monthlyCostTrend: [98000000, 108000000, 115000000, 119000000, 122000000, 125000000],
    costPerSessionTrend: [2100, 2000, 1950, 1870, 1830, 1800],
    tokenUsageTrend: [6800000, 7200000, 7650000, 8100000, 8320000, 8540000],
    
    // Model Development Evolution
    modelVersionHistory: [
      { version: 'v1.0', accuracy: 87.2, date: '2024-01-15', trainingCost: 65000000 },
      { version: 'v1.5', accuracy: 89.8, date: '2024-03-10', trainingCost: 58000000 },
      { version: 'v2.0', accuracy: 93.1, date: '2024-05-20', trainingCost: 52000000 },
      { version: 'v2.1', accuracy: 94.8, date: '2024-06-25', trainingCost: 48000000 },
      { version: 'v2.1.4', accuracy: 95.2, date: '2024-07-18', trainingCost: 45000000 }
    ],
    
    // Cost Allocation
    costBreakdown: [
      { category: 'Model Training', amount: 32000000, percentage: 25.6 },
      { category: 'Compute Infrastructure', amount: 45000000, percentage: 36.0 },
      { category: 'API Operations', amount: 12500000, percentage: 10.0 },
      { category: 'Data Storage', amount: 18500000, percentage: 14.8 },
      { category: 'Monitoring & Analytics', amount: 8200000, percentage: 6.6 },
      { category: 'Research & Development', amount: 8800000, percentage: 7.0 }
    ],
    
    topInteractions: [
      { type: 'Recovery Plan Generation', count: 145, percentage: 32, cost: 261000 },
      { type: 'Warning Sign Detection', count: 98, percentage: 22, cost: 176400 },
      { type: 'Lifestyle Recommendations', count: 87, percentage: 19, cost: 156600 },
      { type: 'Progress Monitoring', count: 76, percentage: 17, cost: 136800 },
      { type: 'Emergency Alerts', count: 45, percentage: 10, cost: 81000 }
    ],
    
    recentActivities: [
      { id: 1, type: 'model_updated', details: 'Model v2.1.4 deployed', cost: 45000000, time: '2 hours ago', success: true },
      { id: 2, type: 'training_completed', details: 'Batch training on 50K new cases', cost: 8500000, time: '5 hours ago', success: true },
      { id: 3, type: 'optimization_applied', details: 'Response time optimization', cost: 2100000, time: '8 hours ago', success: true },
      { id: 4, type: 'data_processed', details: 'Medical dataset expansion', cost: 6200000, time: '12 hours ago', success: true },
      { id: 5, type: 'infrastructure_scaled', details: 'GPU cluster expansion', cost: 15000000, time: '1 day ago', success: true }
    ],
    
    // Innovation Pipeline
    innovationPipeline: [
      { feature: 'Advanced Symptom Prediction', status: 'in_progress', timeline: 'Q1 2025' },
      { feature: 'Multi-language Support', status: 'testing', timeline: 'Q2 2025' },
      { feature: 'Emotion Recognition AI', status: 'planned', timeline: 'Q3 2025' },
      { feature: 'Real-time Vitals Integration', status: 'planned', timeline: 'Q4 2025' },
      { feature: 'Personalized Recovery Plans', status: 'in_progress', timeline: 'Q1 2025' }
    ]
  });

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      localStorage.removeItem('user');
      router.push('/landing_page');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('user');
      router.push('/landing_page');
    }
  };

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

  const getActivityIcon = (type) => {
    switch (type) {
      case 'model_updated':
        return '🚀';
      case 'training_completed':
        return '🎓';
      case 'optimization_applied':
        return '⚡';
      case 'data_processed':
        return '📊';
      case 'infrastructure_scaled':
        return '🔧';
      case 'recovery_completed':
        return '✅';
      case 'warning_detected':
        return '⚠️';
      case 'plan_generated':
        return '📋';
      case 'alert_sent':
        return '🚨';
      case 'monitoring_update':
        return '�';
      default:
        return '🤖';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      healthy: { bg: 'bg-green-100', text: 'text-green-800', label: 'Healthy' },
      active: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Active' },
      optimal: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Optimal' }
    };
    
    const config = statusConfig[status] || statusConfig.healthy;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="https://placeholder.pics/svg/40x40/3570ff/000000/Logo"
                alt="Logo Medlitik"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-2xl font-bold text-[#3570ff]">Medlitik</span>
              <span className="ml-3 px-2 py-1 bg-[#3570ff] text-white text-xs rounded-full">Admin</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/admin" className="text-gray-600 hover:text-[#3570ff]">Dashboard</Link>
              <Link href="/admin/users" className="text-gray-600 hover:text-[#3570ff]">Users</Link>
              <Link href="/admin/doctors" className="text-gray-600 hover:text-[#3570ff]">Doctors</Link>
              <Link href="/admin/consultations" className="text-gray-600 hover:text-[#3570ff]">Consultations</Link>
              <Link href="/admin/ai" className="text-[#3570ff] font-medium">AI Monitoring</Link>
              <Link href="/admin/reports" className="text-gray-600 hover:text-[#3570ff]">Reports</Link>
            </nav>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="https://placeholder.pics/svg/32x32/3570ff/000000/Admin"
                  alt="Admin Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Admin User</span>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Recovery Assistant Monitoring</h1>
                <p className="text-gray-600">Monitor performance, analyze trends, and manage AI capabilities</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">AI System Online</span>
              </div>
              <button className="bg-[#3570ff] text-white px-4 py-2 rounded-lg hover:bg-[#2856b6] transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </motion.div>

        {/* Real-time System Status */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div className="bg-white rounded-xl p-4 border border-gray-100" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Current Load</span>
              <span className="text-sm font-bold text-gray-900">{realTimeMetrics.currentLoad}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${realTimeMetrics.currentLoad}%` }}
              ></div>
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-4 border border-gray-100" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Queue</span>
              <span className="text-sm font-bold text-gray-900">{realTimeMetrics.queuedRequests}</span>
            </div>
            <div className="text-xs text-gray-600">Queued requests</div>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-4 border border-gray-100" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Response</span>
              <span className="text-sm font-bold text-gray-900">{realTimeMetrics.processingTime}s</span>
            </div>
            <div className="text-xs text-gray-600">Processing time</div>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-4 border border-gray-100" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">API Status</span>
              {getStatusBadge(realTimeMetrics.apiStatus)}
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-4 border border-gray-100" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Model Status</span>
              {getStatusBadge(realTimeMetrics.modelStatus)}
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-4 border border-gray-100" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Database</span>
              {getStatusBadge(realTimeMetrics.databaseStatus)}
            </div>
          </motion.div>
        </motion.div>

        {/* AI Development & Cost Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Monthly AI Cost */}
          <motion.div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm p-6 border border-red-200" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-red-600 font-medium">Monthly AI Cost</p>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(aiStats.monthlyAICost)}</p>
              </div>
              <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Daily: {formatCurrency(aiStats.dailyAICost)}</span>
              <span className="text-red-700 font-medium">-2.3% vs last month</span>
            </div>
          </motion.div>

          {/* Model Development Progress */}
          <motion.div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-6 border border-blue-200" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-blue-600 font-medium">Model Accuracy</p>
                <p className="text-2xl font-bold text-blue-900">{aiStats.averageAccuracy}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-600">Improved: +{aiStats.accuracyImprovement}%</span>
              <span className="text-green-600 font-medium">Above target</span>
            </div>
          </motion.div>

          {/* Cost Efficiency */}
          <motion.div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6 border border-green-200" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-green-600 font-medium">Cost per Session</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(aiStats.costPerSession)}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Efficiency: +{aiStats.costEfficiencyGain}%</span>
              <span className="text-green-700 font-medium">Optimized</span>
            </div>
          </motion.div>

          {/* Model Iterations */}
          <motion.div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm p-6 border border-purple-200" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-purple-600 font-medium">Model Iterations</p>
                <p className="text-2xl font-bold text-purple-900">{aiStats.modelIterations}</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-600">Current: v{aiStats.modelVersion}</span>
              <span className="text-purple-700 font-medium">Latest</span>
            </div>
          </motion.div>
        </motion.div>

        {/* AI Development & Cost Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Cost Breakdown & Analysis */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">AI Cost Analysis & Resource Allocation</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Monthly Total</p>
                  <p className="text-lg font-bold text-red-600">{formatCurrency(aiStats.monthlyAICost)}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* Cost Breakdown */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Cost Distribution by Category</h3>
                <div className="space-y-4">
                  {aiTrends.costBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 font-medium">{item.category}</span>
                          <div className="text-right">
                            <span className="text-gray-900 font-semibold">{formatCurrency(item.amount)}</span>
                            <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              index === 0 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                              index === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                              index === 2 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                              index === 3 ? 'bg-gradient-to-r from-purple-400 to-purple-500' :
                              index === 4 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                              'bg-gradient-to-r from-pink-400 to-pink-500'
                            }`}
                            style={{ width: `${Math.min(item.percentage * 2, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Cost Trend */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Monthly Cost Trend</h3>
                  <span className="text-sm text-red-600 font-medium">+2.5% vs last month</span>
                </div>
                <div className="h-24 relative">
                  <div className="flex items-end justify-between h-full space-x-1">
                    {aiTrends.monthlyCostTrend.map((value, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-gradient-to-t from-red-500 to-red-300 rounded-t"
                          style={{ height: `${(value / Math.max(...aiTrends.monthlyCostTrend)) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{aiTrends.monthLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cost Efficiency Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-green-800">{formatCurrency(aiStats.costPerSession)}</p>
                  <p className="text-xs text-green-700">Cost per Session</p>
                  <p className="text-xs text-green-600">-12% vs last month</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-blue-800">{formatNumber(aiStats.totalTokensUsed)}</p>
                  <p className="text-xs text-blue-700">Tokens Used</p>
                  <p className="text-xs text-blue-600">+15% vs last month</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-purple-800">{aiStats.costEfficiencyGain}%</p>
                  <p className="text-xs text-purple-700">Efficiency Gain</p>
                  <p className="text-xs text-purple-600">6 months improvement</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Model Development Timeline */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-100"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Model Development Timeline</h2>
            </div>
            <div className="p-6">
              {/* Current Model Status */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Current Model v{aiStats.modelVersion}</p>
                      <p className="text-xs text-gray-600">Deployed: {aiStats.lastModelUpdate}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-white rounded p-2 text-center">
                      <p className="text-sm font-bold text-blue-800">{aiStats.averageAccuracy}%</p>
                      <p className="text-xs text-gray-600">Accuracy</p>
                    </div>
                    <div className="bg-white rounded p-2 text-center">
                      <p className="text-sm font-bold text-green-800">{formatCurrency(aiStats.trainingCost)}</p>
                      <p className="text-xs text-gray-600">Training Cost</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Training Hours</span>
                    <span className="text-sm font-medium">{formatNumber(aiStats.modelTrainingHours)}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Dataset Size</span>
                    <span className="text-sm font-medium">{aiStats.trainingDataSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Learning Accuracy</span>
                    <span className="text-sm font-medium text-green-600">{aiStats.learningAccuracy}%</span>
                  </div>
                </div>
              </div>

              {/* Model Version History */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Version History</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {aiTrends.modelVersionHistory.map((version, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-blue-500' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{version.version}</p>
                          <p className="text-xs text-gray-500">{version.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-900 font-medium">{version.accuracy}%</p>
                        <p className="text-xs text-gray-500">{formatCurrency(version.trainingCost)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Usage */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Current Resource Usage</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">GPU Utilization</span>
                      <span className="text-gray-900">{aiStats.gpuUtilization}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${aiStats.gpuUtilization}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Memory Usage</span>
                      <span className="text-gray-900">{aiStats.memoryUsage} GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(aiStats.memoryUsage/32)*100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Storage Used</span>
                      <span className="text-gray-900">{aiStats.storageUsed} TB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(aiStats.storageUsed/10)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Trends */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Performance Trends</h2>
              <select className="text-sm border border-gray-300 rounded-md p-1">
                <option>Last 6 months</option>
                <option>Last 3 months</option>
                <option>Last month</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Accuracy Trend */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Accuracy Trend</p>
                <div className="h-20 relative">
                  <div className="flex items-end justify-between h-full">
                    {aiTrends.accuracyTrend.map((value, index) => (
                      <div key={index} className="flex flex-col items-center w-8">
                        <div 
                          className="w-2 bg-green-500 rounded-t"
                          style={{ height: `${((value - 90) / 10) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{aiTrends.monthLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Usage Trend */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Usage Trend</p>
                <div className="h-20 relative">
                  <div className="flex items-end justify-between h-full">
                    {aiTrends.usageTrend.map((value, index) => (
                      <div key={index} className="flex flex-col items-center w-8">
                        <div 
                          className="w-2 bg-blue-500 rounded-t"
                          style={{ height: `${(value / Math.max(...aiTrends.usageTrend)) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{aiTrends.monthLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response Time Trend */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Response Time</p>
                <div className="h-20 relative">
                  <div className="flex items-end justify-between h-full">
                    {aiTrends.responseTrend.map((value, index) => (
                      <div key={index} className="flex flex-col items-center w-8">
                        <div 
                          className="w-2 bg-orange-500 rounded-t"
                          style={{ height: `${(1 - value) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{aiTrends.monthLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Success Rate Trend */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Success Rate</p>
                <div className="h-20 relative">
                  <div className="flex items-end justify-between h-full">
                    {aiTrends.successRateTrend.map((value, index) => (
                      <div key={index} className="flex flex-col items-center w-8">
                        <div 
                          className="w-2 bg-purple-500 rounded-t"
                          style={{ height: `${((value - 90) / 10) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{aiTrends.monthLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROI Analysis & Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ROI & Financial Impact Analysis */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-100"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">AI ROI & Financial Impact</h2>
              </div>
            </div>
            <div className="p-6">
              {/* ROI Overview */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-green-800">{aiStats.roiPercentage}%</p>
                  <p className="text-sm text-green-700 font-medium">Total ROI (6 Months)</p>
                  <p className="text-xs text-green-600">Revenue improvement vs investment</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-emerald-800">{formatCurrency(aiStats.totalRevenue)}</p>
                    <p className="text-xs text-emerald-700">Revenue Generated</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-teal-800">{formatCurrency(aiStats.costSavings)}</p>
                    <p className="text-xs text-teal-700">Cost Savings</p>
                  </div>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Monthly Revenue Impact</p>
                    <p className="text-xs text-gray-600">Average per month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-800">{formatCurrency(aiStats.monthlyRevenue)}</p>
                    <p className="text-xs text-green-600">+18% vs manual process</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Operational Efficiency</p>
                    <p className="text-xs text-gray-600">Time & resource optimization</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-800">{aiStats.efficiencyImprovement}%</p>
                    <p className="text-xs text-blue-600">Faster processing</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Patient Satisfaction Score</p>
                    <p className="text-xs text-gray-600">AI-assisted recovery</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-800">{aiStats.patientSatisfaction}/5.0</p>
                    <p className="text-xs text-purple-600">+0.8 improvement</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Recovery Success Rate</p>
                    <p className="text-xs text-gray-600">AI-guided outcomes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-800">{aiStats.recoverySuccessRate}%</p>
                    <p className="text-xs text-indigo-600">+12% vs baseline</p>
                  </div>
                </div>
              </div>

              {/* Investment Breakdown */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Investment Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Initial Development</span>
                    <span className="font-medium">{formatCurrency(aiStats.initialInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Operations</span>
                    <span className="font-medium">{formatCurrency(aiStats.monthlyOperationalCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training & Updates</span>
                    <span className="font-medium">{formatCurrency(aiStats.trainingCost)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Total 6-Month Cost</span>
                      <span className="text-red-700">{formatCurrency(aiStats.totalInvestment)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advanced AI Analytics & Insights */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-100"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Advanced AI Insights & Predictions</h2>
              </div>
            </div>
            <div className="p-6">
              {/* AI Performance Trends */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Performance Evolution (6 Months)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Model Accuracy Improvement</span>
                      <span className="text-green-600 font-medium">+{aiStats.accuracyImprovement}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${aiStats.accuracyImprovement * 4}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Response Time Optimization</span>
                      <span className="text-blue-600 font-medium">-{aiStats.responseTimeImprovement}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${aiStats.responseTimeImprovement * 3}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Error Reduction</span>
                      <span className="text-purple-600 font-medium">-{aiStats.errorReduction}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${aiStats.errorReduction * 2}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Predictive Analytics */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Predictive Analytics & Forecasting</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">Next Month Prediction</span>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">95% Confidence</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Expected Sessions</span>
                        <span className="font-semibold text-blue-900">{formatNumber(aiStats.predictedSessions)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Estimated Revenue</span>
                        <span className="font-semibold text-blue-900">{formatCurrency(aiStats.predictedRevenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Projected Costs</span>
                        <span className="font-semibold text-blue-900">{formatCurrency(aiStats.predictedCosts)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">⚠️</span>
                      <span className="text-sm font-medium text-amber-900">Risk Assessment</span>
                    </div>
                    <div className="space-y-1 text-xs text-amber-800">
                      <p>• Model performance may decline without training data refresh</p>
                      <p>• Increased costs expected due to higher usage</p>
                      <p>• Recommend infrastructure scaling preparation</p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">💡</span>
                      <span className="text-sm font-medium text-green-900">Optimization Opportunities</span>
                    </div>
                    <div className="space-y-1 text-xs text-green-800">
                      <p>• Implement caching for {formatCurrency(aiStats.cachingSavings)} monthly savings</p>
                      <p>• Batch processing could reduce costs by {aiStats.batchOptimization}%</p>
                      <p>• Model compression may improve response time by {aiStats.compressionGain}ms</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Innovation Pipeline */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Innovation Pipeline</h3>
                <div className="space-y-2">
                  {aiTrends.innovationPipeline.map((innovation, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          innovation.status === 'in_progress' ? 'bg-blue-500' :
                          innovation.status === 'testing' ? 'bg-yellow-500' :
                          innovation.status === 'planned' ? 'bg-gray-400' : 'bg-green-500'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{innovation.feature}</p>
                          <p className="text-xs text-gray-500">Expected: {innovation.timeline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          innovation.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          innovation.status === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                          innovation.status === 'planned' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {innovation.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
