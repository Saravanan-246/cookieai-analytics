import { motion } from "framer-motion";

/* ================= DATA ================= */

const items = [
  "Startups",
  "SaaS Platforms",
  "Fintech",
  "Ecommerce",
  "Developers",
  "Enterprise",
  "Agencies",
  "Automation",
];

/* ================= MAIN ================= */

const Trust = () => {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-white border-t border-[#E8EAED] font-sans antialiased selection:bg-[#4285F4] selection:text-white">
      <Background />

      <div className="relative z-10 max-w-7xl mx-auto">
        <TrustHeader />

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-center text-lg md:text-xl font-medium text-[#5F6368] leading-relaxed max-w-2xl mx-auto px-6"
        >
          Trusted by ambitious teams building modern digital products with speed, performance, and enterprise-grade security.
        </motion.p>

        <Marquee items={items} />
      </div>
    </section>
  );
};

export default Trust;

/* ================= BACKGROUND ================= */

const Background = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
    {/* Clean Grid Background for Structure matching Landing Page */}
    <div
      className="absolute inset-0 opacity-[0.5]"
      style={{
        backgroundImage: `
          linear-gradient(#F1F3F4 1px, transparent 1px),
          linear-gradient(90deg, #F1F3F4 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
        backgroundPosition: "center center",
      }}
    />
  </div>
);

/* ================= HEADER ================= */

const TrustHeader = () => (
  <div className="text-center px-6">
    {/* BADGE */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-3 px-4 py-2 bg-[#F8F9FA] border border-[#E8EAED] rounded-sm mb-4"
    >
      <div className="flex space-x-1">
        <span className="w-2 h-2 bg-[#4285F4]"></span>
        <span className="w-2 h-2 bg-[#EA4335]"></span>
        <span className="w-2 h-2 bg-[#FBBC05]"></span>
        <span className="w-2 h-2 bg-[#34A853]"></span>
      </div>
      <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#5F6368]">
        Global Infrastructure
      </span>
    </motion.div>

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mt-4 text-[40px] sm:text-[56px] md:text-[64px] font-black tracking-tight leading-[1.05] text-[#202124]"
    >
      Built for teams
      <br />
      <span className="text-[#1A73E8]">
        that scale fast.
      </span>
    </motion.h2>
  </div>
);

/* ================= MARQUEE ================= */

const Marquee = ({ items }) => {
  const duplicated = [...items, ...items, ...items]; // Triple for ultra-smooth looping on ultrawide

  return (
    <div className="relative mt-16 md:mt-24">
      {/* EDGE FADE - Pure white to transparent */}
      <div className="absolute left-0 top-0 h-full w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* CONTAINER */}
      <div className="overflow-hidden py-4">
        <motion.div
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-4 md:gap-8 w-max px-4 md:px-8"
        >
          {duplicated.map((item, i) => (
            <MarqueeItem key={i} text={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* ================= ITEM ================= */

const MarqueeItem = ({ text }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="group shrink-0 px-8 py-5 bg-white border-2 border-[#E8EAED] hover:border-[#4285F4] rounded-sm shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(66,133,244,0.2)] transition-all duration-300 flex items-center justify-center min-w-[180px]"
  >
    <span className="text-[#5F6368] group-hover:text-[#1A73E8] text-lg md:text-xl font-bold tracking-tight transition-colors duration-300">
      {text}
    </span>
  </motion.div>
);