import React from "react";
import { motion } from "framer-motion";

const items = [
  "Startups",
  "SaaS Platforms",
  "Fintech",
  "Ecommerce",
  "Developers",
  "Enterprise",
  "Agencies",
  "Automation",
];

const Trust = () => {
  const duplicated = [...items, ...items]; // exact 2x

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#020105] overflow-hidden">

      {/* LIGHT (lighter + smaller) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#2e1065_0%,transparent_70%)] opacity-15" />

      {/* CONTENT */}
      <div className="relative">

        {/* HEADER */}
        <div className="text-center mb-6 md:mb-8 px-6">
          <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-2">
            Global Ecosystem
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Powering{" "}
            <span className="text-violet-400 italic">
              digital experiences
            </span>
          </h2>
        </div>

        {/* 🔥 PERFECT LOOP MARQUEE */}
        <div className="relative overflow-hidden">

          {/* fade edges */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#020105] to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#020105] to-transparent z-10" />

          <motion.div
            className="flex w-max gap-12 md:gap-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 22, // slower = smoother
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicated.map((item, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                <span className="text-lg md:text-2xl text-zinc-500 whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Trust;