import { motion, useScroll, useTransform } from "framer-motion";

import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Solutions from "../sections/Solutions";
import Trust from "../sections/Trust";
import CTA from "../sections/CTA";

const Home = () => {
  const { scrollYProgress } = useScroll();

  const opacityGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.05, 0.08, 0.05]
  );

  const yShift = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div className="relative bg-white text-[#202124] overflow-x-hidden font-sans">

      {/* ===== SOFT BACKGROUND (LIGHT) ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">

        <motion.div
          style={{ opacity: opacityGlow, y: yShift }}
          className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-violet-200/40 blur-[140px] rounded-full"
        />

        <div className="absolute top-[40%] -right-[10%] w-[400px] h-[400px] bg-indigo-200/40 blur-[120px] rounded-full" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),
          linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:64px_64px]" />

      </div>

      {/* ===== CONTENT ===== */}
      <main className="relative z-10">

        <Hero />

        <Trust />

        <Features />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <Solutions />
        </motion.div>

        <CTA />

      </main>

      {/* ===== LIGHT NOISE TEXTURE ===== */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.015] 
        bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

    </div>
  );
};

export default Home;