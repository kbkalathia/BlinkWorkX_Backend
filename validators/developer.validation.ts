import { param, body } from "express-validator";

export const getTasksForDeveloperValidation = [
  param("developerId")
    .isInt({ min: 1 })
    .withMessage("developerId must be a valid integer"),
];

export const updateTaskForDeveloperValidation = [
  param("developerId")
    .isInt({ min: 1 })
    .withMessage("developerId must be a valid integer"),
  param("taskId")
    .isInt({ min: 1 })
    .withMessage("taskId must be a valid integer"),

  body("status")
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Invalid status value"),
];
