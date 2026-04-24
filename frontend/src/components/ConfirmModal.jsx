import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Delete Project",
  message = "This action cannot be undone.",
}) => {

  /* ESC CLOSE */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0715] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >

            {/* ICON */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                <span className="text-red-400 text-lg">!</span>
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-center text-lg font-semibold text-white mb-2">
              {title}
            </h3>

            {/* MESSAGE */}
            <p className="text-center text-sm text-zinc-400 mb-6 leading-relaxed">
              {message}
            </p>

            {/* ACTIONS */}
            <div className="flex items-center justify-center gap-3">

              {/* CANCEL */}
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition"
              >
                Cancel
              </button>

              {/* DELETE */}
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-400 transition shadow-lg shadow-red-500/20"
              >
                Delete
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;