import { Server } from "socket.io";

let io = null;

/* =========================
   INIT SOCKET
========================= */
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    /* JOIN SITE ROOM */
    socket.on("join-site", (siteId) => {
      if (!siteId || typeof siteId !== "string") return;

      socket.join(siteId);
      console.log(`${socket.id} joined ${siteId}`);
    });

    /* LEAVE SITE */
    socket.on("leave-site", (siteId) => {
      if (!siteId || typeof siteId !== "string") return;

      socket.leave(siteId);
      console.log(`${socket.id} left ${siteId}`);
    });

    /* OPTIONAL: AUTO JOIN FROM QUERY */
    const siteId = socket.handshake.query?.siteId;
    if (siteId) {
      socket.join(siteId);
      console.log(`${socket.id} auto-joined ${siteId}`);
    }

    /* DISCONNECT */
    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
};

/* =========================
   GET IO INSTANCE
========================= */
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

/* =========================
   EMIT TO SITE
========================= */
export const emitToSite = (siteId, event, payload) => {
  if (!io) {
    console.error("Socket not initialized");
    return;
  }

  if (!siteId || typeof siteId !== "string") return;

  io.to(siteId).emit(event, payload);
};