"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MedlitikLogo, GoogleIcon, FacebookIcon, MedicalIllustration } from "@/components/icons/Icons";
import Swal from 'sweetalert2';
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation';

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

  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  // Redirect jika sudah login dengan Google (NextAuth session)
  useEffect(() => {
    console.log('Session:', session, 'Status:', status);
    if (status === "authenticated" && session?.user?.role) {
      const targetUrl = session.user.role === 'admin' ? '/admin/dashboard' : 
                       session.user.role === 'doctor' ? '/doctor/dashboard' : '/user/dashboard';
      console.log('Redirecting to:', targetUrl);
      router.push(targetUrl);
    }
  }, [session, status, router]);

  // Redirect jika login Google gagal karena user tidak terdaftar
  useEffect(() => {
    const error = searchParams.get('error');
    const email = searchParams.get('email');
    if (error === 'OAuthAccountNotLinked' && email) {
      // Redirect ke register dengan email Google
      router.replace(`/auth/register?email=${encodeURIComponent(email)}`);
    }
  }, [searchParams, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
        // Simpan user data di localStorage (tanpa token)
        localStorage.setItem('user', JSON.stringify(data.user));
        // SweetAlert success
        await Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Anda akan diarahkan ke dashboard.',
          timer: 1500,
          showConfirmButton: true,
          confirmButtonText: 'OK',
        });
        // Redirect
        const targetUrl = data.user.role === 'admin' ? '/admin/dashboard' : 
                         data.user.role === 'doctor' ? '/doctor/dashboard' : '/user/dashboard';
        router.push(targetUrl);
      } else {
        // SweetAlert error
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: data.error || 'Login failed',
        });
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Terjadi masalah jaringan. Silakan coba lagi.'
      });
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler untuk login Google
  const handleGoogleLogin = () => {
    signIn("google");
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
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#f0f7ff] via-white to-[#e3f0ff] flex">
      {/* Left Side - Login Form */}
      <motion.div 
        className="w-full lg:w-3/7 flex items-center justify-center p-2"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="w-full max-w-md min-h-[480px] flex flex-col justify-center py-10">
          {/* Logo */}
          <motion.div 
            className="flex items-center justify-center mb-4"
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
            className="text-center mb-4"
            variants={fadeInUp}
          >
            <h1 className="text-2xl font-bold text-[#1a2a3a] mb-1">
              Selamat Datang Kembali
            </h1>
            <p className="text-gray-600 text-sm">
              Masuk ke akun Anda untuk mengakses layanan kesehatan terbaik
            </p>
            {/* Error & Success Messages (hidden, now using SweetAlert) */}
          </motion.div>

          {/* Login Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            variants={fadeInUp}
          >
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-black placeholder-gray-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-black placeholder-gray-500"
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
                <span className="ml-2 text-xs text-gray-600">Ingat saya</span>
              </label>
              <Link 
                href="/auth/forgot-password" 
                className="text-xs text-[#3570ff] hover:text-[#2856b6] font-medium"
              >
                Lupa password?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#3570ff] to-[#4e7fff] text-white py-2 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-base"
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
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-1 gap-2">
              <motion.button
                type="button"
                className="flex items-center justify-center w-full px-0 py-0 h-11 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition-all duration-200 shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                suppressHydrationWarning={true}
                onClick={handleGoogleLogin}
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
                  <span className="font-medium text-gray-700 text-sm">Login dengan Google</span>
                </span>
              </motion.button>
            </div>

            {/* Register Link */}
            <p className="text-center text-xs text-gray-600">
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
        className="hidden lg:flex w-4/7 h-full relative overflow-hidden items-center justify-center bg-gradient-to-br from-[#3570ff] to-[#6ad7e5] p-0 m-0"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img src="/bg/login.jpg" alt="Login Illustration" className="object-cover w-full h-full" />
      </motion.div>
    </div>
  );
}
