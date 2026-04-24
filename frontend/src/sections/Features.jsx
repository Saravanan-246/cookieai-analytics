import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, Lock, Code2 } from "lucide-react";

const Features = () => {
  const ease = [0.16, 1, 0.3, 1];

  const features = [
    {
      title: "Consent Management",
      desc: "Fine-grained control over user consent with scalable, policy-driven architecture.",
      icon: <ShieldCheck className="w-5 h-5 text-violet-400" />,
      className: "md:col-span-2",
      visual: (
        <div className="flex gap-2 items-end h-10">
          {[40, 70, 45, 90, 65].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: [`${h}%`, `${h - 6}%`, `${h}%`] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.08,
              }}
              className="w-2 bg-violet-400/40 rounded-t-sm"
            />
          ))}
        </div>
      )
    },
    {
      title: "Real-time Analytics",
      desc: "Observe user behavior and system activity instantly with low-latency tracking.",
      icon: <Activity className="w-5 h-5 text-violet-300" />,
      visual: (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
          <span className="text-[10px] text-zinc-300">
            Real-time events streaming
          </span>
        </div>
      )
    },
    {
      title: "Compliance Engine",
      desc: "Built-in compliance with GDPR, CCPA, and evolving global privacy standards.",
      icon: <Lock className="w-5 h-5 text-violet-300" />,
      visual: (
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: ["82%", "92%", "86%"] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full bg-violet-500"
          />
        </div>
      )
    },
    {
      title: "Developer-First APIs",
      desc: "Well-structured APIs and SDKs designed for fast integration and scalability.",
      icon: <Code2 className="w-5 h-5 text-violet-300" />,
      className: "md:col-span-2",
      visual: (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-xs text-zinc-400"
        >
          API latency: stable · 24ms avg
        </motion.div>
      )
    }
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">

      {/* HEADER */}
      <div className="max-w-2xl mb-8 md:mb-10">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3 text-white">
          Privacy infrastructure for modern apps
        </h2>
        <p className="text-zinc-400 text-sm">
          Designed for scale, compliance, and real-time visibility across your platform.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.05, duration: 0.45, ease }}
            className={`group p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl 
            hover:border-violet-400/30 transition-all duration-300 ${item.className}`}
          >
            {/* VISUAL */}
            <div className="mb-4">{item.visual}</div>

            {/* ICON */}
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-3 group-hover:bg-violet-500/20 transition">
              {item.icon}
            </div>

            {/* TEXT */}
            <h3 className="text-base font-medium text-white mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-zinc-400">
              {item.desc}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default Features;