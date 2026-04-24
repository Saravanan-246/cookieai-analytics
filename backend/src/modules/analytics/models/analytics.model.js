// modules/analytics/models/analytics.model.js

import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
  {
    /* =========================================
       🔥 CORE IDENTIFIERS
    ========================================= */
    siteId: {
      type: String,
      required: true,
      index: true,
    },

    visitorId: {
      type: String,
      default: "anon",
      index: true,
    },

    sessionId: {
      type: String,
      index: true,
    },

    /* =========================================
       🔥 EVENT
    ========================================= */
    page: {
      type: String,
      default: "/",
    },

    type: {
      type: String,
      default: "page_view", // page_view, session_end, click, etc.
      index: true,
    },

    /* =========================================
       🔥 SESSION DATA (NEW)
    ========================================= */
    duration: {
      type: Number,
      default: 0, // seconds
    },

    /* =========================================
       🔥 REFERRER (NEW)
    ========================================= */
    referrer: {
      type: String,
      default: "direct",
      index: true,
    },

    /* =========================================
       🔥 DEVICE
    ========================================= */
    device: {
      type: String,
      default: "desktop",
      index: true,
    },

    browser: {
      type: String,
      default: "unknown",
    },

    os: {
      type: String,
      default: "unknown",
      index: true,
    },

    /* =========================================
       🔥 GEO
    ========================================= */
    country: {
      type: String,
      default: "unknown",
      index: true,
    },

    /* =========================================
       🔥 TIME
    ========================================= */
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

/* =========================================
   🔥 PERFORMANCE INDEXES
========================================= */

// fast filtering
AnalyticsSchema.index({ siteId: 1, timestamp: -1 });

// session queries
AnalyticsSchema.index({ siteId: 1, sessionId: 1 });

// referrer analytics
AnalyticsSchema.index({ siteId: 1, referrer: 1 });

// device analytics
AnalyticsSchema.index({ siteId: 1, device: 1 });

// OS analytics
AnalyticsSchema.index({ siteId: 1, os: 1 });

// country analytics
AnalyticsSchema.index({ siteId: 1, country: 1 });

// event type (session_end, page_view)
AnalyticsSchema.index({ siteId: 1, type: 1 });

export default mongoose.model("Analytics", AnalyticsSchema);