import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};
const itemSlowFadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export default function ContactSection() {
  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
      id="contact"
    >
      <motion.div className="text-center mb-12" variants={itemSlowFadeIn}>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a2a3a] mb-4">
          Hubungi <span className="text-[#3570ff]">Kami</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ada pertanyaan atau butuh bantuan? Tim Medlitik siap membantu Anda.
        </p>
      </motion.div>
      <motion.div className="flex flex-col md:flex-row justify-center items-center gap-8" variants={itemSlowFadeIn}>
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4 text-[#3570ff]">Kontak Medlitik</h3>
          <p className="mb-2 text-gray-700">Email: <a href="mailto:support@medlitik.com" className="text-[#3570ff] hover:underline">support@medlitik.com</a></p>
          <p className="mb-2 text-gray-700">Telepon: <a href="tel:+6281234567890" className="text-[#3570ff] hover:underline">+62 812-3456-7890</a></p>
          <p className="mb-2 text-gray-700">Alamat: Jl. Kesehatan No. 10, Jakarta</p>
          <a href="mailto:support@medlitik.com" className="inline-block mt-6 bg-[#3570ff] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2856b6] transition">Kirim Email</a>
        </div>
      </motion.div>
    </motion.section>
  );
}
