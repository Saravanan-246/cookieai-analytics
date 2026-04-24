import { useEffect, useState } from "react";
import { User, Pencil, Check } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setName(parsed.name || "");
    }
  }, []);

  if (!user) return null;

  /* SAVE NAME */
  const handleSave = () => {
    const updated = { ...user, name };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#05030a] px-4 pt-28 pb-10 text-white">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage your account
          </p>
        </div>

        {/* CARD */}
        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02]
          border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

          {/* TOP */}
          <div className="flex items-center justify-between mb-6">

            {/* AVATAR + INFO */}
            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full
                bg-gradient-to-r from-violet-500 to-indigo-500
                flex items-center justify-center text-lg font-semibold">
                {user.email?.charAt(0).toUpperCase()}
              </div>

              <div>
                {!editing ? (
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium">
                      {user.name || "User"}
                    </p>

                    <button
                      onClick={() => setEditing(true)}
                      className="text-zinc-400 hover:text-white"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-2 py-1 text-sm rounded-md bg-white/[0.05]
                      border border-white/10 outline-none"
                    />

                    <button
                      onClick={handleSave}
                      className="text-green-400 hover:text-green-300"
                    >
                      <Check size={16} />
                    </button>
                  </div>
                )}

                <p className="text-sm text-zinc-400">
                  {user.email}
                </p>
              </div>

            </div>

            {/* ICON */}
            <div className="hidden sm:flex w-10 h-10 rounded-lg bg-white/[0.04]
              border border-white/10 items-center justify-center">
              <User size={18} className="text-zinc-400" />
            </div>

          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <p className="text-xs text-zinc-500 mb-1">Email</p>
              <div className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm">
                {user.email}
              </div>
            </div>

            <div>
              <p className="text-xs text-zinc-500 mb-1">Plan</p>
              <div className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm">
                Free Plan
              </div>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex justify-between items-center">

            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="text-sm text-zinc-400 hover:text-red-400 transition"
            >
              Logout
            </button>

            <button className="px-4 py-2 text-sm rounded-lg
              bg-gradient-to-r from-violet-500 to-indigo-500
              hover:opacity-90 transition">
              Upgrade
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;