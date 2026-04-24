import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({
  project,
  onSelect,
  onDelete,
  onViewScript, // 🔥 NEW
  stats = {},
}) => {
  if (!project) return null;

  const {
    name = "Unnamed",
    url = "#",
    siteId,
  } = project;

  const {
    visitors = 0,
    pageviews = 0,
    status = "waiting",
  } = stats;

  const isActive = status === "active";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 transition hover:border-violet-500/30"
    >

      {/* TOP */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white transition">
          <span
            className={`w-2 h-2 rounded-full ${
              isActive ? "bg-green-400 animate-pulse" : "bg-zinc-500"
            }`}
          />
          <span className="truncate max-w-[180px] font-medium">
            {name}
          </span>
        </div>

        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border ${
            isActive
              ? "border-green-400/30 text-green-400"
              : "border-zinc-600 text-zinc-400"
          }`}
        >
          {isActive ? "Active" : "Waiting"}
        </span>
      </div>

      {/* URL */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-xs text-zinc-500 hover:text-white transition underline underline-offset-4 decoration-white/10 break-all"
      >
        {url}
      </a>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
            Visitors
          </p>
          <p className="text-lg text-white font-medium">
            {visitors.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
            Pageviews
          </p>
          <p className="text-lg text-white font-medium">
            {pageviews.toLocaleString()}
          </p>
        </div>
      </div>

      {/* FOOT ACTIONS */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">

        {/* SITE ID */}
        <span className="text-[10px] text-zinc-500 truncate max-w-[120px]">
          {siteId}
        </span>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4 text-xs">

          {/* VIEW ANALYTICS */}
          <button
            onClick={() => onSelect && onSelect(project)}
            className="text-violet-400 hover:text-white transition"
          >
            View
          </button>

          {/* 🔥 VIEW SCRIPT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewScript && onViewScript(project);
            }}
            className="text-blue-400 hover:text-white transition"
          >
            Script
          </button>

          {/* DELETE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(project);
            }}
            className="text-red-400 hover:text-red-300 transition"
          >
            Delete
          </button>

        </div>
      </div>

    </motion.div>
  );
};

export default ProjectCard;