// src/services/tracker.js

const API_URL = import.meta.env.VITE_API_URL;
const SITE_ID = import.meta.env.VITE_SITE_ID;

/* =========================================
   VISITOR ID (STABLE + BETTER)
========================================= */
let visitorId = localStorage.getItem("visitorId");

if (!visitorId) {
  visitorId =
    "v_" +
    crypto.randomUUID?.() ||
    Math.random().toString(36).slice(2, 12);

  localStorage.setItem("visitorId", visitorId);
}

/* =========================================
   SESSION ID (IMPORTANT)
========================================= */
let sessionId = sessionStorage.getItem("sessionId");

if (!sessionId) {
  sessionId = "s_" + Math.random().toString(36).slice(2, 10);
  sessionStorage.setItem("sessionId", sessionId);
}

/* =========================================
   REFERRER (CLEAN DOMAIN)
========================================= */
const getReferrer = () => {
  try {
    if (!document.referrer) return "direct";
    const url = new URL(document.referrer);
    return url.hostname.replace("www.", "");
  } catch {
    return "direct";
  }
};

/* =========================================
   DEVICE + OS
========================================= */
const getDevice = () => {
  const ua = navigator.userAgent;
  if (/bot|crawl|spider/i.test(ua)) return "Bot";
  if (/mobile/i.test(ua)) return "Mobile";
  if (/tablet/i.test(ua)) return "Tablet";
  return "Desktop";
};

const getOS = () => {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad/i.test(ua)) return "iOS";
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "Mac OS";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown";
};

/* =========================================
   SAFE SEND
========================================= */
const sendData = (payload) => {
  if (!API_URL || !SITE_ID) return;

  const url = `${API_URL}/api/track`;
  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(url, blob);
    } else {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch (err) {
    console.error("sendData error:", err.message);
  }
};

/* =========================================
   PAGE TRACK (NO DUPLICATES)
========================================= */
let lastPage = null;

export const trackPage = (page = window.location.pathname) => {
  if (!API_URL || !SITE_ID) return;
  if (page === lastPage) return; // prevent duplicate

  lastPage = page;

  sendData({
    siteId: SITE_ID,
    visitorId,
    sessionId,
    type: "page_view",
    page,
    referrer: getReferrer(),
    device: getDevice(),
    os: getOS(),
    timestamp: new Date().toISOString(),
  });

  sessionStart = Date.now();
};

/* =========================================
   CUSTOM EVENT
========================================= */
export const trackEvent = (eventName, extra = {}) => {
  if (!API_URL || !SITE_ID) return;

  sendData({
    siteId: SITE_ID,
    visitorId,
    sessionId,
    type: eventName,
    page: window.location.pathname,
    referrer: getReferrer(),
    device: getDevice(),
    os: getOS(),
    timestamp: new Date().toISOString(),
    ...extra,
  });
};

/* =========================================
   SESSION TRACKING
========================================= */
let sessionStart = Date.now();
let sessionSent = false;

const sendSession = () => {
  if (sessionSent) return;

  const duration = Math.floor((Date.now() - sessionStart) / 1000);
  if (duration < 2) return;

  sessionSent = true;

  sendData({
    siteId: SITE_ID,
    visitorId,
    sessionId,
    type: "session_end",
    duration,
    page: window.location.pathname,
    referrer: getReferrer(),
    timestamp: new Date().toISOString(),
  });
};

/* =========================================
   AUTO LISTENERS (SMART)
========================================= */
window.addEventListener("beforeunload", sendSession);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    sendSession();
  } else {
    // new active session
    sessionStart = Date.now();
    sessionSent = false;
  }
});tracker