import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full px-4 py-2 flex items-center bg-white/90 shadow-lg transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      style={{ minHeight: 64 }}
    >
      {/* Logo & Brand */}
      <div className="flex items-center space-x-3 pl-0 md:pl-4">
        <Image
          src="/logo.svg"
          alt="Logo Medlitik"
          width={44}
          height={44}
          priority
        />
        <span className="text-2xl font-bold text-[#3570ff] tracking-tight">Medlitik</span>
      </div>
      {/* Centered Nav */}
      <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-10 px-2 py-1">
        {[
          { label: "Beranda", href: "/landing_page" },
          { label: "Dokter", href: "/landing_page/dokter" },
          { label: "Tentang", href: "/landing_page/tentang" },
          { label: "Kontak", href: "/landing_page/kontak" },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="relative text-gray-700 font-semibold text-base px-1 py-0.5 transition-colors duration-200 hover:text-[#3570ff]"
          >
            <span className="inline-block pb-0.5 border-b-2 border-transparent hover:border-[#3570ff] transition-all duration-200">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
      {/* Button Masuk di kanan */}
      <div className="flex-1 flex justify-end">
        <button
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
          }}
          className="ml-4 bg-gradient-to-r from-[#3570ff] to-[#4e7fff] text-white font-bold px-8 py-2 rounded-full shadow-xl border border-white/30 hover:scale-105 hover:ring-2 hover:ring-[#3570ff] hover:shadow-2xl transition-all duration-200 focus:outline-none"
        >
          Masuk
        </button>
      </div>
      <div className="md:hidden">
        <svg className="w-6 h-6 text-[#3570ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </div>
    </header>
  );
}
