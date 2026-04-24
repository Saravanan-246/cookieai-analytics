import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

/* ROUTES */
import analyticsRoutes from "./modules/analytics/routes/analytics.routes.js";
import authRoutes from "./modules/auth/routes/auth.routes.js";

const app = express();

/* =========================
   FIX __dirname (ESM)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   TRUST PROXY (IMPORTANT for IP / geo)
========================= */
app.set("trust proxy", true);

/* =========================
   MIDDLEWARE
========================= */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // restrict in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC FILES (TRACKER SCRIPT)
   → http://localhost:5000/tracker.js
========================= */
app.use(express.static(path.join(__dirname, "../public")));

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API running",
  });
});

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;