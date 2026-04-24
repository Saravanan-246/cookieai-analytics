import geoip from "geoip-lite";

/* =========================
   GET CLIENT IP
========================= */
const getClientIP = (req) => {
  try {
    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.headers["x-real-ip"] ||
      req.socket?.remoteAddress ||
      req.connection?.remoteAddress ||
      "";

    // normalize IPv6 localhost
    if (ip === "::1") ip = "127.0.0.1";

    // remove IPv6 prefix (e.g. ::ffff:127.0.0.1)
    if (ip.startsWith("::ffff:")) {
      ip = ip.replace("::ffff:", "");
    }

    return ip;
  } catch {
    return "";
  }
};

/* =========================
   GET GEO INFO
========================= */
export const getGeo = (req) => {
  try {
    const ip = getClientIP(req);

    // skip local/dev IPs
    if (!ip || ip.startsWith("127.") || ip === "localhost") {
      return {
        ip,
        country: "local",
      };
    }

    const geo = geoip.lookup(ip);

    return {
      ip,
      country: geo?.country || "unknown",
      region: geo?.region || "",
      city: geo?.city || "",
    };
  } catch (err) {
    console.error("Geo error:", err.message);

    return {
      ip: "",
      country: "unknown",
      region: "",
      city: "",
    };
  }
};