export default function Footer() {
  return (
    <footer className="bg-[#3570ff] text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-lg">Medlitik</span> &copy; {new Date().getFullYear()} All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="/landing_page" className="hover:underline">Beranda</a>
          <a href="/landing_page/dokter" className="hover:underline">Dokter</a>
          <a href="/landing_page/tentang" className="hover:underline">Tentang</a>
          <a href="/landing_page/kontak" className="hover:underline">Kontak</a>
        </div>
      </div>
    </footer>
  );
}
