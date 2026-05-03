import { motion, useScroll, useTransform } from "framer-motion";
import { BarChart3, ShieldCheck, Zap, Sparkles } from "lucide-react";
/* ================= CONFIG ================= */

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 }, // reduced from 60 → smoother
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // faster
      ease
    }
  }
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08 // tighter flow
    }
  }
};
/* ================= MAIN ================= */

export default function LandingPage() {
  return (
    <div className="bg-white text-[#202124] font-sans overflow-x-hidden">

      
     

      {/* ===== MAIN ===== */}
      <main className="pt-6">

        {/* HERO */}
        <Hero />

        {/* PREVIEW */}
        <div className="mt-16">
          <PreviewSection />
        </div>

        {/* FEATURES */}
        <div className="mt-24">
          <FeaturesSection />
        </div>

      </main>

    </div>
  );
}
/* ================= BACKGROUND ================= */


const Background = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">

    {/* MAIN SOFT GLOW */}
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 0.8, 0.6] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[5%] w-[800px] h-[800px] bg-violet-200/50 blur-[120px] rounded-full"
    />

    {/* SECONDARY GLOW */}
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[30%] right-[-10%] w-[700px] h-[700px] bg-indigo-200/50 blur-[120px] rounded-full"
    />

    {/* CENTER LIGHT (SUBTLE) */}
    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />

  </div>
);
/* ================= HERO ================= */

const Hero = () => {
  const { scrollY } = useScroll();

  // tighter movement (less empty feel)
  const y = useTransform(scrollY, [0, 300], [0, 40]);
  const opacity = useTransform(scrollY, [0, 250], [1, 0.9]);
  const bgY = useTransform(scrollY, [0, 300], [0, 30]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute top-[8%] left-[12%] w-[600px] h-[600px] bg-violet-100/50 blur-[110px] rounded-full" />
        <div className="absolute bottom-[8%] right-[12%] w-[520px] h-[520px] bg-indigo-100/50 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
      </motion.div>

      {/* ===== CONTENT ===== */}
      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >

        {/* HEADLINE */}
        <h1 className="text-[38px] md:text-[64px] font-bold leading-[1.08] tracking-tight">
          Understand your product{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            in real time
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
          Gain instant clarity on user behavior, drop-offs, and performance.  
          Privacy-first analytics built for modern teams.
        </p>

        {/* CTA */}
        <motion.button
  onClick={() => window.location.href = "http://localhost:5174/"}
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  className="mt-6 px-8 py-3 bg-violet-600 text-white rounded-lg font-medium 
  hover:bg-violet-700 transition shadow-md hover:shadow-lg"
>
  Get Started
</motion.button>

      </motion.div>
    </section>
  );
};

/* ================= PREVIEW ================= */

const PreviewSection = () => (
  <section className="py-32 px-6 bg-[#FAFAFB]">

    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease }}
      className="max-w-5xl mx-auto rounded-xl border border-gray-200 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden"
    >

      {/* ===== HEADER ===== */}
      <div className="px-6 py-4 border-b bg-white">
        <span className="text-sm font-medium text-gray-700">
          Analytics Overview
        </span>
      </div>

      {/* ===== CONTENT ===== */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 p-8"
      >

        <Stat
          icon={<BarChart3 />}
          title="Real-time tracking"
          desc="Capture every interaction instantly."
        />

        <Stat
          icon={<ShieldCheck />}
          title="Privacy first"
          desc="Built-in compliance and secure processing."
        />

        <Stat
          icon={<Zap />}
          title="Fast performance"
          desc="Lightweight script with zero impact."
        />

      </motion.div>

    </motion.div>
  </section>
);

/* ================= FEATURES ================= */

const FeaturesSection = () => (
  <section className="py-32 px-6 bg-white">

    {/* ===== HEADING ===== */}
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#202124]">
        Built for clarity and performance
      </h2>
      <p className="mt-4 text-gray-500 text-lg">
        Everything you need to understand your users and make better decisions.
      </p>
    </div>

    {/* ===== FEATURES GRID ===== */}
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
    >

      <FeatureCard
        title="Quick integration"
        desc="Start tracking in minutes with a lightweight script and zero setup complexity."
      />

      <FeatureCard
        title="Reliable insights"
        desc="Accurate event tracking without sampling or data loss."
      />

      <FeatureCard
        title="Clean interface"
        desc="A focused dashboard that highlights what truly matters."
      />

    </motion.div>

  </section>
);
/* ================= COMPONENTS ================= */

const Stat = ({ icon, title, desc }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4 }}
    className="p-6 rounded-xl border border-gray-100 bg-white transition hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
  >

    {/* ICON */}
    <div className="mb-5 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-violet-50 text-violet-600">
      {icon}
    </div>

    {/* TITLE */}
    <h3 className="text-base font-semibold text-[#202124] mb-2">
      {title}
    </h3>

    {/* DESC */}
    <p className="text-sm text-gray-500 leading-relaxed">
      {desc}
    </p>

  </motion.div>
);

const FeatureCard = ({ title, desc }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -8 }}
    className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition"
  >
    <h4 className="text-lg font-semibold text-[#202124] mb-2">
      {title}
    </h4>
    <p className="text-gray-500 text-sm leading-relaxed">
      {desc}
    </p>
  </motion.div>
);