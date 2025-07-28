import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamSection({ fadeIn, staggerContainer, itemFadeIn, team }) {
  // Custom team data
  const customTeam = [
    {
      name: "Rievan Averillio",
      role: "Chief Executive Officer",
      photo: "/rievan1.png",
      bio: "Visioner di bidang teknologi kesehatan dan berpengalaman di dalam bidang ekosistem digital."
    },
    {
      name: "Ayunda Rahma",
      role: "Chief Medical Officer",
      photo: "/ayunda.jpg",
      bio: "Dokter dan inovator layanan kesehatan digital, fokus pada pengembangan solusi medis berbasis teknologi."
    },
    {
      name: "Afin Maulana",
      role: "Chief Technology Officer",
      photo: "/afin.jpg",
      bio: "Pakar teknologi dan AI, memimpin pengembangan platform Medlitik demi layanan kesehatan yang lebih cerdas."
    }
  ];

  return (
    <section className="py-20 bg-[#f0f7ff]">
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
                Tim Kami
              </span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2a3a] mb-3 tracking-tight">
            Profesional di Balik Medlitik
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto text-base md:text-lg font-light">
            Tim kami terdiri dari profesional medis dan teknologi yang berdedikasi untuk meningkatkan layanan kesehatan di Indonesia.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {customTeam.map((member, index) => (
            <motion.div
              key={index}
              className="group bg-white p-8 rounded-3xl border border-blue-50 hover:shadow-2xl hover:scale-105 hover:border-[#3570ff]/40 transition-all duration-300 flex flex-col items-center text-center gap-3 cursor-pointer relative overflow-visible"
              variants={itemFadeIn}
            >
              <div className="relative mb-4">
                <span className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#e0eaff] to-[#f0f7ff] opacity-80 blur-lg -z-10 group-hover:opacity-100 group-hover:from-[#3570ff]/20 group-hover:to-[#e0eaff] transition-all duration-300" />
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-white shadow-lg group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-blue-200/60 transition-transform duration-300"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-blue-100 opacity-0 group-hover:opacity-60 blur-md transition-all duration-300 z-0" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2a3a] mb-0.5 group-hover:text-[#3570ff] transition-colors">
                {member.name}
              </h3>
              <div className="text-[#3570ff] font-medium text-xs mb-1">{member.role}</div>
              <p className="text-gray-500 text-sm font-normal leading-relaxed text-justify">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
