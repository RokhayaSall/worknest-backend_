import express from "express";

import {
  register,
  login,
  getProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";

import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

// ─────────────────────────────
// PUBLIC ROUTES
// ─────────────────────────────

router.post(
  "/register",
  validateRegister,
  validate,
  register
);

router.post(
  "/login",
  validateLogin,
  validate,
  login
);

// ─────────────────────────────
// PRIVATE ROUTES
// ─────────────────────────────

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// ─────────────────────────────
// ADMIN ROUTES
// ─────────────────────────────

router.get(
  "/users",
  authMiddleware,
  authorize("admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  authorize("admin"),
  deleteUser
);

export default router;