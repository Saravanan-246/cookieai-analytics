/* =========================
   CONFIG
========================= */
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 min

/* =========================
   IN-MEMORY STORE
========================= */
const sessionStore = new Map();

/* =========================
   GET / CREATE SESSION
========================= */
export const getSession = (visitorId = "anon") => {
  try {
    if (!visitorId || typeof visitorId !== "string") {
      visitorId = "anon";
    }

    const now = Date.now();
    const existing = sessionStore.get(visitorId);

    /* NEW SESSION */
    if (!existing || now - existing.lastActivity > SESSION_TIMEOUT) {
      const sessionId = `${visitorId}_${now}`;

      sessionStore.set(visitorId, {
        sessionId,
        lastActivity: now,
      });

      return sessionId;
    }

    /* CONTINUE SESSION */
    existing.lastActivity = now;
    return existing.sessionId;

  } catch (err) {
    console.error("Session error:", err.message);
    return `${visitorId}_${Date.now()}`;
  }
};

/* =========================
   OPTIONAL: FORCE END SESSION
========================= */
export const endSession = (visitorId) => {
  if (!visitorId) return;
  sessionStore.delete(visitorId);
};

/* =========================
   CLEANUP (MEMORY SAFE)
========================= */
setInterval(() => {
  try {
    const now = Date.now();

    for (const [visitorId, data] of sessionStore.entries()) {
      if (now - data.lastActivity > SESSION_TIMEOUT) {
        sessionStore.delete(visitorId);
      }
    }

    // optional: debug size
    // console.log("Active sessions:", sessionStore.size);

  } catch (err) {
    console.error("Session cleanup error:", err.message);
  }
}, CLEANUP_INTERVAL);