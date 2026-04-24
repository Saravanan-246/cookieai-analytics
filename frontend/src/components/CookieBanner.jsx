import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg"
        >
          <div className="relative flex items-center justify-between gap-4 p-4 rounded-xl 
            bg-white/[0.04] backdrop-blur-2xl border border-violet-300/10 
            shadow-[0_20px_60px_rgba(139,92,246,0.15)] overflow-hidden">

            {/* subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent opacity-60 pointer-events-none" />

            {/* TEXT */}
            <p className="relative text-xs text-violet-200/70 leading-relaxed max-w-[65%]">
              We use cookies to improve experience and analytics.
            </p>

            {/* ACTIONS */}
            <div className="relative flex items-center gap-2">

              <button
                onClick={reject}
                className="px-3 py-1.5 text-xs rounded-md border border-violet-300/10 
                  text-violet-200/60 hover:text-white hover:bg-violet-500/10 transition"
              >
                Reject
              </button>

              <button
                onClick={accept}
                className="px-4 py-1.5 text-xs rounded-md bg-violet-500 
                  text-white font-medium hover:bg-violet-400 transition 
                  shadow-[0_6px_20px_rgba(139,92,246,0.4)]"
              >
                Accept
              </button>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;