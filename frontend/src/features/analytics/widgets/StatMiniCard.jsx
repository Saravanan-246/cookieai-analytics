import React from "react";
import { motion } from "framer-motion";

const StatMiniCard = ({ label, value, change }) => {
  const isPositive = change?.startsWith("+");

  return (
    <div className="relative rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-4 overflow-hidden group">

      {/* 🔥 SUBTLE GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.1),transparent_60%)]" />

      {/* LABEL */}
      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
        {label}
      </p>

      {/* VALUE */}
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-white tracking-tight"
      >
        {value}
      </motion.p>

      {/* CHANGE */}
      {change && (
        <div className="mt-2 text-xs flex items-center gap-1">
          <span
            className={`font-medium ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {change}
          </span>

          <span className="text-zinc-500">
            vs last period
          </span>
        </div>
      )}
    </div>
  );
};

export default StatMiniCard;