import { motion } from "framer-motion";
import { ShieldCheck, Activity, Lock, Code2 } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const Features = () => {
  const features = [
    {
      title: "Privacy-first tracking",
      desc: "Capture user activity without compromising privacy or performance.",
      icon: <ShieldCheck className="w-5 h-5 text-violet-600" />,
      className: "md:col-span-2",
      visual: (
        <div className="flex gap-2 items-end h-10">
          {[50, 80, 60, 90, 70].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: [`${h}%`, `${h - 8}%`, `${h}%`] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
              className="w-2 bg-violet-300/60 rounded-t"
            />
          ))}
        </div>
      ),
    },
    {
      title: "Live insights",
      desc: "Understand user behavior instantly with real-time updates.",
      icon: <Activity className="w-5 h-5 text-indigo-600" />,
      visual: (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          <span className="text-[11px] text-gray-600">
            Live data
          </span>
        </div>
      ),
    },
    {
      title: "Secure by design",
      desc: "Advanced security ensures safe and reliable data processing.",
      icon: <Lock className="w-5 h-5 text-violet-500" />,
      visual: (
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: ["70%", "90%", "80%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
          />
        </div>
      ),
    },
    {
      title: "Developer friendly",
      desc: "Clean APIs and fast integration for modern development workflows.",
      icon: <Code2 className="w-5 h-5 text-indigo-500" />,
      className: "md:col-span-2",
      visual: (
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-gray-500"
        >
          Fast · Scalable · Reliable
        </motion.div>
      ),
    },
  ];

  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-24">

      {/* ===== HEADER ===== */}
      <div className="max-w-2xl mb-14">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-[#202124]">
          Built for modern products
        </h2>
        <p className="text-gray-500 text-base">
          Powerful analytics with a clean interface — designed for clarity and performance.
        </p>
      </div>

      {/* ===== GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5, ease }}
            className={`group p-6 rounded-xl border border-gray-100 bg-white 
            hover:shadow-md transition ${item.className}`}
          >
            {/* visual */}
            <div className="mb-5">{item.visual}</div>

            {/* icon */}
            <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center mb-3 group-hover:bg-violet-100 transition">
              {item.icon}
            </div>

            {/* text */}
            <h3 className="text-base font-semibold text-[#202124] mb-2">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;