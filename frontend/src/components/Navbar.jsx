import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Demo", path: "/demo" },
    { name: "Features", path: "/features" },
  ];

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close when screen becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between
          bg-white/70 backdrop-blur-md border border-white/40
          rounded-2xl px-6 h-16 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">

          {/* LOGO */}
          <Link to="/" className="text-lg font-bold tracking-tight text-gray-900">
            Cookie <span className="text-violet-600">AI</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="hidden md:block px-5 py-2.5 rounded-xl 
              bg-violet-600 text-white text-sm font-semibold shadow-lg 
              shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95"
            >
              Get Started
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm md:hidden"
            />

            {/* PANEL */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-24 left-4 right-4 z-50 md:hidden
              p-6 rounded-3xl bg-white border border-gray-100
              shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <div className="flex flex-col gap-6">
                {/* NAV LINKS */}
                <div className="flex flex-col gap-5">
                  {navLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-xl font-semibold text-gray-800 hover:text-violet-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="h-[1px] w-full bg-gray-100" />

                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="w-full py-4 rounded-2xl text-center font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="w-full py-4 rounded-2xl text-center font-bold text-white
                    bg-violet-600 shadow-lg shadow-violet-200 active:scale-[0.98] transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;