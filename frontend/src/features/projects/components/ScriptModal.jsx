import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScriptModal = ({ open, onClose, project }) => {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  const script = project
    ? `<script src="${import.meta.env.VITE_API_URL}/tracker.js" data-site="${project.siteId}"></script>`
    : "";

  /* ✅ HOOK ALWAYS RUNS */
  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, onClose]);

  /* COPY */
  const handleCopy = async () => {
    if (!script) return;
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ❗ NOW SAFE TO RETURN */
  if (!open || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0715] p-6"
        >
          <h2 className="text-white text-lg mb-2">
            Tracking Script
          </h2>

          <p className="text-sm text-zinc-400 mb-4">
            Paste this inside your website &lt;head&gt;
          </p>

          <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-zinc-300 break-all">
            {script}
          </div>

          <button
            onClick={handleCopy}
            className="mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm"
          >
            {copied ? "Copied ✓" : "Copy Script"}
          </button>

          <button
            onClick={onClose}
            className="mt-2 w-full py-2 text-sm text-zinc-400 hover:text-white"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScriptModal;