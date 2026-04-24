import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    /* VALIDATION */
    if (!email || !password) {
      return setError("Email and password required");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirm) {
      return setError("Passwords do not match");
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
        return setError(data.message || "Signup failed");
      }

      /* SAVE AUTH */
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      /* REDIRECT */
      navigate("/projects");

    } catch (err) {
      console.error("Signup error:", err);

      // 🔥 clear message
      setError("Backend not reachable or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#05030a] px-4">

      {/* BACKGROUND */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />

      <form
        onSubmit={handleSignup}
        className="relative w-full max-w-sm bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-2xl p-7"
      >
        {/* HEADER */}
        <h2 className="text-white text-xl font-semibold mb-1">
          Create account
        </h2>

        <p className="text-zinc-400 text-sm mb-6">
          Get started
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm outline-none focus:border-violet-500"
        />

        {/* PASSWORD */}
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm pr-10 outline-none focus:border-violet-500"
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <input
          type={show ? "text" : "password"}
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm outline-none focus:border-violet-500"
        />

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-xs mb-3">{error}</p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-violet-500 text-white text-sm font-medium hover:bg-violet-400 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        {/* FOOTER */}
        <p className="text-xs text-zinc-500 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;