import React from "react";

/* SEGMENTED CONTROL */
const Segmented = ({ options = [], value, onChange }) => {
  const items = Array.isArray(options) ? options : [];

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/10">
      {items.map((opt) => {
        const active = value === opt;

        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`relative px-3 py-1.5 text-xs rounded-md transition ${
              active
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute inset-0 rounded-md bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/20" />
            )}

            <span className="relative z-10 tracking-wide">
              {opt}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const TopBar = ({
  mode = "Production",
  setMode,
  range = "7d",
  setRange,
  project = "",
  projectUrl = "",
  online = 0,
  modes = ["Production", "Preview"],
  ranges = ["24h", "7d", "30d"],
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* PROJECT (CLICKABLE) */}
        <a
          href={projectUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="truncate max-w-[220px] underline underline-offset-4 decoration-white/20 hover:decoration-white">
            {project || "No project"}
          </span>
        </a>

        {/* DIVIDER */}
        <span className="hidden md:block w-px h-4 bg-white/10" />

        {/* ONLINE USERS */}
        <div className="text-xs text-zinc-500">
          {online} online
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        <Segmented
          options={modes}
          value={mode}
          onChange={setMode}
        />

        <Segmented
          options={ranges}
          value={range}
          onChange={setRange}
        />

      </div>
    </div>
  );
};

export default TopBar;