import React from "react";
import { motion } from "framer-motion";

const ToggleSwitch = ({ enabled, setEnabled, labels = ["Off", "On"] }) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="relative w-20 h-9 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl flex items-center px-1 transition"
    >

      {/* ACTIVE BG */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`absolute top-1 left-1 w-8 h-7 rounded-full ${
          enabled
            ? "translate-x-10 bg-gradient-to-r from-violet-500 to-indigo-400"
            : "bg-white/10"
        }`}
      />

      {/* LABELS */}
      <div className="relative w-full flex justify-between px-2 text-[10px] uppercase tracking-wide">
        <span className={enabled ? "text-zinc-500" : "text-white"}>
          {labels[0]}
        </span>
        <span className={enabled ? "text-white" : "text-zinc-500"}>
          {labels[1]}
        </span>
      </div>
    </button>
  );
};

export default ToggleSwitch;