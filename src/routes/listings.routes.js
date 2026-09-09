import express from "express";

import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getMyListings,
} from "../controllers/listing.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import { authorize } from "../middlewares/authorize.middleware.js";

import { validateListing } from "../validators/listing.validator.js";

const router = express.Router();

router.get("/", getListings);

router.get(
  "/my-listings",
  authMiddleware,
  authorize("proprietaire", "admin"),
  getMyListings
);

router.get("/:id", getListing);

router.post(
  "/",
  authMiddleware,
  authorize(
    "proprietaire",
    "admin"
  ),
  validateListing,
  validate,
  createListing
);

router.put(
  "/:id",
  authMiddleware,
  authorize(
    "proprietaire",
    "admin"
  ),
  validateListing,
  validate,
  updateListing
);



router.delete(
  "/:id",
  authMiddleware,
  authorize(
    "proprietaire",
    "admin"
  ),
  deleteListing
);

export default router;