import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Solutions = () => {
  const [active, setActive] = useState(0);

  const data = [
    {
      title: "Use cases",
      desc: "Manage consent and workflows with clarity and control.",
      items: ["Consent Management", "Privacy Programs", "DSAR Automation", "Audit & Compliance"],
    },
    {
      title: "Industries",
      desc: "Scalable across modern digital products and businesses.",
      items: ["Tech & SaaS", "Healthcare", "Finance", "Ecommerce"],
    },
    {
      title: "Teams",
      desc: "Built for developers, product, and compliance teams.",
      items: ["Developers", "Legal", "Security", "Product Teams"],
    },
  ];

  /* 🔥 smoother auto switch */
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % data.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 bg-white overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-violet-100/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-100/30 blur-[120px] rounded-full" />
      </div>

      {/* ===== HEADER ===== */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-[#202124]">
          Built for real-world use
        </h2>
        <p className="text-gray-500 max-w-xl text-base">
          Flexible system designed for teams, industries, and scalable products.
        </p>
      </div>

      {/* ===== LAYOUT ===== */}
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* ===== LEFT NAV ===== */}
        <div className="relative">

          {/* vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100 rounded-full" />

          <div className="flex flex-col gap-4">
            {data.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative pl-6 pr-4 py-4 text-left group"
              >

                {/* active indicator */}
                {active === i && (
                  <motion.div
                    layoutId="indicator"
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-violet-600"
                  />
                )}

                <h3 className={`text-base font-medium transition ${
                  active === i ? "text-[#202124]" : "text-gray-400 group-hover:text-gray-600"
                }`}>
                  {item.title}
                </h3>

                <p className={`text-sm mt-1 transition ${
                  active === i ? "text-gray-600" : "text-gray-400"
                }`}>
                  {item.desc}
                </p>

              </button>
            ))}
          </div>
        </div>

        {/* ===== RIGHT PANEL ===== */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-xl border border-gray-100 bg-white shadow-sm"
        >

          <h3 className="text-xl font-semibold mb-6 text-[#202124]">
            {data[active].title}
          </h3>

          <div className="grid gap-4">
            {data[active].items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 text-gray-600"
              >
                <div className="w-1.5 h-1.5 bg-violet-600 rounded-full" />
                {item}
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Solutions;