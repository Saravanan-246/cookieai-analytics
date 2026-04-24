// src/config/env.js

import dotenv from "dotenv";

dotenv.config();

/* 🔥 REQUIRED ENV VARIABLES */
const requiredEnv = ["MONGO_URI"];

/* 🔥 VALIDATION */
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

/* 🔥 EXPORT CONFIG */
export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
};