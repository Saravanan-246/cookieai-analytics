import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, BarChart2, CheckCircle2, X } from "lucide-react";

export default function LandingPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const prefersReduced = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent background scrolling when modal is open on mobile
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F9FA] text-[#202124] font-sans antialiased selection:bg-[#4285F4] selection:text-white">
      <BackgroundShapes prefersReduced={prefersReduced} />

      <main ref={ref} className="relative z-10 min-h-screen flex items-center pt-24 pb-16 lg:py-20">
        <section className="w-full px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              animate={prefersReduced ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20"
            >
              <header>
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="flex space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#5F6368] tracking-widest uppercase">
                    Enterprise Infrastructure
                  </span>
                </div>

                <h1 className="max-w-[800px] text-[46px] sm:text-[60px] md:text-[76px] lg:text-[88px] leading-[1.05] tracking-tight font-black text-[#202124]">
                  Intelligent
                  <br />
                  analytics for
                  <br />
                  <span className="relative inline-block mt-2 lg:mt-0">
                    modern teams.
                    <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-[#FBBC05] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <polygon fill="currentColor" points="0,10 100,10 100,0" />
                    </svg>
                  </span>
                </h1>

                <p className="mt-6 md:mt-8 max-w-[600px] text-base sm:text-lg md:text-xl leading-relaxed text-[#5F6368] font-medium">
                  Track user behavior, visualize realtime activity, and build immersive product intelligence with a secure, cloud-native analytics platform.
                </p>

                {/* Improved Left UX: Trust Markers */}
                <ul className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8 text-[#5F6368] font-bold text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-[#34A853]" /> SOC2 Compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-[#34A853]" /> 99.99% Uptime
                  </li>
                </ul>

                <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:items-center">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative w-full sm:w-auto px-8 py-4 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-bold text-lg shadow-[0_4px_14px_rgba(26,115,232,0.3)] hover:shadow-[0_6px_20px_rgba(26,115,232,0.4)] transition-all duration-300 min-h-[56px] flex items-center justify-center gap-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#4285F4]/40 active:scale-95"
                    aria-label="Start building your analytics platform"
                  >
                    <span>Start Building</span>
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </header>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              style={{ y }}
              className="relative h-[380px] sm:h-[500px] lg:h-[700px] flex items-center justify-center w-full mt-8 lg:mt-0 perspective-1000"
            >
              <HeroVisual prefersReduced={prefersReduced} onOpenModal={() => setIsModalOpen(true)} />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Pop-up Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#202124]/40 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 sm:p-8 md:p-10 w-full max-w-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[#E8EAED] rounded-xl relative overflow-hidden"
            >
              {/* Subtle top brand line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#4285F4]" />
              
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/50"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              
              <div className="mb-8 mt-2">
                <div className="flex space-x-1.5 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#202124] mb-2">Request Access</h3>
                <p className="text-[#5F6368] text-sm font-medium">Connect your data sources instantly.</p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-[#5F6368] mb-1.5">Work Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3.5 bg-[#F8F9FA] border-2 border-[#DADCE0] rounded-md focus:bg-white focus:border-[#1A73E8] focus:outline-none focus:ring-4 focus:ring-[#1A73E8]/10 transition-all text-[#202124] font-medium" 
                    placeholder="name@company.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#5F6368] mb-1.5">Company Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3.5 bg-[#F8F9FA] border-2 border-[#DADCE0] rounded-md focus:bg-white focus:border-[#1A73E8] focus:outline-none focus:ring-4 focus:ring-[#1A73E8]/10 transition-all text-[#202124] font-medium" 
                    placeholder="Acme Corp" 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-4 mt-2 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-bold text-base rounded-md transition-all shadow-md hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#1A73E8]/30 flex items-center justify-center gap-2 group"
                >
                  Continue to Setup
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const HeroVisual = ({ prefersReduced, onOpenModal }) => {
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
      animate={prefersReduced ? false : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Stable, High-Contrast Geometric Backdrop */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 p-4 sm:p-8 opacity-90 transform rotate-3 scale-105 pointer-events-none">
        <div className="bg-[#4285F4] rounded-lg shadow-lg w-full h-full translate-y-4 sm:translate-y-8" />
        <div className="bg-[#EA4335] rounded-lg shadow-lg w-[85%] h-[85%] self-end" />
        <div className="bg-[#FBBC05] rounded-lg shadow-lg w-[90%] h-[90%] justify-self-end" />
        <div className="bg-[#34A853] rounded-lg shadow-lg w-full h-full -translate-y-4 sm:-translate-y-8" />
      </div>

      {/* Interactive Foreground Card */}
      <motion.button
        animate={prefersReduced ? false : { y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        onClick={onOpenModal}
        className="group relative z-10 w-[90%] sm:w-[85%] max-w-[400px] p-6 sm:p-8 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border-2 border-[#E8EAED] hover:border-[#4285F4] rounded-xl text-left transition-all duration-300 hover:shadow-[0_30px_70px_-15px_rgba(66,133,244,0.3)] focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 active:scale-[0.98]"
        aria-label="Open cloud connection setup"
      >
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#1A73E8] font-bold text-xs sm:text-sm bg-[#E8F0FE] px-3 py-1 rounded-full">
          Click to configure
        </div>

        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F1F3F4]">
          <div className="w-12 h-12 bg-[#E8F0FE] group-hover:bg-[#1A73E8] transition-colors duration-300 flex items-center justify-center rounded-lg text-[#1A73E8] group-hover:text-white shadow-sm">
            <BarChart2 size={24} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#5F6368] uppercase tracking-wide">Realtime Sync</p>
            <h3 className="text-xl sm:text-2xl font-black text-[#202124]">Cloud Active</h3>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="h-2.5 sm:h-3 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
            <div className="h-full bg-[#4285F4] w-[75%] group-hover:w-[85%] transition-all duration-700 ease-out" />
          </div>
          <div className="h-2.5 sm:h-3 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
            <div className="h-full bg-[#34A853] w-[45%] group-hover:w-[60%] transition-all duration-700 delay-100 ease-out" />
          </div>
          <div className="h-2.5 sm:h-3 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
            <div className="h-full bg-[#FBBC05] w-[85%] group-hover:w-[100%] transition-all duration-700 delay-200 ease-out" />
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

const BackgroundShapes = ({ prefersReduced }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      {/* Clean Grid Background for Structure */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(#E8EAED 1px, transparent 1px),
            linear-gradient(90deg, #E8EAED 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          backgroundPosition: "center center",
        }}
      />
      
      {/* Subtle Structural Highlights */}
      <div className="absolute top-0 right-0 w-[80%] sm:w-1/3 h-1/3 bg-gradient-to-bl from-[#E8F0FE] to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 w-[80%] sm:w-1/3 h-1/3 bg-gradient-to-tr from-[#E6F4EA] to-transparent opacity-80" />
    </div>
  );
};