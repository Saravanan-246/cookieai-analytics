import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* SUBMIT */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double click

    setError("");

    /* VALIDATION */
    if (!email || !password) {
      return setError("Email and password required");
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        return setError(data.message || "Invalid credentials");
      }

      /* SAVE AUTH */
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      /* REDIRECT */
      navigate("/projects");

    } catch (err) {
      console.error("Login error:", err);

      setError("Backend not reachable or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#05030a] px-4 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />

      {/* CARD */}
      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-sm bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-2xl p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      >
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold">
            Welcome back
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Sign in to continue
          </p>
        </div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 transition"
        />

        {/* PASSWORD */}
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 transition pr-10"
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-xs text-red-400 mb-3">{error}</p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-violet-500 text-white text-sm font-medium hover:bg-violet-400 transition active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-xs text-zinc-500 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-violet-400 hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;