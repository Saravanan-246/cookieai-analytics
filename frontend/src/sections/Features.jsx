import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, BarChart3, ShieldCheck, Terminal, ArrowRight } from "lucide-react";

// --- DATA ---
const features = [
  {
    id: "payments",
    title: "Global Payments",
    description: "Accept payments online, in person, and around the world with a payments solution built for any business—from scaling startups to global enterprises.",
    icon: <CreditCard className="w-6 h-6" />,
    color: "#635BFF", // Stripe Blurple
    visual: <PaymentsVisual />,
  },
  {
    id: "analytics",
    title: "Real-time Analytics",
    description: "Make faster, more confident decisions with real-time data. Monitor your growth, track customer churn, and optimize your revenue streams instantly.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "#00D4FF", // Cyan
    visual: <AnalyticsVisual />,
  },
  {
    id: "security",
    title: "Enterprise Security",
    description: "Protect your business from fraud and maximize authorization rates with our machine learning-powered risk ecosystem.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "#FF5C8D", // Pink
    visual: <SecurityVisual />,
  },
  {
    id: "developers",
    title: "Developer First",
    description: "Build exactly what you need with our modular, composable APIs. Launch faster with our drop-in UI components and extensive documentation.",
    icon: <Terminal className="w-6 h-6" />,
    color: "#10B981", // Emerald
    visual: <DeveloperVisual />,
  },
];

export default function InteractiveSidePanel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-white font-sans text-[#0A2540] antialiased selection:bg-[#635BFF] selection:text-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* HEADER */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            A complete platform <br className="hidden md:block" />
            <span className="text-[#635BFF]">built for growth.</span>
          </h2>
          <p className="text-[#425466] text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            Everything you need to manage your business, scale your operations, and build world-class customer experiences.
          </p>
        </div>

        {/* MAIN LAYOUT: Split Screen on Desktop */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* LEFT SIDE: Interactive Accordion List */}
          <div className="w-full lg:w-5/12 flex flex-col relative">
            {/* Vertical Line connecting items (Desktop only) */}
            <div className="hidden lg:block absolute left-[27px] top-8 bottom-8 w-px bg-[#E2E8F0] z-0" />

            {features.map((feature, index) => {
              const isActive = activeIndex === index;

              return (
                <div key={feature.id} className="relative z-10 flex group cursor-pointer" onClick={() => setActiveIndex(index)}>
                  
                  {/* Icon & Line Indicator */}
                  <div className="mr-6 flex flex-col items-center">
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${
                        isActive 
                          ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-110" 
                          : "bg-[#F6F9FC] text-[#8792A2] group-hover:bg-white group-hover:shadow-md"
                      }`}
                      style={{ color: isActive ? feature.color : undefined }}
                    >
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="pt-3 pb-12 flex-1">
                    <h3 
                      className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-[#0A2540]" : "text-[#8792A2] group-hover:text-[#425466]"
                      }`}
                    >
                      {feature.title}
                    </h3>

                    {/* Smooth Accordion Open/Close */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, y: -10 }}
                          animate={{ height: "auto", opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -10 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-[#425466] text-[17px] leading-relaxed pr-4">
                            {feature.description}
                          </p>
                          <motion.button 
                            whileHover={{ x: 5 }}
                            className="mt-6 flex items-center gap-2 text-[15px] font-bold transition-colors"
                            style={{ color: feature.color }}
                          >
                            Explore {feature.title.toLowerCase()}
                            <ArrowRight size={16} strokeWidth={2.5} />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: Sticky Dynamic Visuals */}
          <div className="w-full lg:w-7/12">
            <div className="sticky top-24 lg:h-[600px] w-full rounded-3xl bg-[#F6F9FC] border border-[#E2E8F0] shadow-inner overflow-hidden flex items-center justify-center relative">
              
              {/* Subtle Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.4] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full h-full flex items-center justify-center p-8"
                >
                  {features[activeIndex].visual}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// VISUAL COMPONENTS (Creative & Animated)
// ==========================================

function PaymentsVisual() {
  return (
    <div className="relative w-full max-w-sm">
      {/* Floating Card */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-56 rounded-2xl bg-gradient-to-tr from-[#635BFF] to-[#8A3FFC] shadow-2xl p-6 flex flex-col justify-between text-white relative z-10 border border-white/20"
      >
        <div className="flex justify-between items-center">
          <div className="w-12 h-8 bg-white/20 rounded backdrop-blur-sm" />
          <div className="text-xl font-black tracking-widest opacity-80">VISA</div>
        </div>
        <div>
          <div className="font-mono text-lg tracking-[0.2em] mb-2 opacity-90">•••• •••• •••• 4242</div>
          <div className="flex justify-between items-end text-sm opacity-80 font-medium">
            <span>ALEXANDER DOE</span>
            <span>12/28</span>
          </div>
        </div>
      </motion.div>

      {/* Success Badge */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
        className="absolute -bottom-6 -right-6 bg-white px-6 py-4 rounded-xl shadow-xl border border-[#E2E8F0] flex items-center gap-3 z-20"
      >
        <div className="w-8 h-8 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center">
          <ShieldCheck size={18} />
        </div>
        <div>
          <p className="text-xs font-bold text-[#8792A2] uppercase tracking-wide">Status</p>
          <p className="text-[#0A2540] font-bold">Payment Verified</p>
        </div>
      </motion.div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [40, 70, 45, 90, 65, 85, 100];
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F6F9FC]">
        <div>
          <h4 className="text-[#8792A2] text-sm font-bold uppercase tracking-wide mb-1">Total Revenue</h4>
          <p className="text-[#0A2540] text-3xl font-black">$124,500.00</p>
        </div>
        <div className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] font-bold rounded-full text-sm">
          +14.5%
        </div>
      </div>
      
      <div className="flex items-end justify-between gap-2 h-40">
        {bars.map((height, i) => (
          <div key={i} className="w-full bg-[#F6F9FC] rounded-t-sm relative overflow-hidden h-full flex items-end">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 1, delay: i * 0.1, type: "spring", damping: 20 }}
              className="w-full bg-gradient-to-t from-[#00D4FF] to-[#0073FF] rounded-t-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityVisual() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-8 w-full">
      {/* Central Shield */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#FF5C8D] to-[#FF8A5C] shadow-[0_0_40px_rgba(255,92,141,0.4)] flex items-center justify-center relative z-10"
      >
        <ShieldCheck className="text-white w-14 h-14" strokeWidth={2} />
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-4 right-4 h-0.5 bg-white/60 shadow-[0_0_8px_#fff] blur-[1px]"
        />
      </motion.div>

      {/* Connection Nodes */}
      <div className="flex gap-4">
        {["Authentication", "Risk Engine", "3D Secure"].map((text, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.2) }}
            className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg shadow-sm text-sm font-bold text-[#425466]"
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DeveloperVisual() {
  return (
    <div className="w-full max-w-lg bg-[#0A2540] rounded-xl shadow-2xl overflow-hidden border border-[#1A3A5A]">
      <div className="h-10 bg-[#112F4A] flex items-center px-4 gap-2 border-b border-[#1A3A5A]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        <div className="ml-4 text-xs font-mono text-[#8792A2]">checkout.js</div>
      </div>
      <div className="p-6 font-mono text-sm leading-loose text-[#A3B8CC]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#FF5C8D]">const</span> stripe = <span className="text-[#00D4FF]">require</span>(<span className="text-[#10B981]">'stripe'</span>)(<span className="text-[#10B981]">'sk_test_...'</span>);
          <br /><br />
          <span className="text-[#FF5C8D]">const</span> session = <span className="text-[#FF5C8D]">await</span> stripe.checkout.sessions.<span className="text-[#00D4FF]">create</span>({'{'}
          <br />
          &nbsp;&nbsp;payment_method_types: [<span className="text-[#10B981]">'card'</span>],
          <br />
          &nbsp;&nbsp;line_items: [{'{'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;price: <span className="text-[#10B981]">'price_1M...'</span>,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;quantity: <span className="text-[#FFBD2E]">1</span>,
          <br />
          &nbsp;&nbsp;{'}'}],
          <br />
          &nbsp;&nbsp;mode: <span className="text-[#10B981]">'payment'</span>,
          <br />
          {'}'});
        </motion.div>
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-[#00D4FF] ml-1 align-middle mt-2"
        />
      </div>
    </div>
  );
}