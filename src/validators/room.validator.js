import { body } from "express-validator";

export const validateRoom = [
  body("listing_id")
    .notEmpty()
    .withMessage("Listing obligatoire")
    .isInt()
    .withMessage("Listing invalide"),

  body("room_number")
    .notEmpty()
    .withMessage("Le numéro de chambre est obligatoire"),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description trop longue"),

  body("price")
    .notEmpty()
    .withMessage("Le prix est obligatoire")
    .isFloat({ min: 0 })
    .withMessage("Prix invalide"),

  body("start_at")
    .notEmpty()
    .withMessage("Date de début obligatoire")
    .isISO8601()
    .withMessage("Date invalide"),

  body("end_at")
    .notEmpty()
    .withMessage("Date de fin obligatoire")
    .isISO8601()
    .withMessage("Date invalide"),
];