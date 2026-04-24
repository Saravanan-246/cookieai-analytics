// modules/analytics/services/analytics.service.js

import Analytics from "../models/analytics.model.js";

/* SAVE EVENT */
export const saveEvent = async (data) => {
  try {
    return await Analytics.create(data);
  } catch (err) {
    console.error("saveEvent error:", err.message);
    throw new Error("Failed to save event");
  }
};

/* GET STATS */
export const getStats = async (siteId) => {
  try {
    const total = await Analytics.countDocuments({
      siteId,
      type: "page_view",
    });

    return { total };
  } catch (err) {
    console.error("getStats error:", err.message);
    return { total: 0 };
  }
};

/* DEVICE BREAKDOWN */
export const getDeviceBreakdown = async (siteId) => {
  return Analytics.aggregate([
    { $match: { siteId, type: "page_view" } },
    {
      $group: {
        _id: "$device",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

/* COUNTRY STATS */
export const getCountryStats = async (siteId) => {
  return Analytics.aggregate([
    { $match: { siteId, type: "page_view" } },
    {
      $group: {
        _id: "$country",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

/* OS STATS (MISSING BEFORE) */
export const getOSStats = async (siteId) => {
  return Analytics.aggregate([
    { $match: { siteId, type: "page_view" } },
    {
      $group: {
        _id: "$os",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

/* PAGE STATS (MISSING BEFORE) */
export const getPageStats = async (siteId) => {
  return Analytics.aggregate([
    { $match: { siteId, type: "page_view" } },
    {
      $group: {
        _id: "$page",
        views: { $sum: 1 },
      },
    },
    { $sort: { views: -1 } },
    { $limit: 10 },
  ]);
};

/* REFERRER STATS */
export const getReferrerStats = async (siteId) => {
  return Analytics.aggregate([
    { $match: { siteId, type: "page_view" } },
    {
      $group: {
        _id: "$referrer",
        visits: { $sum: 1 },
      },
    },
    { $sort: { visits: -1 } },
  ]);
};

/* AVG SESSION */
export const getAvgSession = async (siteId) => {
  try {
    const result = await Analytics.aggregate([
      {
        $match: {
          siteId,
          type: "session_end",
          duration: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: null,
          avgDuration: { $avg: "$duration" },
        },
      },
    ]);

    return result[0]?.avgDuration || 0;
  } catch (err) {
    console.error("avg session error:", err.message);
    return 0;
  }
};

/* 🔥 CHART DATA (THIS WAS MISSING → CAUSED ERROR) */
export const getChartData = async (siteId) => {
  try {
    const now = new Date();
    const start = new Date();
    start.setDate(now.getDate() - 6);

    const result = await Analytics.aggregate([
      {
        $match: {
          siteId,
          type: "page_view",
          timestamp: { $gte: start },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$timestamp",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const days = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));

      const key = d.toISOString().slice(0, 10);
      const found = result.find((r) => r._id === key);

      days.push({
        day: i,
        value: found ? found.count : 0,
      });
    }

    return days;
  } catch (err) {
    console.error("chart data error:", err.message);
    return [];
  }
};