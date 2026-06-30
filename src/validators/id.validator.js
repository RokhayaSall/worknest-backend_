// validators/id.validator.js

import { param } from "express-validator";

export const validateId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage(
      "L'identifiant doit être un entier positif"
    ),
];