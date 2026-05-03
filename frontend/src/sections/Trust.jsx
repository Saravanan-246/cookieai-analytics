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
    <section className="relative w-full py-28 bg-[#FAFAFB] overflow-hidden">

      <Background />

      <div className="relative z-10">

        <TrustHeader />

        {/* 🔥 STRONG TRUST LINE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Trusted by teams building modern products — from startups to global platforms.
          </p>
        </motion.div>

        <Marquee items={items} />

      </div>

    </section>
  );
};
export default Trust;

/* ================= BACKGROUND ================= */
const Background = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-violet-100/20 blur-[120px] rounded-full" />
    <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-indigo-100/20 blur-[120px] rounded-full" />
  </div>
);

/* ================= HEADER ================= */
const TrustHeader = () => (
  <div className="text-center px-6">

    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="inline-block px-4 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold tracking-widest uppercase mb-5"
    >
      TRUSTED PLATFORM
    </motion.span>

    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-3xl md:text-5xl font-bold text-[#202124] tracking-tight"
    >
      Built for teams that{" "}
      <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        move fast
      </span>
    </motion.h2>

  </div>
);

/* ================= MARQUEE ================= */
const Marquee = ({ items }) => {
  const duplicated = [...items, ...items];

  return (
    <div className="relative mt-16 py-8">

      {/* EDGE FADE */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#FAFAFB] to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#FAFAFB] to-transparent z-10" />

      <div className="overflow-hidden border-y border-gray-100 bg-white/70 backdrop-blur-sm">
        <motion.div
          className="flex gap-16 md:gap-24 py-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {duplicated.map((item, i) => (
            <MarqueeItem key={i} text={item} />
          ))}
        </motion.div>
      </div>

    </div>
  );
};

/* ================= MARQUEE ITEM ================= */
const MarqueeItem = ({ text }) => (
  <div className="flex items-center gap-3 shrink-0 group">

    <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />

    <span className="text-lg md:text-xl font-medium text-gray-400 group-hover:text-violet-600 transition">
      {text}
    </span>

  </div>
);