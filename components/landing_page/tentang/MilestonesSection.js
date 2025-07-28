import { motion } from "framer-motion";

export default function MilestonesSection({ fadeIn, staggerContainer, itemFadeIn, milestones }) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-2">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex justify-center mb-3">
            <span className="relative inline-block">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e0eaff] to-[#f0f7ff] blur-sm opacity-80 w-full h-full"></span>
              <span className="relative px-5 py-2 bg-white text-[#3570ff] font-semibold rounded-full text-sm tracking-wide shadow-sm border border-blue-100">
                Perjalanan Kami
              </span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2a3a] mb-2 tracking-tight">
            Pencapaian Penting
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base font-light">
            Melihat kembali perjalanan kami dalam mentransformasi layanan kesehatan digital di Indonesia
          </p>
        </motion.div>
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100" />
          <div className="space-y-10 relative">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={itemFadeIn}
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}> 
                  <div className={`w-1/2 flex ${index % 2 === 0 ? 'justify-end pr-2' : 'justify-start pl-2'}`}> 
                    <div className="bg-white rounded-lg shadow border border-blue-50 px-4 py-4 max-w-xs text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#3570ff]" />
                        <span className="text-[#3570ff] font-semibold text-xs tracking-wide uppercase">{milestone.year}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#1a2a3a] mb-1">{milestone.title}</h3>
                      <p className="text-gray-500 text-xs font-normal leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#3570ff] w-4 h-4 rounded-full border-4 border-white shadow z-10" />
                  <div className="w-1/2"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
