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
      <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-white to-[#e3f0ff] flex items-center justify-center p-8">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Success Icon */}
          <motion.div 
            className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
            variants={fadeInScale}
          >
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.div>

          {/* Success Message */}
          <motion.h1 
            className="text-2xl font-bold text-[#1a2a3a] mb-3"
            variants={fadeInUp}
          >
            Email Terkirim!
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 mb-6"
            variants={fadeInUp}
          >
            Kami telah mengirimkan tautan reset password ke email <strong>{email}</strong>. 
            Silakan periksa kotak masuk Anda dan ikuti instruksi untuk mereset password.
          </motion.p>

          {/* Error & Success Messages for Email Sent State */}
          {error && (
            <motion.div 
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              variants={fadeInUp}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div 
              className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg"
              variants={fadeInUp}
            >
              {success}
            </motion.div>
          )}

          {/* Instructions */}
          <motion.div 
            className="bg-[#f0f7ff] rounded-lg p-4 mb-6 text-left"
            variants={fadeInUp}
          >
            <h3 className="font-semibold text-[#3570ff] mb-2">Langkah selanjutnya:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Periksa kotak masuk email Anda</li>
              <li>• Klik tautan reset password</li>
              <li>• Buat password baru</li>
              <li>• Login dengan password baru</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="space-y-3"
            variants={fadeInUp}
          >
            <button
              onClick={handleResendEmail}
              disabled={isLoading}
              className="w-full bg-[#3570ff] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#2856b6] transition-all duration-200 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim ulang...
                </div>
              ) : (
                "Kirim Ulang Email"
              )}
            </button>
            
            <Link 
              href="/auth/login" 
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium text-center hover:bg-gray-200 transition-all duration-200"
            >
              Kembali ke Login
            </Link>
          </motion.div>

          {/* Help Text */}
          <motion.p 
            className="text-xs text-gray-500 mt-6"
            variants={fadeInUp}
          >
            Tidak menerima email? Periksa folder spam atau{" "}
            <button 
              onClick={handleResendEmail}
              className="text-[#3570ff] hover:text-[#2856b6] font-medium"
            >
              kirim ulang
            </button>
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-white to-[#e3f0ff] flex items-center justify-center p-8">
      <motion.div 
        className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Left Side - Form */}
        <div className="flex-1 p-8 lg:p-12">
          {/* Logo */}
          <motion.div 
            className="flex items-center mb-8"
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

          {/* Back Button */}
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
          >
            <Link 
              href="/auth/login" 
              className="inline-flex items-center text-gray-600 hover:text-[#3570ff] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Login
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div 
            className="mb-8"
            variants={fadeInUp}
          >
            <h1 className="text-3xl font-bold text-[#1a2a3a] mb-3">
              Lupa Password?
            </h1>
            <p className="text-gray-600">
              Jangan khawatir, kami akan mengirimkan instruksi reset password ke email Anda.
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
              </div>
            )}
          </motion.div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={fadeInUp}
          >
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-black placeholder-gray-500"
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

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#3570ff] to-[#4e7fff] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
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
            </motion.button>

            {/* Help Text */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Ingat password Anda?{" "}
                <Link 
                  href="/auth/login" 
                  className="text-[#3570ff] hover:text-[#2856b6] font-medium"
                >
                  Login di sini
                </Link>
              </p>
            </div>
          </motion.form>

          {/* Additional Help */}
          <motion.div 
            className="mt-8 p-4 bg-[#f8fcff] rounded-lg border border-[#e3f0ff]"
            variants={fadeInUp}
          >
            <div className="flex items-start">
              <svg className="w-5 h-5 text-[#3570ff] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-medium text-[#3570ff] mb-1">Butuh bantuan?</h3>
                <p className="text-sm text-gray-600">
                  Jika Anda mengalami masalah dalam reset password, silakan hubungi tim support kami di{" "}
                  <a href="mailto:support@medlitik.com" className="text-[#3570ff] hover:text-[#2856b6] font-medium">
                    support@medlitik.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Illustration */}
        <motion.div 
          className="hidden lg:flex flex-1 bg-gradient-to-br from-[#3570ff] to-[#6ad7e5] relative overflow-hidden"
          variants={fadeInUp}
        >
          <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
            <motion.div 
              className="mb-8"
              variants={fadeInScale}
            >
              <Image
                src="https://placeholder.pics/svg/300x250/ffffff/3570ff/Security"
                alt="Security Illustration"
                width={300}
                height={250}
                className="drop-shadow-2xl"
              />
            </motion.div>
            
            <motion.h2 
              className="text-2xl font-bold mb-4 text-center"
              variants={fadeInUp}
            >
              Keamanan Terjamin
            </motion.h2>
            
            <motion.p 
              className="text-center opacity-90 mb-8"
              variants={fadeInUp}
            >
              Kami menggunakan enkripsi tingkat bank untuk melindungi data pribadi dan medis Anda.
            </motion.p>

            {/* Security Features */}
            <motion.div 
              className="space-y-3"
              variants={staggerContainer}
            >
              {[
                "Enkripsi end-to-end",
                "Verifikasi dua faktor",
                "Sertifikat ISO 27001",
                "Kepatuhan HIPAA"
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center"
                  variants={fadeInUp}
                >
                  <svg className="w-4 h-4 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-20 w-12 h-12 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
