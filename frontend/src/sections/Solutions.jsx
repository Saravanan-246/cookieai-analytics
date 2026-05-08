import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Globe2, ShieldCheck, CheckCircle2, CreditCard } from "lucide-react";

export default function Solutions() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const data = [
    {
      id: "workflows",
      title: "Use cases & Workflows",
      desc: "Manage payouts, payments, and consent with absolute clarity and developer control.",
      icon: <Code2 size={20} />,
      visual: <WorkflowsVisual />,
    },
    {
      id: "scale",
      title: "Global Scale",
      desc: "Expand across borders with infrastructure designed for modern digital products.",
      icon: <Globe2 size={20} />,
      visual: <ScaleVisual />,
    },
    {
      id: "teams",
      title: "Built for Teams",
      desc: "Secure environments built for developers, product managers, and compliance.",
      icon: <ShieldCheck size={20} />,
      visual: <TeamsVisual />,
    },
  ];

  // Auto-switch tabs, but pause if the user is hovering over the component
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, data.length]);

  return (
    <section 
      className="relative w-full px-6 py-20 md:py-32 bg-[#FAFAFC] overflow-hidden font-sans antialiased"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#635BFF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00D4FF]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="mb-12 md:mb-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-bold text-[#425466] uppercase tracking-wider">
              Platform Architecture
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] text-[#0A2540] mb-6">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#635BFF] to-[#00D4FF]">real-world</span> use.
          </h2>
          <p className="text-[#425466] text-lg md:text-xl font-medium leading-relaxed">
            A flexible, layered system designed for cross-functional teams, complex industries, and highly scalable products.
          </p>
        </div>

        {/* MAIN GRID LAYOUT */}
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-center">
          
          {/* LEFT NAV ACCORDION */}
          <div className="relative flex flex-col justify-center order-2 lg:order-1">
            {/* Background track line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-[#E2E8F0] rounded-full hidden md:block" />

            <div className="flex flex-col gap-2 md:gap-4">
              {data.map((item, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`relative p-4 md:p-6 rounded-2xl text-left transition-all duration-500 group flex items-start gap-5 outline-none ${
                      isActive ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5" : "hover:bg-black/[0.02]"
                    }`}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full bg-[#635BFF] hidden md:block"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Icon Container */}
                    <div className={`mt-1 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isActive ? "bg-[#F2F4FF] text-[#635BFF] scale-110" : "bg-white border border-[#E2E8F0] text-[#8792A2] shadow-sm group-hover:text-[#0A2540]"
                    }`}>
                      {item.icon}
                    </div>

                    {/* Text Content */}
                    <div>
                      <h3 className={`text-xl font-bold transition-colors duration-300 mb-2 ${
                        isActive ? "text-[#0A2540]" : "text-[#425466] group-hover:text-[#0A2540]"
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-[15px] leading-relaxed transition-all duration-300 ${
                        isActive ? "text-[#425466]" : "text-[#8792A2]"
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT VISUAL PANEL (The Layered Dashboard) */}
          <div className="order-1 lg:order-2 w-full">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl">
              
              {/* Vibrant Mesh Gradient Background (Matching your image) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#FEC163] opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,91,255,0.4),_transparent_50%)]" />

              {/* Dynamic Content Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
                >
                  {data[active].visual}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ==========================================
   LAYERED VISUAL COMPONENTS
========================================== */

// VISUAL 1: The Layered Dashboard with Floating Snippets (Matches your uploaded image)
const WorkflowsVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      
      {/* Base Dashboard Browser Window */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-[90%] md:w-[85%] h-[85%] bg-white rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
      >
        {/* Browser Top Bar */}
        <div className="h-8 bg-[#F6F9FC] border-b border-[#E2E8F0] flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="mx-auto bg-white px-24 py-1 rounded-md text-[10px] text-[#8792A2] flex items-center gap-1 shadow-sm">
             dashboard.zenflow.com
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar (Dark Purple like image) */}
          <div className="w-[28%] bg-[#4A154B] p-4 flex flex-col gap-4 text-white/80">
            <div className="flex items-center gap-2 text-white font-bold mb-4">
              <div className="w-6 h-6 rounded-full bg-white/20" /> Zenflow
            </div>
            <div className="h-4 w-3/4 bg-white/20 rounded-md" />
            <div className="h-4 w-full bg-white/10 rounded-md" />
            <div className="h-4 w-5/6 bg-white/10 rounded-md" />
            <div className="h-4 w-4/6 bg-white/10 rounded-md" />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white p-6 relative">
            <h4 className="text-[#4A154B] font-bold text-lg mb-6">Hello, Daybreak Yoga</h4>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1 border border-[#E2E8F0] rounded-lg p-4 bg-[#FAFAFC]">
                <p className="text-[10px] text-[#8792A2] font-bold uppercase mb-1">Total Balance</p>
                <p className="text-2xl font-black text-[#0A2540]">₹77,953.20</p>
              </div>
              <div className="flex-1 border border-[#E2E8F0] rounded-lg p-4 bg-[#FAFAFC]">
                <p className="text-[10px] text-[#8792A2] font-bold uppercase mb-1">Available</p>
                <p className="text-2xl font-black text-[#10B981]">₹32,471.00</p>
              </div>
            </div>

            {/* Fake Table Rows */}
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-full bg-[#F6F9FC] rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Layer 1: Payouts */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[2%] md:-left-[5%] z-20 w-[240px] md:w-[280px] bg-white rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-[#E2E8F0] p-4"
      >
        <h5 className="font-bold text-[#0A2540] text-sm mb-1">Payouts</h5>
        <p className="text-[11px] text-[#425466] mb-3">Show total balance and allow connected account to initiate payouts.</p>
        <div className="bg-[#F6F9FC] p-2 rounded border border-[#E2E8F0] font-mono text-[10px] text-[#0A2540]">
          instance.<span className="text-[#635BFF]">create</span>(<span className="text-[#10B981]">'payouts'</span>);
        </div>
      </motion.div>

      {/* Floating Layer 2: Capital Financing */}
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[2%] md:-right-[5%] z-20 w-[240px] md:w-[280px] bg-white rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-[#E2E8F0] p-4"
      >
        <h5 className="font-bold text-[#0A2540] text-sm mb-1">Capital Promotion</h5>
        <p className="text-[11px] text-[#425466] mb-3">Show a connected account's financing offer and allow them to apply.</p>
        <div className="bg-[#F6F9FC] p-2 rounded border border-[#E2E8F0] font-mono text-[10px] text-[#0A2540]">
          instance.<span className="text-[#635BFF]">create</span>(<span className="text-[#10B981]">'capital'</span>);
        </div>
      </motion.div>

    </div>
  );
};

// VISUAL 2: Global Scale (Charts & Data layers)
const ScaleVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Globe/Network abstraction */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="w-[280px] h-[280px] rounded-full border border-white/40 border-dashed flex items-center justify-center relative"
      >
        <div className="w-[180px] h-[180px] rounded-full border border-white/60 flex items-center justify-center">
           <div className="w-[80px] h-[80px] rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center">
             <Globe2 className="text-[#FF5C8D] w-8 h-8" />
           </div>
        </div>
      </motion.div>

      {/* Floating Stat Cards */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[10%] bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <p className="text-xs font-bold text-[#8792A2] uppercase">Processing</p>
          <p className="text-xl font-black text-[#0A2540]">99.999%</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[20%] left-[5%] bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl flex flex-col gap-2 w-[180px]"
      >
        <p className="text-xs font-bold text-[#8792A2] uppercase">Volume (EUR)</p>
        <div className="flex items-end gap-1 h-12">
          {[40, 70, 45, 90, 65, 100].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="w-full bg-[#635BFF] rounded-t-sm"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// VISUAL 3: Built for Teams (Security & Developer layers)
const TeamsVisual = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
      
      {/* Code Terminal Layer */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-[85%] bg-[#0A2540] rounded-xl shadow-2xl overflow-hidden border border-white/10 z-10"
      >
        <div className="h-8 bg-[#1A3A5A] flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="p-6 font-mono text-xs sm:text-sm text-[#A3B8CC] leading-relaxed">
          <span className="text-[#FF5C8D]">import</span> {'{'} Security {'}'} <span className="text-[#FF5C8D]">from</span> <span className="text-[#10B981]">'@core/auth'</span>;
          <br /><br />
          <span className="text-[#635BFF]">const</span> policy = <span className="text-[#00D4FF]">new</span> Security.Policy({'{'}
          <br />
          &nbsp;&nbsp;enforce2FA: <span className="text-[#FFBD2E]">true</span>,
          <br />
          &nbsp;&nbsp;role: <span className="text-[#10B981]">'compliance_admin'</span>
          <br />
          {'}'});
        </div>
      </motion.div>

      {/* Access Card Layer */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-[75%] bg-white rounded-xl shadow-2xl border border-[#E2E8F0] p-4 flex items-center justify-between z-20 -mt-12 ml-12"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FAFAFC] border border-[#E2E8F0] flex items-center justify-center">
            <ShieldCheck className="text-[#10B981] w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-[#0A2540] text-sm">Role-Based Access</p>
            <p className="text-xs text-[#8792A2]">Production Environment</p>
          </div>
        </div>
        <div className="w-12 h-6 bg-[#10B981]/20 rounded-full flex items-center p-1">
          <div className="w-4 h-4 bg-[#10B981] rounded-full translate-x-6" />
        </div>
      </motion.div>

    </div>
  );
};