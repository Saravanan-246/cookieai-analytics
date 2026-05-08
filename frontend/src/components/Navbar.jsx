import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Removed Demo & Features. Added standard placeholders to keep the layout balanced.
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "Developers", path: "/developers" },
  ];

  // 1. Handle Scroll Effects
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Sync state with route/resize
  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  return (
    <>
      {/* ===== NAVBAR HEADER ===== */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div 
          className={`max-w-6xl mx-auto flex items-center justify-between transition-all duration-300
            ${scrolled 
              ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E5E7EB]" 
              : "bg-white/40 backdrop-blur-md border border-white/40 shadow-none"
            } rounded-2xl px-5 sm:px-6 h-16`}
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 group z-[60]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md">
              <span className="text-white font-black text-lg">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">AI</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-semibold transition-colors duration-200 ${
                  location.pathname === link.path 
                    ? "text-violet-600" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl 
              bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold shadow-lg 
              shadow-blue-500/30 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all duration-300 active:scale-95 group"
            >
              Get Started
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 -mr-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-800 z-[60] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE MENU PANEL ===== */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm md:hidden"
            />

            {/* PANEL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-24 left-4 right-4 z-50 md:hidden
              p-6 sm:p-8 rounded-[2rem] bg-white border border-gray-100
              shadow-[0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              {/* Subtle Mobile Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />

              <div className="relative flex flex-col gap-8">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      key={item.path}
                    >
                      <Link
                        to={item.path}
                        className={`text-2xl sm:text-3xl font-black transition-colors ${
                          location.pathname === item.path 
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600" 
                            : "text-gray-900"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="h-[1px] w-full bg-gray-100" />

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex flex-col gap-3"
                >
                  <Link
                    to="/signup"
                    className="w-full py-4 rounded-xl text-center font-bold text-white
                    bg-gradient-to-r from-blue-600 to-violet-600 shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Get Started <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/login"
                    className="w-full py-4 rounded-xl text-center font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    Log in to your account
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;