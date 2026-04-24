import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectSwitcher = ({
  projects = [],
  selected,
  onSelect,
  onAddClick,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const hasProjects = projects.length > 0;

  return (
    <div ref={ref} className="relative">

      {/* TRIGGER */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-xl text-sm text-zinc-300 hover:text-white hover:border-white/20 transition"
      >
        {/* STATUS DOT */}
        <span className={`w-2 h-2 rounded-full ${
          selected ? "bg-green-400 animate-pulse" : "bg-zinc-500"
        }`} />

        {/* NAME */}
        <span className="truncate max-w-[140px]">
          {selected?.name || "Select project"}
        </span>

        {/* CARET */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs opacity-60"
        >
          ▼
        </motion.span>
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-72 rounded-xl border border-white/10 bg-[#0b0715] shadow-2xl overflow-hidden"
          >

            {/* LIST */}
            <div className="max-h-64 overflow-y-auto">

              {projects.map((p) => {
                const isActive = selected?.siteId === p.siteId;

                return (
                  <button
                    key={p.siteId}
                    onClick={() => {
                      onSelect(p);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition ${
                      isActive
                        ? "bg-white/[0.06] text-white"
                        : "text-zinc-400 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    {/* NAME */}
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-green-400" : "bg-zinc-500"
                      }`} />

                      <span className="truncate max-w-[160px]">
                        {p.name}
                      </span>
                    </div>

                    {/* ACTIVE TAG */}
                    {isActive && (
                      <span className="text-[10px] text-violet-400">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}

              {/* EMPTY */}
              {!hasProjects && (
                <div className="px-4 py-8 text-xs text-zinc-500 text-center">
                  No projects yet
                </div>
              )}

            </div>

            {/* FOOT */}
            <div className="border-t border-white/10 flex flex-col">

              <button
                onClick={() => {
                  setOpen(false);
                  onAddClick && onAddClick();
                }}
                className="px-4 py-3 text-sm text-violet-400 hover:bg-white/[0.03] transition text-left"
              >
                + Add Project
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectSwitcher;