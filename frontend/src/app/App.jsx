import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* LAYOUT */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* PAGES */
import Home from "../pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-[#202124]">

        <Navbar />

        <main className="flex-1">
          <Routes>

            {/* HOME ONLY */}
            <Route path="/" element={<Home />} />

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