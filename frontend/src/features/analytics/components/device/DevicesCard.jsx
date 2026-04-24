import React from "react";
import { motion } from "framer-motion";

const DevicesCard = ({ data = [] }) => {
  /* USE ONLY BACKEND DATA */
  const items = Array.isArray(data) ? data : [];

  const total = items.reduce((sum, i) => sum + (i.value || 0), 0);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 h-full flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          Devices
        </h3>

        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Live
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-1">

        {/* EMPTY */}
        {items.length === 0 && (
          <div className="text-center text-xs text-zinc-500 py-6">
            No device data yet
          </div>
        )}

        {items.map((item, i) => {
          const percent =
            total > 0 ? (item.value / total) * 100 : 0;

          return (
            <div key={item.label} className="group">

              {/* LABEL */}
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-zinc-300 group-hover:text-white transition">
                  {item.label}
                </span>

                <span className="text-xs text-zinc-400">
                  {percent.toFixed(0)}%
                </span>
              </div>

              {/* BAR */}
              <div className="relative h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400"
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/[0.03]" />
              </div>

            </div>
          );
        })}
      </div>

      {/* FOOT */}
      <div className="pt-4 mt-4 border-t border-white/5 text-[10px] text-zinc-500">
        Device distribution across visitors
      </div>

    </div>
  );
};

export default DevicesCard;