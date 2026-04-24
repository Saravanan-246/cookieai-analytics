import React from "react";

const InsightsPanel = ({ insights = [], loading = false }) => {
  const items = Array.isArray(insights) ? insights : [];

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 flex flex-col h-full">

      {/* SUBTLE GLOW */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.08),transparent_60%)]" />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          Insights
        </h3>

        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Live
        </div>
      </div>

      {/* STATES */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-xs text-zinc-500">
          Analyzing data...
        </div>
      ) : items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-xs text-zinc-500">
          No insights yet
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[220px]">
          {items.map((item, index) => (
            <div
              key={index}
              className="group flex items-start gap-3 text-sm text-zinc-400 hover:text-white transition"
            >
              {/* DOT */}
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 shadow-[0_0_8px_rgba(139,92,246,0.6)] group-hover:scale-125 transition" />

              {/* TEXT */}
              <p className="leading-relaxed tracking-[0.01em]">
                {item}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className="pt-4 mt-4 border-t border-white/5 text-[10px] text-zinc-500 flex justify-between items-center">
        <span className="opacity-80">Auto updated</span>
        <span className="opacity-50 tracking-wide">AI insights</span>
      </div>

    </div>
  );
};

export default InsightsPanel;