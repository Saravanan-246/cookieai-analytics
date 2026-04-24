import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-20 bg-[#04020a] text-white overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[500px] h-[250px] bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-6">
          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">
            Analytics
          </span>
        </div>

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-semibold tracking-tight mb-4"
        >
          Understand your product{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-violet-500 italic">
            in real time
          </span>
        </motion.h2>

        {/* DESC */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-zinc-400 mb-8 max-w-xl mx-auto text-sm md:text-base"
        >
          Monitor user behavior, consent activity, and performance metrics with a
          unified, real-time analytics system.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={() => navigate("/analytics")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="px-8 py-3 rounded-lg bg-violet-500 text-white font-medium text-sm
          shadow-[0_10px_40px_rgba(139,92,246,0.4)] hover:bg-violet-400 transition"
        >
          Open Dashboard
        </motion.button>

        {/* 🔥 MINI VISUAL (subtle line) */}
        <div className="mt-12 h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      </div>
    </section>
  );
};

export default Analytics;