const API = import.meta.env.VITE_API_URL;

/* AUTH */
export const authUser = async (payload) => {
  const res = await fetch(`${API}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Auth failed");
  }

  return data;
};