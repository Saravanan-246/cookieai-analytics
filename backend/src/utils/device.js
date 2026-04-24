import { UAParser } from "ua-parser-js";

/* =========================
   DEVICE PARSER
========================= */
export const getDeviceInfo = (userAgent = "") => {
  try {
    if (!userAgent || typeof userAgent !== "string") {
      return defaultDevice();
    }

    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
      type: normalizeDeviceType(result.device.type),
      browser: result.browser.name || "unknown",
      os: result.os.name || "unknown",
    };

  } catch (err) {
    console.error("Device parse error:", err.message);
    return defaultDevice();
  }
};

/* =========================
   NORMALIZE DEVICE TYPE
========================= */
const normalizeDeviceType = (type) => {
  if (!type) return "desktop";

  if (type === "mobile") return "mobile";
  if (type === "tablet") return "tablet";
  if (type === "smarttv") return "tv";
  if (type === "console") return "console";

  return "desktop";
};

/* =========================
   DEFAULT FALLBACK
========================= */
const defaultDevice = () => ({
  type: "desktop",
  browser: "unknown",
  os: "unknown",
});