import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { isAdmin, isDeveloper, validateRequest } from "./middlewares/validate";
import AuthController from "./controllers/auth.controller";
import {
  loginValidation,
  registerValidation,
} from "./validators/auth.validation";

import AdminController from "./controllers/admin.controller";
import DevelopersController from "./controllers/developer.controller";
import {
  getOrDeleteDeveloperValidation,
  createDeveloperValidation,
  updateDeveloperValidation,
  createTaskValidation,
  getOrDeleteTaskValidation,
  updateTaskValidation,
} from "./validators/admin.validation";
import {
  getTasksForDeveloperValidation,
  updateTaskForDeveloperValidation,
} from "./validators/developer.validation";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(validateRequest);

// Auth
app.post("/api/login", loginValidation, AuthController.login);
app.post("/api/register", registerValidation, AuthController.register);

// For Developer Only
app.get(
  "/api/task-for-developer",
  isDeveloper,
  getTasksForDeveloperValidation,
  DevelopersController.getTasksForDeveloper
);

app.put(
  "/api/task-for-developer/:taskId",
  isDeveloper,
  updateTaskForDeveloperValidation,
  DevelopersController.updateTaskForDeveloper
);

// For Admin Only
// Developers
app.get("/api/developers", isAdmin, AdminController.getAllDevelopers);
app.get(
  "/api/developer/:id",
  getOrDeleteDeveloperValidation,
  isAdmin,
  AdminController.getDeveloperById
);
app.post(
  "/api/developer",
  createDeveloperValidation,
  isAdmin,
  AdminController.createDeveloper
);

app.put(
  "/api/developer/:id",
  updateDeveloperValidation,
  isAdmin,
  AdminController.updateDeveloper
);

app.delete(
  "/api/developer/:id",
  getOrDeleteDeveloperValidation,
  isAdmin,
  AdminController.deleteDeveloper
);

// Tasks
app.get("/api/tasks", AdminController.getAllTasks);
app.post("/api/task", createTaskValidation, AdminController.createTask);
app.get(
  "/api/task/:id",
  getOrDeleteTaskValidation,
  AdminController.getTaskById
);
app.put("/api/task/:id", updateTaskValidation, AdminController.updateTask);
app.delete(
  "/api/task/:id",
  getOrDeleteTaskValidation,
  AdminController.deleteTask
);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
