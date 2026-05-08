import React from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap, Globe2, ArrowRight, Play, Database, Webhook, Box, Layers } from "lucide-react";

export default function CTA() {
  const features = [
    {
      title: "Real-time tracking",
      desc: "Capture every user interaction instantly. Watch your data stream live with millisecond latency.",
      icon: <Activity className="w-6 h-6 text-[#8B5CF6]" />,
      color: "bg-[#F5F3FF] border-[#8B5CF6]/20",
      colSpan: "lg:col-span-7",
      delay: 0.1,
    },
    {
      title: "Privacy-first",
      desc: "Built with compliance and data protection at its core.",
      icon: <ShieldCheck className="w-6 h-6 text-[#10B981]" />,
      color: "bg-[#ECFDF5] border-[#10B981]/20",
      colSpan: "lg:col-span-5",
      delay: 0.2,
    },
    {
      title: "Ultra-fast routing",
      desc: "Lightweight architecture designed for maximum efficiency.",
      icon: <Zap className="w-6 h-6 text-[#F59E0B]" />,
      color: "bg-[#FFFBEB] border-[#F59E0B]/20",
      colSpan: "lg:col-span-5",
      delay: 0.3,
    },
    {
      title: "Global-ready infrastructure",
      desc: "Works seamlessly across regions. Deploy anywhere with our globally distributed edge network.",
      icon: <Globe2 className="w-6 h-6 text-[#0EA5E9]" />,
      color: "bg-[#F0F9FF] border-[#0EA5E9]/20",
      colSpan: "lg:col-span-7",
      delay: 0.4,
    },
  ];

  // SVG Paths for the data lines
  const path1 = "M 270 120 C 340 120, 350 250, 400 250";
  const path2 = "M 270 380 C 340 380, 350 250, 400 250";
  const path3 = "M 600 250 C 650 250, 660 120, 730 120";
  const path4 = "M 600 250 C 650 250, 660 380, 730 380";

  return (
    <section className="relative py-20 md:py-32 px-6 bg-[#FAFAFC] overflow-hidden font-sans text-[#111827] antialiased">
      {/* ===== AMBIENT LIGHT BACKGROUND ===== */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)",
          }}
        />
        <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-[#8B5CF6]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-[#0EA5E9]/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] shadow-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
              </span>
              <span className="text-xs font-bold text-[#4B5563] uppercase tracking-widest">
                Data Infrastructure
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#111827] mb-6 tracking-tight leading-[1.05]">
              Connect everything. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#0EA5E9]">
                Route anywhere.
              </span>
            </h2>
            <p className="text-[#4B5563] max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              A clean, highly scalable system designed to track, orchestrate, and deliver deep insights across your entire stack.
            </p>
          </motion.div>
        </div>

        {/* ===== ARCHITECTURE FLOW DIAGRAM ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-square md:aspect-[2.2/1] max-h-[500px] bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_40px_rgba(0,0,0,0.04)] mb-24 overflow-hidden flex items-center justify-center"
        >
          <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D1D5DB" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static Base Lines */}
            <path d={path1} stroke="url(#lineGrad)" strokeWidth="2" fill="none" opacity="0.3" />
            <path d={path2} stroke="url(#lineGrad)" strokeWidth="2" fill="none" opacity="0.3" />
            <path d={path3} stroke="url(#lineGrad)" strokeWidth="2" fill="none" opacity="0.3" />
            <path d={path4} stroke="url(#lineGrad)" strokeWidth="2" fill="none" opacity="0.3" />

            {/* Animated Data Packets (Dots) */}
            {/* Path 1 Dots */}
            <circle r="4" fill="#8B5CF6" filter="url(#glow)">
              <animateMotion dur="3s" repeatCount="indefinite" path={path1} />
            </circle>
            <circle r="4" fill="#8B5CF6" filter="url(#glow)">
              <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path={path1} />
            </circle>

            {/* Path 2 Dots */}
            <circle r="4" fill="#0EA5E9" filter="url(#glow)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path={path2} />
            </circle>
            <circle r="4" fill="#0EA5E9" filter="url(#glow)">
              <animateMotion dur="3.5s" begin="1.75s" repeatCount="indefinite" path={path2} />
            </circle>

            {/* Path 3 Dots */}
            <circle r="4" fill="#F59E0B" filter="url(#glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path={path3} />
            </circle>

            {/* Path 4 Dots */}
            <circle r="4" fill="#10B981" filter="url(#glow)">
              <animateMotion dur="2.8s" repeatCount="indefinite" path={path4} />
            </circle>

            {/* NODES USING FOREIGN OBJECTS (Perfect Scaling) */}
            {/* Top Left: App Marketplace */}
            <foreignObject x="50" y="80" width="220" height="80">
              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl border border-[#E5E7EB] shadow-sm w-full h-full">
                <div className="p-2 bg-[#F5F3FF] rounded-lg">
                  <Box className="text-[#8B5CF6] w-6 h-6" />
                </div>
                <span className="font-bold text-[15px] text-[#111827]">App Marketplace</span>
              </div>
            </foreignObject>

            {/* Bottom Left: CRM */}
            <foreignObject x="50" y="340" width="220" height="80">
              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl border border-[#E5E7EB] shadow-sm w-full h-full">
                <div className="p-2 bg-[#F0F9FF] rounded-lg">
                  <Layers className="text-[#0EA5E9] w-6 h-6" />
                </div>
                <span className="font-bold text-[15px] text-[#111827]">CRM & Booking</span>
              </div>
            </foreignObject>

            {/* Center: CORE */}
            <foreignObject x="400" y="150" width="200" height="200">
              <div className="relative flex flex-col items-center justify-center w-full h-full">
                <div className="absolute inset-0 bg-[#8B5CF6]/20 rounded-[2rem] animate-ping opacity-20 duration-1000" />
                <div className="relative z-10 flex flex-col items-center justify-center w-[160px] h-[160px] bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-[2rem] shadow-[0_0_50px_rgba(139,92,246,0.4)] border-2 border-white/30 backdrop-blur-lg">
                  <Activity className="text-white mb-2 w-8 h-8 opacity-90" />
                  <span className="font-black text-white text-xl tracking-wider">CORE</span>
                  <span className="text-white/80 text-xs font-semibold mt-1 uppercase tracking-widest">Engine</span>
                </div>
              </div>
            </foreignObject>

            {/* Top Right: Destinations */}
            <foreignObject x="730" y="80" width="220" height="80">
              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl border border-[#E5E7EB] shadow-sm w-full h-full">
                <div className="p-2 bg-[#FFFBEB] rounded-lg">
                  <Webhook className="text-[#F59E0B] w-6 h-6" />
                </div>
                <span className="font-bold text-[15px] text-[#111827]">Event Dest.</span>
              </div>
            </foreignObject>

            {/* Bottom Right: Database */}
            <foreignObject x="730" y="340" width="220" height="80">
              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl border border-[#E5E7EB] shadow-sm w-full h-full">
                <div className="p-2 bg-[#ECFDF5] rounded-lg">
                  <Database className="text-[#10B981] w-6 h-6" />
                </div>
                <span className="font-bold text-[15px] text-[#111827]">Data Pipeline</span>
              </div>
            </foreignObject>
          </svg>
        </motion.div>

        {/* ===== ASYMMETRICAL BENTO GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-24">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: item.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative p-8 rounded-[2rem] bg-white/80 backdrop-blur-sm border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden ${item.colSpan}`}
            >
              {/* Inner stroke effect */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[#E5E7EB] pointer-events-none group-hover:ring-[#D1D5DB] transition-all duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                {/* ICON */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border ${item.color} group-hover:scale-110 transition-transform duration-500 ease-out shadow-sm`}>
                  {item.icon}
                </div>

                {/* TEXT */}
                <h3 className="text-2xl font-bold text-[#111827] mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed font-medium mt-auto">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== PRISTINE LITE CTA BANNER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white bg-white"
        >
          {/* Subtle Accent Glows inside the CTA */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8B5CF6]/5 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#0EA5E9]/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-[#E5E7EB] pointer-events-none rounded-[2.5rem]" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-black text-[#111827] mb-5 tracking-tight">
                Ready to transform your data?
              </h3>
              <p className="text-[#4B5563] text-lg md:text-xl font-medium">
                Join thousands of forward-thinking teams. Start building for free today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              <button className="group relative px-8 py-4 bg-[#111827] text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:bg-[#1F2937] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3">
                Create free account
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button className="px-8 py-4 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:-translate-y-0.5 text-[#111827] font-bold text-lg rounded-2xl shadow-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-3">
                <Play size={20} className="fill-current text-[#8B5CF6]" />
                Watch demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}