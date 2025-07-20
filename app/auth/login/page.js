"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MedlitikLogo, GoogleIcon, FacebookIcon, MedicalIllustration } from "@/components/icons/Icons";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      
      if (user) {
        try {
          const userData = JSON.parse(user);
          console.log('User already logged in:', userData);
          
          // Instead of auto-redirect, we'll show a message to the user
          // They can choose to continue to dashboard or logout to login with different account
          setSuccess(`Anda sudah login sebagai ${userData.email}. Ingin melanjutkan ke dashboard atau logout untuk login dengan akun berbeda?`);
        } catch (e) {
          console.log('Error parsing stored user data:', e);
          // Clear invalid data
          localStorage.removeItem('user');
        }
      }
    };
    
    checkAuth();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContinueToDashboard = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        const targetUrl = userData.role === 'admin' ? '/admin' : 
                         userData.role === 'doctor' ? '/doctor' : 
                         userData.role === 'patient' ? '/user' : '/user';
        router.push(targetUrl);
      } catch (e) {
        console.log('Error parsing user data:', e);
        localStorage.removeItem('user');
      }
    }
  };

  const handleLogoutAndStay = () => {
    localStorage.removeItem('user');
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful! Redirecting...");
        
        // Simpan user data di localStorage (tanpa token)
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Debug logging
        console.log('Login response:', data);
        console.log('User role:', data.user.role);
        
        // Determine target URL
        const targetUrl = data.user.role === 'admin' ? '/admin' : 
                         data.user.role === 'doctor' ? '/doctor' : 
                         data.user.role === 'patient' ? '/user' : '/user';
        
        console.log('Target URL:', targetUrl);
        
        // Redirect langsung tanpa delay
        router.push(targetUrl);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-white to-[#e3f0ff] flex">
      {/* Left Side - Login Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div 
            className="flex items-center justify-center mb-8"
            variants={fadeInUp}
          >
            <MedlitikLogo size={40} className="mr-3" />
            <span className="text-3xl font-bold text-[#3570ff]">Medlitik</span>
          </motion.div>

          {/* Welcome Text */}
          <motion.div 
            className="text-center mb-8"
            variants={fadeInUp}
          >
            <h1 className="text-3xl font-bold text-[#1a2a3a] mb-2">
              Selamat Datang Kembali
            </h1>
            <p className="text-gray-600">
              Masuk ke akun Anda untuk mengakses layanan kesehatan terbaik
            </p>
            
            {/* Error & Success Messages */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {success}
                {success.includes('Anda sudah login sebagai') && (
                  <div className="mt-3 flex gap-3 flex-col sm:flex-row">
                    <button
                      onClick={handleContinueToDashboard}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Lanjutkan ke Dashboard
                    </button>
                    <button
                      onClick={handleLogoutAndStay}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Logout & Login dengan Akun Lain
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Login Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={fadeInUp}
          >
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-black placeholder-gray-500"
                  placeholder="Masukkan email Anda"
                  required
                  suppressHydrationWarning={true}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-black placeholder-gray-500"
                  placeholder="Masukkan password Anda"
                  required
                  suppressHydrationWarning={true}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  suppressHydrationWarning={true}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#3570ff] focus:ring-[#3570ff] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
              </label>
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-[#3570ff] hover:text-[#2856b6] font-medium"
              >
                Lupa password?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#3570ff] to-[#4e7fff] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              suppressHydrationWarning={true}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Masuk...
                </div>
              ) : (
                "Masuk"
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                suppressHydrationWarning={true}
              >
                <GoogleIcon size={18} className="mr-2" />
                <span className="text-sm font-medium text-gray-700">Google</span>
              </motion.button>
              <motion.button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                suppressHydrationWarning={true}
              >
                <FacebookIcon size={18} className="mr-2" />
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </motion.button>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link 
                href="/auth/register" 
                className="text-[#3570ff] hover:text-[#2856b6] font-medium"
              >
                Daftar sekarang
              </Link>
            </p>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Side - Image/Illustration */}
      <motion.div 
        className="hidden lg:flex flex-1 relative overflow-hidden"
        initial="initial"
        animate="animate"
        variants={fadeInRight}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#3570ff] to-[#6ad7e5]"></div>
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <motion.div 
            className="mb-8"
            variants={fadeInUp}
          >
            <MedicalIllustration width={300} height={200} className="mx-auto" />
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold mb-4 text-center"
            variants={fadeInUp}
          >
            Akses Kesehatan di Ujung Jari
          </motion.h2>
          <motion.p 
            className="text-lg text-center max-w-md opacity-90"
            variants={fadeInUp}
          >
            Konsultasi dengan dokter ahli, jadwalkan pemeriksaan, dan kelola kesehatan Anda dengan mudah melalui platform kami.
          </motion.p>
          
          {/* Features List */}
          <motion.div 
            className="mt-8 space-y-3"
            variants={staggerContainer}
          >
            {[
              "Konsultasi online 24/7",
              "Rekam medis digital",
              "Pengingat obat otomatis",
              "Jaringan dokter terpercaya"
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center"
                variants={fadeInLeft}
              >
                <svg className="w-5 h-5 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
