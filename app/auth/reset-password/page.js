"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password || !confirmPassword) {
      setError("Password dan konfirmasi password wajib diisi.");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        Swal.fire({
          icon: "success",
          title: "Password berhasil direset",
          text: "Silakan login dengan password baru.",
          confirmButtonText: "Login",
        }).then(() => {
          router.push("/auth/login");
        });
      } else {
        setError(data.error || "Gagal reset password.");
        Swal.fire({
          icon: "error",
          title: "Gagal reset password",
          text: data.error || "Gagal reset password.",
        });
      }
    } catch (err) {
      setError("Terjadi masalah jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#f0f7ff] via-white to-[#e3f0ff] flex">
      {/* Left Side - Reset Password Form */}
      <div className="w-full lg:w-3/7 flex items-center justify-center p-2">
        <div className="w-full max-w-md min-h-[480px] flex flex-col justify-center py-10">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <Link href="/landing_page" className="flex items-center">
              <Image src="/logo.svg" alt="Logo Medlitik" width={48} height={48} className="mr-1" priority />
              <span className="text-2xl font-bold text-[#3570ff]">Medlitik</span>
            </Link>
          </div>
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-[#1a2a3a] mb-1">Reset Password</h1>
            <p className="text-gray-600 text-sm">Masukkan password baru Anda di bawah ini.</p>
          </div>
          {/* Error & Success Messages */}
          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}
          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-black placeholder-gray-500"
                placeholder="Password baru"
                required
                minLength={8}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3570ff] focus:border-transparent outline-none transition-all duration-200 bg-white/80 text-black placeholder-gray-500"
                placeholder="Ulangi password baru"
                required
                minLength={8}
              />
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
                  Mengubah Password...
                </div>
              ) : (
                "Ubah Password"
              )}
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Ingat password Anda?{' '}
                <Link href="/auth/login" className="text-[#3570ff] hover:text-[#2856b6] font-medium">Login di sini</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* Right Side - Image/Illustration */}
      <div className="hidden lg:flex w-4/7 h-full relative overflow-hidden items-center justify-center bg-gradient-to-br from-[#3570ff] to-[#6ad7e5] p-0 m-0">
        <Image src="/bg/reset.jpg" alt="Forgot Illustration" className="object-cover w-full h-full" width={800} height={800} />
      </div>
    </div>
  );
} 