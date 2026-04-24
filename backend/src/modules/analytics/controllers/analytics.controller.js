// modules/analytics/controllers/analytics.controller.js

import {
  saveEvent,
  getStats,
  getDeviceBreakdown,
  getCountryStats,
  getOSStats,
  getPageStats,
  getChartData,
  getAvgSession,
  getReferrerStats,
} from "../services/analytics.service.js";

import { getDeviceInfo } from "../../../utils/device.js";
import { getGeo } from "../../../utils/geo.js";
import { getSession } from "../../../utils/session.js";
import { emitToSite } from "../../../socket/socket.js";

/* =========================================
   TRACK EVENT (POST)
========================================= */
export const trackEvent = async (req, res) => {
  try {
    const {
      siteId,
      page = "/",
      type = "page_view",
      visitorId = "anon",
      duration = 0,
      referrer = "direct",
    } = req.body;

    /* VALIDATION */
    if (!siteId || typeof siteId !== "string") {
      return res.status(400).json({ error: "Invalid siteId" });
    }

    /* DEVICE + GEO */
    const deviceInfo = getDeviceInfo(req.headers["user-agent"] || "");
    const geo = getGeo(req);

    /* SESSION */
    const sessionId = getSession(visitorId);

    /* BUILD EVENT */
    const eventData = {
      siteId,
      visitorId,
      sessionId,
      page,
      type,
      duration: type === "session_end" ? duration : 0,
      referrer,
      device: deviceInfo.type,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      country: geo.country,
      timestamp: new Date(),
    };

    await saveEvent(eventData);

    /* REAL-TIME UPDATE */
    emitToSite(siteId, "analytics:update", {
      type,
      page,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("trackEvent error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};


/* =========================================
   GET ANALYTICS
========================================= */
export const getAnalytics = async (req, res) => {
  try {
    const { siteId } = req.query;

    if (!siteId) {
      return res.status(400).json({ error: "siteId required" });
    }

    /* FETCH DATA IN PARALLEL (FASTER) */
    const [
      stats,
      devicesRaw,
      countriesRaw,
      osRaw,
      pagesRaw,
      chartData,
      avgSession,
      referrersRaw,
    ] = await Promise.all([
      getStats(siteId),
      getDeviceBreakdown(siteId),
      getCountryStats(siteId),
      getOSStats(siteId),
      getPageStats(siteId),
      getChartData(siteId),
      getAvgSession(siteId),
      getReferrerStats(siteId),
    ]);

    /* FORMAT */
    const devices = devicesRaw.map((d) => ({
      label: d._id || "unknown",
      value: d.count,
    }));

    const countries = countriesRaw.map((c) => ({
      country: c._id || "unknown",
      value: c.count,
    }));

    const os = osRaw.map((o) => ({
      label: o._id || "unknown",
      value: o.count,
    }));

    const pages = pagesRaw.map((p) => ({
      path: p._id || "/",
      views: p.views,
    }));

    const referrers = referrersRaw.map((r) => ({
      source: r._id || "direct",
      visits: r.visits,
    }));

    /* RESPONSE */
    return res.status(200).json({
      chartData,
      stats: {
        total: stats.total || 0,
        change: "+0%",
      },
      avgSession: Math.floor(avgSession || 0),
      insights: [
        "Real-time traffic is active",
        "Users are engaging with your site",
      ],
      breakdown: devices,
      countries,
      devices,
      os,
      pages,
      referrers,
    });

  } catch (error) {
    console.error("getAnalytics error:", error.message);
    return res.status(500).json({
      error: "Failed to fetch analytics",
    });
  }
};