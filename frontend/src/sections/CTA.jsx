import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap, Globe } from "lucide-react";

const CTA = () => {
  const items = [
    {
      title: "Real-time tracking",
      desc: "Capture every user interaction instantly with zero delay.",
      icon: <Activity className="w-5 h-5 text-indigo-600" />,
      color: "bg-indigo-50",
    },
    {
      title: "Privacy-first system",
      desc: "Built with compliance and data protection at its core.",
      icon: <ShieldCheck className="w-5 h-5 text-violet-600" />,
      color: "bg-violet-50",
    },
    {
      title: "Ultra-fast performance",
      desc: "Lightweight script designed for speed and efficiency.",
      icon: <Zap className="w-5 h-5 text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      title: "Global-ready",
      desc: "Works seamlessly across regions and modern applications.",
      icon: <Globe className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-50",
    },
  ];

  return (
    <section className="relative py-28 px-6 bg-[#FAFAFB] overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-violet-100/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-indigo-100/40 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#202124] mb-4">
            Built to power modern analytics
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            A clean, scalable system designed to track, analyze, and deliver insights in real time.
          </p>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid md:grid-cols-2 gap-6">

          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="group p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md transition"
            >

              {/* ICON */}
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${item.color}`}>
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-[#202124] mb-2">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CTA;