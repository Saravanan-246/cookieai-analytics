import React from "react";

const ReferrersTable = ({ data = [], loading = false }) => {
  const items = Array.isArray(data) ? data : [];

  const max =
    items.length > 0
      ? Math.max(...items.map((i) => i.visits || 0))
      : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          Referrers
        </h3>

        <span className="text-[10px] text-zinc-500">
          Traffic sources
        </span>
      </div>

      {/* STATES */}
      {loading ? (
        <div className="text-center text-xs text-zinc-500 py-6">
          Loading data...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center text-xs text-zinc-500 py-6">
          No referrer data yet
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => {
            const percent =
              max > 0 ? (item.visits / max) * 100 : 0;

            return (
              <div
                key={item.source || index}
                className="group px-2 py-2 rounded-lg hover:bg-white/[0.04] transition"
              >

                {/* ROW */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-zinc-300 group-hover:text-white transition">
                    {item.source || "direct"}
                  </span>

                  <span className="text-xs text-zinc-400">
                    {(item.visits || 0).toLocaleString()}
                  </span>
                </div>

                {/* BAR */}
                <div className="relative h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  />
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* FOOT */}
      <div className="mt-6 text-[10px] text-zinc-500">
        Traffic source distribution
      </div>

    </div>
  );
};

export default ReferrersTable;