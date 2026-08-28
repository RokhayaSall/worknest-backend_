import express from "express";

import {
  getReservations,
  getReservation,
  getMyReservations,
  createReservation,
} from "../controllers/reservation.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getReservations);

router.get(
  "/my-reservations",
  authMiddleware,
  getMyReservations
);

router.get("/:id", getReservation);

router.post(
  "/",
  authMiddleware,
  createReservation
);

export default router;