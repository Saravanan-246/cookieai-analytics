import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

/* LAYOUT */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* PAGES */
import Home from "../pages/Home";
import AnalyticsPage from "../features/analytics/AnalyticsPage";
import ProjectsPage from "../features/projects/pages/ProjectsPage";
import DemoPage from "../features/analytics/pages/DemoPage";

/* AUTH */
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import Profile from "../features/auth/pages/Profile";

/* TRACKING */
import { useVisitorTracking } from "../features/analytics/hooks/useVisitorTracking";

/* STORE */
import { useProjectStore } from "../features/projects/store/projectStore";

/* =========================
   AUTH HELPERS
========================= */
const isAuth = () => !!localStorage.getItem("token");

/* =========================
   PROTECTED ROUTE
========================= */
const ProtectedRoute = ({ children }) => {
  return isAuth() ? children : <Navigate to="/login" replace />;
};

/* =========================
   PUBLIC ROUTE (BLOCK IF LOGGED IN)
========================= */
const PublicRoute = ({ children }) => {
  return !isAuth() ? children : <Navigate to="/projects" replace />;
};

/* =========================
   ROUTE TRACKER
========================= */
const RouteTracker = () => {
  const location = useLocation();

  // ❌ don't track auth pages
  const skipTracking =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  useVisitorTracking(skipTracking ? null : location.pathname);

  return null;
};

function App() {
  const initProjects = useProjectStore((s) => s.init);

  useEffect(() => {
    initProjects();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#05030a] text-white">

        <RouteTracker />

        <Navbar />

        <main className="flex-1">
          <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

            {/* DEMO (NO AUTH REQUIRED) */}
            <Route path="/demo" element={<DemoPage />} />

            {/* PROTECTED */}
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;