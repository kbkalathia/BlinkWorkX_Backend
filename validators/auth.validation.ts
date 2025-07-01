import { body } from "express-validator";

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .optional()
    .isIn(["admin", "developer"])
    .withMessage("Role must be either 'admin' or 'developer'"),
];
