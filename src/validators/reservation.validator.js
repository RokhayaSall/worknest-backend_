import { body } from "express-validator";

export const validateReservation = [
  body("room_id")
    .notEmpty()
    .withMessage("La chambre est obligatoire")
    .isInt({ min: 1 })
    .withMessage("ID de chambre invalide"),

  body("start_at")
    .notEmpty()
    .withMessage("La date de début est obligatoire")
    .isISO8601()
    .withMessage("Date de début invalide"),

  body("end_at")
    .notEmpty()
    .withMessage("La date de fin est obligatoire")
    .isISO8601()
    .withMessage("Date de fin invalide"),

  body("status")
    .optional()
    .isIn([
      "pending",
      "confirmed",
      "cancelled",
    ])
    .withMessage("Statut invalide"),
];