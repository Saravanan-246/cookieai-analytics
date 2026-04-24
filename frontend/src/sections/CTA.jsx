import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* 🔥 SMOOTH COUNT UP */
const useCountUp = (end, duration = 1200) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return value;
};

const CTA = () => {
  /* 🔥 COOKIE PLATFORM METRICS */
  const consents = useCountUp(12482);
  const optIn = useCountUp(87);
  const blocked = useCountUp(5321);
  const regions = useCountUp(24);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-[#05030a] text-white overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-violet-600/20 blur-[180px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="rounded-2xl border border-violet-500/20 bg-white/[0.03] backdrop-blur-2xl p-10 md:p-14 text-center">

          {/* BADGE */}
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/20 bg-violet-500/10">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-violet-200">
              GDPR Ready
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Consent tracking that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-violet-500 italic">
              builds trust.
            </span>
          </h2>

          {/* DESC */}
          <p className="text-zinc-400 text-sm md:text-base mb-12 max-w-xl mx-auto">
            Capture user consent, block unauthorized scripts, and stay compliant —
            all in one powerful platform.
          </p>

          {/* 🔥 METRIC CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {/* CONSENTS */}
            <div className="group p-5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition">
              <p className="text-2xl md:text-3xl font-semibold text-violet-300">
                {consents.toLocaleString()}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Consents Captured
              </p>
            </div>

            {/* OPT-IN */}
            <div className="group p-5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition">
              <p className="text-2xl md:text-3xl font-semibold text-green-300">
                {optIn}%
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Opt-in Rate
              </p>
            </div>

            {/* BLOCKED */}
            <div className="group p-5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition">
              <p className="text-2xl md:text-3xl font-semibold text-red-300">
                {blocked.toLocaleString()}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Scripts Blocked
              </p>
            </div>

            {/* REGIONS */}
            <div className="group p-5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition">
              <p className="text-2xl md:text-3xl font-semibold text-blue-300">
                {regions}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Regions Covered
              </p>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default CTA;