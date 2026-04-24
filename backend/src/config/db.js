// src/config/db.js

import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) {
      console.error("❌ MONGO_URI not found");
      process.exit(1);
    }

    const conn = await mongoose.connect(ENV.MONGO_URI, {
      autoIndex: true, // good for dev
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    // retry after 5 sec (simple + useful)
    setTimeout(connectDB, 5000);
  }
};

/* 🔥 OPTIONAL: connection logs (helpful) */
mongoose.connection.on("connected", () => {
  console.log("📡 DB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("⚠️ DB error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("🔌 DB disconnected");
});