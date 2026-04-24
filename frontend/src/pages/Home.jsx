import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";

/* TRACKING */
import { useVisitorTracking } from "../features/analytics/hooks/useVisitorTracking";

/* PROJECT STORE */
import { useProjectStore } from "../features/projects/store/projectStore";

import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Solutions from "../sections/Solutions";
import Analytics from "../sections/Analytics";
import Trust from "../sections/Trust";
import CTA from "../sections/CTA";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  /* GET SELECTED PROJECT */
  const selectedProject = useProjectStore((s) => s.selectedProject);

  /* ✅ CORRECT TRACKING (AUTO HOOK) */
  useVisitorTracking(
    selectedProject?.siteId ? location.pathname : null
  );

  const opacityGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.05, 0.1, 0.05]
  );

  const yShift = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="relative bg-[#05030a] text-white overflow-x-hidden font-sans">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{ opacity: opacityGlow, y: yShift }}
          className="absolute -top-[10%] -left-[10%] w-[650px] h-[650px] bg-violet-600/10 blur-[120px] rounded-full"
        />
        <div className="absolute top-[40%] -right-[10%] w-[450px] h-[450px] bg-blue-600/5 blur-[100px] rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf602_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf602_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      </div>

      {/* CONTENT */}
      <main className="relative z-10">

        <Hero />
        <Trust />
        <Features />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Solutions />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Analytics />
        </motion.div>

        <CTA />

      </main>

      {/* TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-[99] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.01] mix-blend-overlay" />

      {/* VIGNETTE */}
      <div className="fixed inset-0 pointer-events-none z-[98] bg-[radial-gradient(circle_at_center,transparent_65%,#05030a_100%)] opacity-50" />

    </div>
  );
};

export default Home;