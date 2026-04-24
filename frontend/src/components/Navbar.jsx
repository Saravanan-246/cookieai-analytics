import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, User, LogOut } from "lucide-react";

/* NAV LINK */
const NavLink = ({ to, children, onClick }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link to={to} onClick={onClick} className="relative text-sm font-medium">
      <span className={active ? "text-white" : "text-zinc-400 hover:text-white"}>
        {children}
      </span>

      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
        />
      )}
    </Link>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* 🔥 SYNC USER (FAST FIX) */
  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    syncUser();

    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, [location]);

  /* 🔥 LOGOUT FIX */
  const handleLogout = () => {
    localStorage.clear();

    setUser(null);
    setDropdown(false);

    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between
          bg-gradient-to-r from-[#0b0715]/80 to-[#090514]/80 backdrop-blur-xl
          border border-white/10 rounded-xl px-5 h-14 shadow-lg">

          {/* LOGO */}
          <Link to="/" className="text-sm font-semibold">
            <span className="text-white">Cookie</span>
            <span className="ml-1 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              AI
            </span>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/analytics">Analytics</NavLink>
          </nav>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-4">

            {!user ? (
              <>
                <Link to="/login" className="text-sm text-zinc-400 hover:text-white">
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-1.5 text-sm rounded-lg
                  bg-gradient-to-r from-violet-500 to-indigo-500
                  text-white hover:opacity-90"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="relative">

                {/* PROFILE BTN */}
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                  bg-white/[0.05] border border-white/10 hover:bg-white/[0.08]"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-xs font-semibold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-sm text-zinc-300 max-w-[100px] truncate">
                    {user.email}
                  </span>
                </button>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-3 w-44
                      bg-[#0b0715] border border-white/10 rounded-xl shadow-xl p-2"
                    >
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setDropdown(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 rounded-lg"
                      >
                        <User size={16} />
                        Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-white/10 rounded-lg"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}

          </div>

          {/* MOBILE BTN */}
          <button onClick={() => setOpen(true)} className="md:hidden text-white">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 60 }}
              className="absolute bottom-0 w-full p-6
              bg-[#05030a] border-t border-white/10 rounded-t-2xl"
            >
              <div className="flex flex-col gap-6 text-lg">
                <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/projects" onClick={() => setOpen(false)}>Projects</NavLink>
                <NavLink to="/analytics" onClick={() => setOpen(false)}>Analytics</NavLink>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                {!user ? (
                  <>
                    <button onClick={() => { setOpen(false); navigate("/login"); }}
                      className="py-2 border border-white/10 rounded-lg">
                      Login
                    </button>

                    <button onClick={() => { setOpen(false); navigate("/signup"); }}
                      className="py-2 bg-violet-500 rounded-lg text-white">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setOpen(false); navigate("/profile"); }}
                      className="py-2 bg-white/[0.05] rounded-lg">
                      Profile
                    </button>

                    <button onClick={() => { setOpen(false); handleLogout(); }}
                      className="py-2 border border-white/10 text-red-400 rounded-lg">
                      Logout
                    </button>
                  </>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;