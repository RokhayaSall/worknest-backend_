import express from "express";

import {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { authorize } from "../middlewares/authorize.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import { validateRoom } from "../validators/room.validator.js";

const router = express.Router();

// ─────────────────────────────
// PUBLIC ROUTES
// ─────────────────────────────

router.get("/", getRooms);

router.get("/:id", getRoom);

// ─────────────────────────────
// PRIVATE ROUTES
// ─────────────────────────────

router.post(
  "/",
  authMiddleware,
  authorize(
    "proprietaire",
    "admin"
  ),
  validateRoom,
  validate,
  createRoom
);

router.put(
  "/:id",
  authMiddleware,
  authorize(
    "proprietaire",
    "admin"
  ),
  validateRoom,
  validate,
  updateRoom
);

router.delete(
  "/:id",
  authMiddleware,
  authorize(
    "proprietaire",
    "admin"
  ),
  deleteRoom
);

export default router;