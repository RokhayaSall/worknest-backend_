import { body } from "express-validator";

// ─────────────────────────────
// VALIDATE REGISTER
// ─────────────────────────────
export const validateRegister = [
  body("last_name")
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 50 caractères"),

  body("first_name")
    .notEmpty()
    .withMessage("Le prénom est obligatoire")
    .isLength({ min: 2, max: 50 })
    .withMessage("Le prénom doit contenir entre 2 et 50 caractères"),

  body("email")
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Format d'email invalide"),

  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères"),

  body("birth_date")
    .notEmpty()
    .withMessage("La date de naissance est obligatoire"),

  body("gender")
    .notEmpty()
    .withMessage("Le genre est obligatoire"),

  body("number_address")
    .notEmpty()
    .withMessage("Le numéro d'adresse est obligatoire"),

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

// ─────────────────────────────
// VALIDATE LOGIN
// ─────────────────────────────
export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Format d'email invalide"),

  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire"),
];