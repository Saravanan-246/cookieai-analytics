/* BASE */
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

/* 🔥 COMMON FETCH (with timeout) */
const fetchJSON = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();

  } catch (err) {
    console.error("API error:", err.message);
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};

/* =========================================
   🔥 ANALYTICS (MODULAR ENDPOINTS)
========================================= */

export const getStats = (siteId) =>
  fetchJSON(`${BASE_URL}/analytics/stats?siteId=${siteId}`);

export const getDevices = (siteId) =>
  fetchJSON(`${BASE_URL}/analytics/devices?siteId=${siteId}`);

export const getOS = (siteId) =>
  fetchJSON(`${BASE_URL}/analytics/os?siteId=${siteId}`);

export const getCountries = (siteId) =>
  fetchJSON(`${BASE_URL}/analytics/countries?siteId=${siteId}`);

export const getPages = (siteId) =>
  fetchJSON(`${BASE_URL}/analytics/pages?siteId=${siteId}`);

export const getReferrers = (siteId) =>
  fetchJSON(`${BASE_URL}/analytics/referrers?siteId=${siteId}`);

export const getChartData = (siteId, range = "7d") =>
  fetchJSON(`${BASE_URL}/analytics/chart?siteId=${siteId}&range=${range}`);


/* =========================================
   🔥 TRACKING (OPTIMIZED)
========================================= */

export const trackVisitor = (payload) => {
  try {
    const url = `${BASE_URL}/track`;

    /* 🔥 USE sendBeacon (best for analytics) */
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      navigator.sendBeacon(url, blob);
      return;
    }

    /* 🔥 FALLBACK */
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  } catch (err) {
    console.error("Tracking error:", err.message);
  }
};