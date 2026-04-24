import http from "http";
import app from "./app.js";

import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import { initSocket } from "./socket/socket.js";

/* =========================
   CREATE SERVER
========================= */
const server = http.createServer(app);

/* =========================
   INIT SOCKET
========================= */
initSocket(server);

/* =========================
   START SERVER
========================= */
const startServer = async () => {
  try {
    await connectDB();

    const PORT = ENV.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Server start failed:", err.message);
    process.exit(1);
  }
};

/* =========================
   GRACEFUL SHUTDOWN
========================= */
const shutdown = (signal = "unknown") => {
  console.log(`Received ${signal}. Shutting down...`);

  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });

  // force shutdown if something hangs
  setTimeout(() => {
    console.error("Force shutdown");
    process.exit(1);
  }, 5000);
};

/* =========================
   ERROR HANDLING
========================= */
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  shutdown("unhandledRejection");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  shutdown("uncaughtException");
});

/* =========================
   SYSTEM SIGNALS
========================= */
process.on("SIGINT", () => shutdown("SIGINT"));     // Ctrl + C
process.on("SIGTERM", () => shutdown("SIGTERM"));   // Hosting stop

/* =========================
   START
========================= */
startServer();