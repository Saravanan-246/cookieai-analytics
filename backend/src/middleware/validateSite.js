// src/middleware/validateSite.js

/* =========================================
   SITE REGISTRY (TEMP - IN MEMORY)
   Later replace with DB
========================================= */
const allowedSites = [
  {
    siteId: "site_123",
    domains: ["localhost"], // dev
  },
  {
    siteId: "learning_platform",
    domains: ["cubeai-academy.vercel.app"], // ✅ your real site
  },
];
/* =========================================
   VALIDATE SITE
========================================= */
export const validateSite = (req, res, next) => {
  try {
    const { siteId } = req.body;

    /* 1. CHECK SITE ID */
    if (!siteId) {
      return res.status(400).json({ error: "siteId is required" });
    }

    if (typeof siteId !== "string" || siteId.length < 5) {
      return res.status(400).json({ error: "Invalid siteId format" });
    }

    /* 2. FIND SITE */
    const site = allowedSites.find((s) => s.siteId === siteId);

    if (!site) {
      return res.status(403).json({ error: "Unauthorized siteId" });
    }

    /* 3. DOMAIN VALIDATION */
    const origin = req.headers.origin || "";
    const referer = req.headers.referer || "";

    const isValidDomain = site.domains.some(
      (domain) =>
        origin.includes(domain) || referer.includes(domain)
    );

    if (!isValidDomain) {
      console.warn("Blocked request:", {
        siteId,
        origin,
        referer,
      });

      return res.status(403).json({
        error: "Unauthorized domain",
      });
    }

    /* 4. PASS */
    next();

  } catch (err) {
    console.error("validateSite error:", err.message);

    return res.status(500).json({
      error: "Validation failed",
    });
  }
};


/* =========================================
   REGISTER NEW SITE (DEV ONLY)
========================================= */
export const registerSite = (siteId, domain = "localhost") => {
  if (!siteId) return;

  allowedSites.push({
    siteId,
    domains: [domain],
  });
};