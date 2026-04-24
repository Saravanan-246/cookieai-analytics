import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Solutions = () => {
  const [active, setActive] = useState(0);

  const data = [
    {
      title: "Use Cases",
      desc: "Manage consent, automate workflows, and maintain audit-ready systems.",
      items: ["Consent Management", "Privacy Programs", "DSAR Automation", "Audit & Compliance"],
    },
    {
      title: "Industries",
      desc: "Built for high-compliance environments with scalability and performance.",
      items: ["Tech & SaaS", "Healthcare", "Finance", "Ecommerce"],
    },
    {
      title: "Teams",
      desc: "Empowering teams with tools for privacy, security, and rapid integration.",
      items: ["Developers", "Legal & Compliance", "Security & Risk", "Product Teams"],
    },
  ];

  // 🔥 AUTO SWITCH
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % data.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 bg-[#04020a] text-white overflow-hidden">

      {/* 🔥 RICH BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#4c1d95_0%,transparent_60%)] opacity-25" />
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[#04020a] to-transparent" />

      {/* HEADER */}
      <div className="mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Intelligent Solutions
        </h2>
        <p className="text-zinc-400 max-w-xl">
          Designed to adapt across industries, teams, and evolving product needs.
        </p>
      </div>

      {/* LAYOUT */}
      <div className="grid md:grid-cols-2 gap-12 items-start relative z-10">

        {/* LEFT SELECTOR */}
        <div className="flex flex-col gap-3 relative">

          {/* vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />

          {data.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative pl-6 pr-4 py-5 text-left transition-all"
            >
              {/* 🔥 ACTIVE BAR */}
              {active === i && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-violet-400 to-violet-600 shadow-[0_0_12px_#8b5cf6]"
                />
              )}

              <h3 className={`text-lg font-medium mb-1 transition ${
                active === i ? "text-white" : "text-zinc-500"
              }`}>
                {item.title}
              </h3>

              <p className={`text-sm transition ${
                active === i ? "text-zinc-300" : "text-zinc-600"
              }`}>
                {item.desc}
              </p>
            </button>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.08)]"
        >
          <h3 className="text-2xl font-semibold mb-6">
            {data[active].title}
          </h3>

          <div className="grid gap-4">
            {data[active].items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 text-zinc-300"
              >
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-violet-400 to-violet-600 rounded-full shadow-[0_0_8px_#8b5cf6]" />
                {item}
              </motion.div>
            ))}
          </div>

          {/* subtle bottom line */}
          <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
};

export default Solutions;