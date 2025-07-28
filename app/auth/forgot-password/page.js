"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setIsEmailSent(true);
      } else {
        setError(data.error || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Reset email sent again!");
      } else {
        setError(data.error || 'Failed to resend email');
      }
    } catch (error) {
      console.error('Resend email error:', error);
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

  const fadeInScale = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isEmailSent) {
    return (
      <div className="h-screen overflow-hidden bg-gradient-to-br from-[#f0f7ff] via-white to-[#e3f0ff] flex">
        <div className="w-full flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center flex flex-col items-center justify-center mt-12">
          {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            </div>
          {/* Success Message */}
            <h1 className="text-2xl font-bold text-[#1a2a3a] mb-3">Email Terkirim!</h1>
            <p className="text-gray-600 mb-6">
              Kami telah mengirimkan tautan reset password ke email <strong>{email}</strong>.<br />
            Silakan periksa kotak masuk Anda dan ikuti instruksi untuk mereset password.
            </p>
            <Link 
              href="/auth/login" 
              className="block w-full bg-[#3570ff] text-white py-3 px-6 rounded-xl font-semibold text-center hover:bg-[#2856b6] transition-all duration-200 mt-2"
            >
              Kembali ke Login
            </Link>
            <p className="text-xs text-gray-500 mt-6">
              Tidak menerima email? Periksa folder spam atau <button onClick={handleResendEmail} className="text-[#3570ff] hover:text-[#2856b6] font-medium">kirim ulang</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#f0f7ff] via-white to-[#e3f0ff] flex">
      {/* Left Side - Forgot Password Form */}
      <motion.div 
        className="w-full lg:w-3/7 flex items-center justify-center p-2"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="w-full max-w-md min-h-[480px] flex flex-col justify-center py-10">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
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
          </div>

          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-[#1a2a3a] mb-1">Lupa Password?</h1>
            <p className="text-gray-600 text-sm">Masukkan email Anda untuk reset password.</p>
          </div>
            
            {/* Error & Success Messages */}
            {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>
            )}
            {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>
            )}

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-black placeholder-gray-500"
                  placeholder="Masukkan email Anda"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#3570ff] to-[#4e7fff] text-white py-2 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </div>
              ) : (
                "Kirim Instruksi Reset"
              )}
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Ingat password Anda?{' '}
                <Link href="/auth/login" className="text-[#3570ff] hover:text-[#2856b6] font-medium">Login di sini</Link>
              </p>
            </div>
            {/* Motivational/Instructional Text */}
            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start shadow-sm">
                <div className="mr-3 mt-1">
                  <svg className="w-6 h-6 text-[#3570ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-base font-semibold text-[#3570ff] mb-1">Jangan khawatir, kami siap membantu!</h2>
                  <p className="text-gray-700 text-sm mb-1">Masukkan email yang terdaftar di Medlitik. Jika email ditemukan, kami akan mengirimkan kode reset password ke email Anda.</p>
                  <p className="text-gray-500 text-xs">Pastikan email yang Anda masukkan benar dan aktif. Jika tidak menerima email, cek folder spam atau gunakan fitur kirim ulang.</p>
                </div>
              </div>
            </div>
          </form>
        </div>
            </motion.div>
      {/* Right Side - Image/Illustration */}
            <motion.div 
        className="hidden lg:flex w-4/7 h-full relative overflow-hidden items-center justify-center bg-gradient-to-br from-[#3570ff] to-[#6ad7e5] p-0 m-0"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image src="/bg/forgot.jpg" alt="Forgot Illustration" className="object-cover w-full h-full" width={800} height={800} />
      </motion.div>
    </div>
  );
}
