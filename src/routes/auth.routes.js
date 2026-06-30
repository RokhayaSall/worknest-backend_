import express from "express";

import {
  register,
  login,
  getProfile,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateLogin, validateRegister } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

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

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

export default router;