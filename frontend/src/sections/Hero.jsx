import React, { useMemo, useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const ease = [0.16, 1, 0.3, 1];

  /* MOUSE PARALLAX */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX / window.innerWidth - 0.5);
      mouseY.set(clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const spring = { damping: 35, stiffness: 70 };

  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [40, -40]), spring);
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [40, -40]), spring);
  const contentX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [8, -8]),
    spring
  );

  /* STARS */
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
        size: Math.random() * 1.5 + 0.5,
      })),
    []
  );

  /* FEATURES */
  const features = [
    {
      title: "Cookie Consent",
      desc: "Collect and manage user consent with GDPR-compliant flows.",
    },
    {
      title: "Real-time Analytics",
      desc: "Track visitors, sessions, and engagement instantly.",
    },
    {
      title: "Lightweight Script",
      desc: "Ultra-fast tracking with minimal performance impact.",
    },
  ];

  /* ACTIONS */
  const handleStart = () => {
    navigate("/projects");
  };

  const handleDemo = () => {
    navigate("/demo");
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen px-6 py-20 overflow-hidden bg-[#02010a] text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#2e1065_0%,#02010a_60%)] opacity-80" />

      {/* STARS */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-[-10%]">
        {stars.map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.7, 0.1] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
            }}
            className="absolute bg-violet-400 rounded-full"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
            }}
          />
        ))}
      </motion.div>

      {/* CONTENT */}
      <motion.div
        style={{ x: contentX }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="relative z-10 text-center max-w-5xl"
      >
        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full border border-white/10 bg-white/5">
          <span className="h-2 w-2 bg-violet-500 rounded-full animate-pulse" />
          <span className="text-xs tracking-widest text-violet-200">
            COOKIE MANAGEMENT PLATFORM
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Smart Cookie <br />
          <span className="bg-gradient-to-r from-violet-200 to-violet-500 text-transparent bg-clip-text">
            Management & Analytics
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-zinc-400 max-w-xl mx-auto mb-10">
          Control cookies, track users, and stay compliant — all in one
          lightweight platform built for modern web apps.
        </p>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 flex-wrap mb-20">
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-violet-100 transition active:scale-95"
          >
            Go to Projects
          </button>

          <button
            onClick={handleDemo}
            className="px-8 py-3 border border-white/20 rounded-full text-sm font-semibold hover:border-violet-400 hover:text-violet-300 transition"
          >
            View Demo
          </button>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition"
            >
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* FADE */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#02010a]" />
    </section>
  );
};

export default Hero;