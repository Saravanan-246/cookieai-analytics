import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddProjectModal = ({ open, onClose, onAdd }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(null);

  /* 🔥 RESET WHEN MODAL CLOSES */
  useEffect(() => {
    if (!open) {
      setInput("");
      setError("");
      setCreated(null);
    }
  }, [open]);

  if (!open) return null;

  const handleAdd = () => {
    try {
      const url = new URL(
        input.startsWith("http") ? input : `https://${input}`
      );

      const siteId = url.hostname.replace("www.", "");

      const project = {
        name: siteId,
        url: url.href,
        siteId,
      };

      onAdd(project);

      setCreated(project); // show script
      setInput("");
      setError("");
    } catch {
      setError("Enter a valid URL");
    }
  };

  const script = created
    ? `<script src="${import.meta.env.VITE_API_URL}/tracker.js" data-site="${created.siteId}"></script>`
    : "";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* MODAL */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0715] p-5 sm:p-6 shadow-2xl"
        >
          {created ? (
            /* 🔥 SCRIPT UI */
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-medium text-white">
                  Install Tracking Script
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Paste this inside your website &lt;head&gt;
                </p>
              </div>

              {/* SCRIPT BOX */}
              <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-zinc-300 break-all overflow-auto max-h-32">
                {script}
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(script)}
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm hover:opacity-90 transition"
                >
                  Copy Script
                </button>

                <button
                  onClick={() => {
                    setCreated(null);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-lg border border-white/10 text-sm text-zinc-400 hover:text-white transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* 🔥 INPUT UI */
            <>
              {/* HEADER */}
              <div className="mb-5">
                <h2 className="text-lg font-medium text-white">
                  Add Project
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Enter your website URL to start tracking
                </p>
              </div>

              {/* INPUT */}
              <div className="space-y-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="your-site.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500/60 transition"
                />

                {error && (
                  <p className="text-xs text-red-400">{error}</p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm text-zinc-400 hover:text-white transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAdd}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:opacity-90 transition shadow-lg shadow-violet-500/20"
                >
                  Add Project
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddProjectModal;