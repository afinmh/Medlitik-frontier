import { motion } from "framer-motion";
import Image from "next/image";

export default function ValuesSection({ fadeIn, staggerContainer, itemFadeIn, values }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex justify-center mb-5">
            <span className="relative inline-block">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e0eaff] to-[#f0f7ff] blur-sm opacity-80 w-full h-full"></span>
              <span className="relative px-5 py-2 bg-white text-[#3570ff] font-semibold rounded-full text-sm tracking-wide shadow-sm border border-blue-100">
                Landasan Nilai
              </span>
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2a3a] mb-3 tracking-tight">
            Prinsip yang Memandu Kami
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg font-normal">
            Nilai-nilai inti kami membentuk dasar dari segala hal yang kami lakukan, memandu keputusan kami dan memastikan bahwa kami selalu mengutamakan kepentingan pasien.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="group bg-white p-8 rounded-2xl border border-blue-50 hover:shadow-2xl hover:scale-[1.04] hover:border-[#3570ff]/30 transition-all duration-300 flex flex-col items-center text-center gap-3 focus-within:shadow-2xl focus-within:scale-[1.04] cursor-pointer"
              variants={itemFadeIn}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-[#3570ff]/90 group-hover:to-blue-300 transition-all duration-300 mb-2 shadow-md group-hover:shadow-blue-200/70">
                <Image
                  src={value.icon}
                  alt={value.title}
                  width={40}
                  height={40}
                  className="group-hover:scale-125 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#1a2a3a] mb-1 group-hover:text-[#3570ff] transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base font-normal leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
