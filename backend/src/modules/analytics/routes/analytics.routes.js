import express from "express";
import {
  trackEvent,
  getAnalytics,
} from "../controllers/analytics.controller.js";

import { validateSite } from "../../../middleware/validateSite.js";
import { protect } from "../../../middleware/auth.js";

const router = express.Router();

/* =========================
   PUBLIC: TRACKING
   Used by tracker script
========================= */
router.post("/track", validateSite, trackEvent);

/* =========================
   PROTECTED: ANALYTICS
   Requires login (JWT)
========================= */
router.get("/", protect, getAnalytics);

export default router;