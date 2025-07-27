export default function Footer() {
  return (
    <footer className="bg-[#1a2a3a] text-white py-14 px-4 mt-16 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start relative z-10">
        {/* Brand & Description */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-blue-100 shadow-md">
              <img src="/logo.svg" alt="Medlitik Logo" className="w-8 h-8" />
            </span>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">Medlitik</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-2">
            Mitra tepercaya Anda dalam keunggulan layanan kesehatan, berkomitmen memberikan layanan medis terbaik.
          </p>
          <div className="flex space-x-3 mt-4">
            <a href="/landing_page" className="text-white/60 hover:text-[#6ad7e5] text-xs font-medium transition">Beranda</a>
            <a href="/landing_page/dokter" className="text-white/60 hover:text-[#6ad7e5] text-xs font-medium transition">Dokter</a>
            <a href="/landing_page/tentang" className="text-white/60 hover:text-[#6ad7e5] text-xs font-medium transition">Tentang</a>
            <a href="/landing_page/kontak" className="text-white/60 hover:text-[#6ad7e5] text-xs font-medium transition">Kontak</a>
          </div>
        </div>
        {/* Layanan */}
        <div>
          <h5 className="font-bold text-lg mb-4 text-[#6ad7e5]">Layanan</h5>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Konsultasi Online</li>
            <li>Dokter Spesialis</li>
            <li>Vaksinasi</li>
            <li>Darurat</li>
            <li>Pusat Medis</li>
          </ul>
        </div>
        {/* Kontak */}
        <div>
          <h5 className="font-bold text-lg mb-4 text-[#6ad7e5]">Kontak</h5>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" className="text-[#6ad7e5]"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h7A2.5 2.5 0 0 1 15 5.5v7A2.5 2.5 0 0 1 12.5 15h-7A2.5 2.5 0 0 1 3 12.5v-7Z" strokeWidth="1.5"/><path d="M3.5 5.5 9 9.5l5.5-4" strokeWidth="1.5"/></svg>
              <a href="mailto:info@medlitik.com" className="hover:text-[#6ad7e5] transition">info@medlitik.com</a>
            </li>
            <li className="flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" className="text-[#6ad7e5]"><path d="M2.25 4.75A2.5 2.5 0 0 1 4.75 2.25h8.5a2.5 2.5 0 0 1 2.5 2.5v8.5a2.5 2.5 0 0 1-2.5 2.5h-8.5a2.5 2.5 0 0 1-2.5-2.5v-8.5Z" strokeWidth="1.5"/><path d="M4.75 7.25h8.5" strokeWidth="1.5"/><path d="M7.25 4.75v8.5" strokeWidth="1.5"/></svg>
              <span>Jl. Kesehatan 123, Kota Medis</span>
            </li>
            <li className="flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" className="text-[#6ad7e5]"><path d="M6.5 3.5a5 5 0 0 1 5 5c0 2.5-2.5 5-5 5s-5-2.5-5-5a5 5 0 0 1 5-5Z" strokeWidth="1.5"/><path d="M6.5 6.5v2.5l2 1" strokeWidth="1.5"/></svg>
              <a href="tel:1234567890" className="hover:text-[#6ad7e5] transition">(123) 456-7890</a>
            </li>
          </ul>
        </div>
        {/* Social Media */}
        <div>
          <h5 className="font-bold text-lg mb-4 text-[#6ad7e5]">Ikuti Kami</h5>
          <div className="flex gap-4">
            <a href="https://facebook.com/medlitik" target="_blank" rel="noopener" aria-label="Facebook" className="hover:scale-110 transition-transform">
              <svg width="22" height="22" fill="currentColor" className="text-white/70 hover:text-[#6ad7e5]"><path d="M13.5 8.5V7.25c0-.69.56-1.25 1.25-1.25h1V3.5h-2.25A3.25 3.25 0 0 0 10.25 6.75V8.5h-2v3h2v7h3v-7h2l.5-3h-2.5Z"/></svg>
            </a>
            <a href="https://twitter.com/medlitik" target="_blank" rel="noopener" aria-label="Twitter" className="hover:scale-110 transition-transform">
              <svg width="22" height="22" fill="currentColor" className="text-white/70 hover:text-[#6ad7e5]"><path d="M21 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 20.43 4c-.8.47-1.7.81-2.65.99A4.13 4.13 0 0 0 11.5 9.13c0 .32.04.64.1.94C7.72 9.9 4.1 8.13 1.67 5.15c-.35.6-.55 1.3-.55 2.05 0 1.42.72 2.68 1.82 3.42a4.07 4.07 0 0 1-1.87-.52v.05c0 1.98 1.41 3.63 3.28 4.01-.34.09-.7.14-1.07.14-.26 0-.51-.03-.76-.07.51 1.6 2 2.77 3.76 2.8A8.3 8.3 0 0 1 2 19.07a11.73 11.73 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 21 5.92Z"/></svg>
            </a>
            <a href="https://instagram.com/medlitik" target="_blank" rel="noopener" aria-label="Instagram" className="hover:scale-110 transition-transform">
              <svg width="22" height="22" fill="currentColor" className="text-white/70 hover:text-[#6ad7e5]"><circle cx="11" cy="11" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="2.5" y="2.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="16.5" cy="5.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="https://linkedin.com/company/medlitik" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
              <svg width="22" height="22" fill="currentColor" className="text-white/70 hover:text-[#6ad7e5]"><rect x="3" y="7" width="3" height="12" rx="1.5"/><circle cx="4.5" cy="4.5" r="1.5"/><rect x="8" y="7" width="3" height="7" rx="1.5"/><rect x="13" y="7" width="3" height="7" rx="1.5"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-base text-white/50 mt-12 pt-6 border-t border-white/10">
        © {new Date().getFullYear()} Medlitik. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
