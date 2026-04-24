import React from "react";

const MetricsTabs = ({
  tabs = [],
  active,
  setActive,
}) => {
  const items = Array.isArray(tabs) ? tabs : [];

  return (
    <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xl w-fit">

      {items.map((tab) => {
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
              isActive
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {/* ACTIVE BACKGROUND */}
            {isActive && (
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/20" />
            )}

            {/* LABEL */}
            <span className="relative z-10 tracking-wide">
              {tab.label}
            </span>
          </button>
        );
      })}

      {/* EMPTY STATE */}
      {items.length === 0 && (
        <div className="px-4 py-2 text-xs text-zinc-500">
          No metrics available
        </div>
      )}
    </div>
  );
};

export default MetricsTabs;