import express from "express";
import { authUser } from "../controllers/auth.controller.js";

const router = express.Router();

/* AUTH (LOGIN + SIGNUP) */
router.post("/", authUser);

export default router;