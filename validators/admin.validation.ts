import { body, param } from "express-validator";

export const createDeveloperValidation = [
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

export const getOrDeleteDeveloperValidation = [
  param("id").isInt().withMessage("Invalid developer ID"),
];

export const updateDeveloperValidation = [
  param("id").isInt().withMessage("Invalid developer ID"),
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Must be a valid email"),
  body("role")
    .optional()
    .isIn(["admin", "developer"])
    .withMessage("Invalid role"),
];

export const createTaskValidation = [
  body("title").notEmpty().withMessage("Title is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Status must be 'pending', 'in_progress' or 'completed'"),

  body("assigned_developer_id")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Assigned developer ID must be a positive integer"),
];

export const getOrDeleteTaskValidation = [
  param("id").isInt({ gt: 0 }).withMessage("Invalid task ID"),
];

export const updateTaskValidation = [
  param("id").isInt({ gt: 0 }).withMessage("Invalid task ID"),

  body("title").optional().notEmpty().withMessage("Title cannot be empty"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage(
      "Status must be one of 'pending', 'in_progress', or 'completed'"
    ),

  body("assigned_developer_id")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Assigned developer ID must be a positive integer"),
];
