import { body } from "express-validator";

export const validateListing = [
  body("title")
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "Le titre doit contenir entre 5 et 100 caractères"
    ),

  body("description")
    .notEmpty()
    .withMessage("La description est obligatoire")
    .isLength({ min: 20 })
    .withMessage(
      "La description doit contenir au moins 20 caractères"
    ),

  body("service")
    .notEmpty()
    .withMessage("Les services sont obligatoires"),

  body("equipment")
    .notEmpty()
    .withMessage("Les équipements sont obligatoires"),

  body("capacity")
    .notEmpty()
    .withMessage("La capacité est obligatoire")
    .isInt({ min: 1 })
    .withMessage(
      "La capacité doit être supérieure à 0"
    ),

  body("number_address")
    .notEmpty()
    .withMessage(
      "Le numéro de rue est obligatoire"
    ),

  body("street")
    .notEmpty()
    .withMessage("La rue est obligatoire"),

  body("city")
    .notEmpty()
    .withMessage("La ville est obligatoire"),

  body("postal_code")
    .notEmpty()
    .withMessage("Le code postal est obligatoire"),

  body("country")
    .notEmpty()
    .withMessage("Le pays est obligatoire"),
];