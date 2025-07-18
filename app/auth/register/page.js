"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "patient", // only patient now
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      // Check password match
      if (name === 'password' || name === 'confirmPassword') {
        if (name === 'confirmPassword') {
          setPasswordMatch(value === prev.password);
        } else if (name === 'password') {
          setPasswordMatch(prev.confirmPassword === value);
        }
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Ensure userType is always patient
      const dataToSend = {
        ...formData,
        userType: 'patient'
      };
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        
        // Simpan token di localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect berdasarkan role
        setTimeout(() => {
          if (data.user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/user');
          }
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
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
      {/* Left Side - Image/Illustration */}
      <motion.div 
        className="hidden lg:flex flex-1 relative overflow-hidden"
        initial="initial"
        animate="animate"
        variants={fadeInLeft}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#6ad7e5] to-[#3570ff]"></div>
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <motion.div 
            className="mb-8"
            variants={fadeInUp}
          >
            <Image
              src="https://placeholder.pics/svg/400x300/ffffff/3570ff/Medical%20Register"
              alt="Medical Registration"
              width={400}
              height={300}
              className="drop-shadow-2xl"
            />
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold mb-4 text-center"
            variants={fadeInUp}
          >
            Bergabung dengan Komunitas Kesehatan
          </motion.h2>
          <motion.p 
            className="text-lg text-center max-w-md opacity-90"
            variants={fadeInUp}
          >
            Daftar sekarang dan nikmati layanan kesehatan terdepan dengan teknologi AI yang inovatif.
          </motion.p>
          
          {/* Benefits List */}
          <motion.div 
            className="mt-8 space-y-3"
            variants={staggerContainer}
          >
            {[
              "Gratis konsultasi pertama",
              "Akses ke 1000+ dokter",
              "Rekam medis seumur hidup",
              "Notifikasi kesehatan personal"
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="flex items-center"
                variants={fadeInRight}
              >
                <svg className="w-5 h-5 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Register Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div 
            className="flex items-center justify-center mb-6"
            variants={fadeInUp}
          >
            <Image
              src="https://placeholder.pics/svg/40x40/3570ff/000000/Logo"
              alt="Logo Medlitik"
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="text-2xl font-bold text-[#3570ff]">Medlitik</span>
          </motion.div>

          {/* Welcome Text */}
          <motion.div 
            className="text-center mb-6"
            variants={fadeInUp}
          >
            <h1 className="text-2xl font-bold text-[#1a2a3a] mb-2">
              Buat Akun Baru
            </h1>
            <p className="text-gray-600 text-sm">
              Bergabunglah dengan ribuan pengguna yang mempercayai kesehatan mereka kepada kami
            </p>
            
            {/* Error & Success Messages */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-left">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-left">
                {success}
              </div>
            )}
          </motion.div>

          {/* Welcome Message */}
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
          >
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <div>
                <p className="text-blue-800 text-sm font-medium">Selamat datang di Medlitik</p>
                <p className="text-blue-600 text-xs mt-0.5">Layanan kesehatan online terpercaya di Indonesia</p>
              </div>
            </div>
          </motion.div>

          {/* Register Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            variants={fadeInUp}
          >
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Depan
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-sm text-black placeholder-gray-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Belakang
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-sm text-black placeholder-gray-500"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-sm text-black placeholder-gray-500"
                placeholder="john.doe@example.com"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-sm text-black placeholder-gray-500"
                placeholder="+62 812 3456 7890"
                required
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-sm text-black placeholder-gray-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-sm text-black placeholder-gray-500 ${
                      !passwordMatch && formData.confirmPassword ? 'border-red-400' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                {!passwordMatch && formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Password tidak cocok</p>
                )}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#3570ff] focus:ring-[#3570ff] border-gray-300 rounded mt-0.5"
                required
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-xs text-gray-600">
                Saya setuju dengan{" "}
                <Link href="/terms" className="text-[#3570ff] hover:text-[#2856b6] font-medium">
                  Syarat & Ketentuan
                </Link>
                {" "}dan{" "}
                <Link href="/privacy" className="text-[#3570ff] hover:text-[#2856b6] font-medium">
                  Kebijakan Privasi
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !formData.agreeToTerms}
              className="w-full bg-gradient-to-r from-[#3570ff] to-[#4e7fff] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mendaftar...
                </div>
              ) : (
                "Daftar Sekarang"
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Atau daftar dengan</span>
              </div>
            </div>

            {/* Social Register Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="https://placeholder.pics/svg/18x18/4285f4/000000/Google"
                  alt="Google"
                  width={18}
                  height={18}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Google</span>
              </motion.button>
              <motion.button
                type="button"
                className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="https://placeholder.pics/svg/18x18/1877f2/000000/Facebook"
                  alt="Facebook"
                  width={18}
                  height={18}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </motion.button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link 
                href="/auth/login" 
                className="text-[#3570ff] hover:text-[#2856b6] font-medium"
              >
                Masuk di sini
              </Link>
            </p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
