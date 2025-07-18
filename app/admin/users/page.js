"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UsersManagement() {
  // User analytics data
  const [userAnalytics, setUserAnalytics] = useState({
    totalUsers: 1250,
    activeUsers: 875,
    inactiveUsers: 325,
    newUsersToday: 38,
    growthRate: 8.2,
    averageAge: 32,
    genderDistribution: {
      male: 45,
      female: 52,
      other: 3
    },
    regionDistribution: {
      jakarta: 35,
      bandung: 18,
      surabaya: 15,
      medan: 10,
      other: 22
    },
    userRetentionRate: 85,
    userEngagement: 68
  });

  // User trend data
  const [userTrends, setUserTrends] = useState({
    signups: [45, 52, 38, 41, 35, 38],
    activity: [820, 870, 910, 950, 980, 875],
    monthLabels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+62 812 3456 7890",
      type: "patient",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-07-18",
      consultations: 5
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+62 813 4567 8901",
      type: "patient",
      status: "active",
      joinDate: "2024-02-20",
      lastLogin: "2024-07-17",
      consultations: 12
    },
    {
      id: 3,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+62 814 5678 9012",
      type: "doctor",
      status: "verified",
      joinDate: "2024-01-10",
      lastLogin: "2024-07-18",
      consultations: 45
    },
    {
      id: 4,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+62 815 6789 0123",
      type: "patient",
      status: "inactive",
      joinDate: "2024-03-05",
      lastLogin: "2024-06-15",
      consultations: 2
    },
    {
      id: 5,
      name: "Dr. Michael Brown",
      email: "michael.brown@email.com",
      phone: "+62 816 7890 1234",
      type: "doctor",
      status: "pending",
      joinDate: "2024-07-15",
      lastLogin: "2024-07-18",
      consultations: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || user.type === filterType;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case "active":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "inactive":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case "verified":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getTypeBadge = (type) => {
    return type === "doctor" 
      ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
      : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800";
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
              <Link href="/admin" className="flex items-center">
                <Image
                  src="https://placeholder.pics/svg/40x40/3570ff/000000/Logo"
                  alt="Logo Medlitik"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-2xl font-bold text-[#3570ff]">Medlitik</span>
                <span className="ml-3 px-2 py-1 bg-[#3570ff] text-white text-xs rounded-full">Admin</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/admin" className="text-gray-600 hover:text-[#3570ff]">Dashboard</Link>
              <Link href="/admin/users" className="text-[#3570ff] font-medium">Users</Link>
              <Link href="/admin/doctors" className="text-gray-600 hover:text-[#3570ff]">Doctors</Link>
              <Link href="/admin/consultations" className="text-gray-600 hover:text-[#3570ff]">Consultations</Link>
              <Link href="/admin/reports" className="text-gray-600 hover:text-[#3570ff]">Reports</Link>
            </nav>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-[#3570ff]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5-5 5-5h-5m-6 10v-2a6 6 0 016-6v2a4 4 0 00-4 4v2z" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <Image
                  src="https://placeholder.pics/svg/32x32/3570ff/000000/Admin"
                  alt="Admin Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Analytics Dashboard */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {/* User Overview Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900">User Overview</h2>
                <p className="text-sm text-gray-500">Current platform statistics</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-sm font-semibold text-gray-900">{userAnalytics.totalUsers.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-sm font-semibold text-green-600">{userAnalytics.activeUsers.toLocaleString()} ({Math.round(userAnalytics.activeUsers/userAnalytics.totalUsers*100)}%)</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Inactive Users</p>
                <p className="text-sm font-semibold text-gray-500">{userAnalytics.inactiveUsers.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">New Today</p>
                <p className="text-sm font-semibold text-blue-600">+{userAnalytics.newUsersToday}</p>
              </div>
            </div>
          </div>

          {/* User Demographics Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Demographics</h2>
            
            {/* Gender Distribution */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Gender Distribution</p>
              <div className="flex h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500" 
                  style={{width: `${userAnalytics.genderDistribution.male}%`}}
                  title={`Male: ${userAnalytics.genderDistribution.male}%`}
                ></div>
                <div 
                  className="bg-pink-500" 
                  style={{width: `${userAnalytics.genderDistribution.female}%`}}
                  title={`Female: ${userAnalytics.genderDistribution.female}%`}
                ></div>
                <div 
                  className="bg-purple-500" 
                  style={{width: `${userAnalytics.genderDistribution.other}%`}}
                  title={`Other: ${userAnalytics.genderDistribution.other}%`}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Male: {userAnalytics.genderDistribution.male}%</span>
                <span>Female: {userAnalytics.genderDistribution.female}%</span>
                <span>Other: {userAnalytics.genderDistribution.other}%</span>
              </div>
            </div>
            
            {/* Region Distribution */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Top Regions</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-24 text-xs text-gray-600">Jakarta</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
                        style={{width: `${userAnalytics.regionDistribution.jakarta}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-xs text-gray-600">{userAnalytics.regionDistribution.jakarta}%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-xs text-gray-600">Bandung</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
                        style={{width: `${userAnalytics.regionDistribution.bandung}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-xs text-gray-600">{userAnalytics.regionDistribution.bandung}%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-xs text-gray-600">Surabaya</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
                        style={{width: `${userAnalytics.regionDistribution.surabaya}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-xs text-gray-600">{userAnalytics.regionDistribution.surabaya}%</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Engagement Metrics */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h2>
            
            {/* Retention Rate */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-600">Retention Rate</p>
                <p className="text-sm font-medium text-gray-900">{userAnalytics.userRetentionRate}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{width: `${userAnalytics.userRetentionRate}%`}}
                ></div>
              </div>
            </div>
            
            {/* Engagement Score */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-600">Engagement Score</p>
                <p className="text-sm font-medium text-gray-900">{userAnalytics.userEngagement}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{width: `${userAnalytics.userEngagement}%`}}
                ></div>
              </div>
            </div>
            
            {/* New User Trend */}
            <div>
              <p className="text-sm text-gray-600 mb-2">New User Trend</p>
              <div className="flex space-x-1">
                {userTrends.signups.map((value, index) => (
                  <div 
                    key={index} 
                    className="flex-1 bg-blue-100 rounded-sm relative overflow-hidden"
                    style={{ height: '40px' }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500" 
                      style={{ height: `${(value / Math.max(...userTrends.signups)) * 100}%` }}
                    ></div>
                    <div className="absolute bottom-0 w-full text-center text-xs text-blue-800">
                      {userTrends.monthLabels[index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">Kelola semua pengguna platform Medlitik</p>
            </div>
            <Link 
              href="/admin/users/new"
              className="bg-[#3570ff] text-white px-6 py-2 rounded-lg hover:bg-[#2856b6] transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New User
            </Link>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Users
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none"
                  placeholder="Search by name or email..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter by Type */}
            <div>
              <label htmlFor="filterType" className="block text-sm font-medium text-gray-700 mb-2">
                User Type
              </label>
              <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none"
              >
                <option value="all">All Types</option>
                <option value="patient">Patients</option>
                <option value="doctor">Doctors</option>
              </select>
            </div>

            {/* Filter by Status */}
            <div>
              <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Users Management
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {filteredUsers.length} users found
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-[#3570ff] rounded border-gray-300 focus:ring-[#3570ff]" />
                      <span className="ml-3">User</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Contact
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Type
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Status
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Activity
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Join Date
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-[#3570ff] rounded border-gray-300 focus:ring-[#3570ff]" />
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-3">
                          <Image
                            src={`https://placeholder.pics/svg/40x40/3570ff/FFFFFF/${user.name.substring(0, 2).toUpperCase()}`}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{user.email}</div>
                      <div className="text-xs text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${getTypeBadge(user.type)} flex items-center`}>
                        <span className={`w-2 h-2 rounded-full mr-1.5 ${
                          user.type === 'doctor' ? 'bg-purple-600' : 'bg-blue-600'
                        }`}></span>
                        {user.type === 'doctor' ? 'Doctor' : 'Patient'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${getStatusBadge(user.status)} flex items-center`}>
                        <span className={`w-2 h-2 rounded-full mr-1.5 ${
                          user.status === 'active' ? 'bg-green-600' :
                          user.status === 'inactive' ? 'bg-gray-600' :
                          user.status === 'verified' ? 'bg-blue-600' :
                          'bg-yellow-600'
                        }`}></span>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-900">{user.consultations} consultations</div>
                        <div className="text-xs text-gray-500">Last active: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('id-ID') : 'Never'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-900">{new Date(user.joinDate).toLocaleDateString('id-ID')}</div>
                        <div className="text-xs text-gray-500">{Math.floor((new Date() - new Date(user.joinDate)) / (1000 * 60 * 60 * 24))} days ago</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button className="text-[#3570ff] hover:text-[#2856b6] p-1 rounded-md hover:bg-blue-50">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <div className="group relative">
                          <button className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                          <div className="hidden group-hover:block absolute right-0 z-10 w-48 bg-white rounded-md shadow-lg py-1 mt-1 border border-gray-200">
                            <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              View Details
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                              Block User
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete User
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{filteredUsers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-[#3570ff] text-sm font-medium text-white">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    10
                  </button>
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
