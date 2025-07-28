"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { signIn } from 'next-auth/react';

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
  const [isGoogleEmail, setIsGoogleEmail] = useState(false);

  const searchParams = useSearchParams();
  useEffect(() => {
    const emailFromGoogle = searchParams.get('email');
    if (emailFromGoogle) {
      setFormData(prev => ({ ...prev, email: emailFromGoogle }));
      setIsGoogleEmail(true);
      Swal.fire({
        icon: 'info',
        title: 'Akun tidak terdaftar',
        text: 'Silahkan daftar terlebih dahulu.',
        confirmButtonText: 'OK',
      });
    } else {
      setIsGoogleEmail(false);
    }
  }, [searchParams]);

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

  // Handler untuk daftar dengan Google
  const handleGoogleRegister = () => {
    signIn('google');
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
      {/* Left Side - Image/Illustration (fixed, tidak ikut scroll) */}
      <motion.div 
        className="hidden lg:flex w-4/7 h-screen fixed left-0 top-0 z-0 overflow-hidden items-center justify-center bg-gradient-to-br from-[#6ad7e5] to-[#3570ff] p-0 m-0"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img src="/bg/register.jpg" alt="Register Illustration" className="object-cover w-full h-full" />
      </motion.div>

      {/* Right Side - Register Form (scrollable) */}
      <motion.div 
        className="w-full lg:ml-[57.15%] lg:w-3/7 min-h-screen flex items-center justify-center p-8 relative z-10 bg-transparent"
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
          <Link href="/landing_page" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Logo Medlitik"
              width={48}
              height={48}
              className="mr-1"
              priority
            />
            <span className="text-2xl font-bold text-[#3570ff]">Medlitik</span>
            </Link>
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
                readOnly={isGoogleEmail}
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
                <span className="px-2 text-gray-500">Atau daftar dengan</span>
              </div>
            </div>

            {/* Social Register Buttons */}
            <div className="grid grid-cols-1 gap-2">
              <motion.button
                type="button"
                className="flex items-center justify-center w-full px-0 py-0 h-11 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition-all duration-200 shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                suppressHydrationWarning={true}
                onClick={handleGoogleRegister}
              >
                <span className="flex items-center justify-center flex-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <g clipPath="url(#clip0_17_40)">
                      <path d="M19.805 10.2305C19.805 9.55078 19.7483 8.86719 19.6267 8.19922H10.2V12.0508H15.6408C15.4175 13.2695 14.6733 14.3203 13.6242 15.0117V17.2617H16.7275C18.5275 15.6016 19.805 13.1836 19.805 10.2305Z" fill="#4285F4"/>
                      <path d="M10.2 20C12.6975 20 14.7975 19.1836 16.3275 17.2617L13.6242 15.0117C12.7975 15.5703 11.6733 15.9023 10.2 15.9023C7.7975 15.9023 5.77325 14.2266 5.04825 12.0508H1.82751V14.3711C3.37325 17.5703 6.57325 20 10.2 20Z" fill="#34A853"/>
                      <path d="M5.04825 12.0508C4.77325 11.292 4.61751 10.4805 4.61751 9.64062C4.61751 8.80078 4.77325 7.98828 5.04825 7.23047V4.91016H1.82751C1.14918 6.32031 0.805054 7.92969 0.805054 9.64062C0.805054 11.3516 1.14918 12.9609 1.82751 14.3711L5.04825 12.0508Z" fill="#FBBC05"/>
                      <path d="M10.2 3.37891C11.7733 3.37891 13.1483 3.92188 14.1867 4.91016L16.3975 2.69922C14.7975 1.18359 12.6975 0 10.2 0C6.57325 0 3.37325 2.42969 1.82751 5.62891L5.04825 7.23047C5.77325 5.05469 7.7975 3.37891 10.2 3.37891Z" fill="#EA4335"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_17_40">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="font-medium text-gray-700 text-sm">Daftar dengan Google</span>
                </span>
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
