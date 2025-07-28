import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection({ fadeIn }) {
  return (
    <section className="py-20 bg-[#f0f7ff]">
      <div className="max-w-3xl mx-auto px-4 flex justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="w-full"
        >
          <div className="bg-white rounded-3xl shadow-lg border border-blue-50 px-8 py-14 flex flex-col items-center">
            <div className="flex justify-center mb-4">
              <span className="relative inline-block">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e0eaff] to-[#f0f7ff] blur-sm opacity-80 w-full h-full"></span>
                <span className="relative px-5 py-2 bg-white text-[#3570ff] font-semibold rounded-full text-sm tracking-wide shadow-sm border border-blue-100">
                  Bergabung Sekarang
                </span>
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2a3a] mb-3 tracking-tight text-center">
              Siap Menjadi Bagian dari Transformasi Kesehatan?
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-light mb-8 text-center max-w-xl">
              Bergabunglah bersama kami untuk menciptakan masa depan layanan kesehatan yang lebih baik di Indonesia.
            </p>
            <Link href="/auth/register" className="inline-block px-8 py-3 bg-[#3570ff] text-white font-semibold rounded-full shadow-md hover:bg-[#2856b6] transition-colors text-base">
              Daftar Sekarang
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
