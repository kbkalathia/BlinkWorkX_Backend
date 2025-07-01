import { HttpStatusCode } from "axios";
import { SendResponse } from "../utils/helpers";
import AdminService from "../services/admin.service";

class AdminControllerClass {
  async getAllDevelopers(req: any, res: any) {
    try {
      const developers = await AdminService.getAllDevelopers();
      return SendResponse({ res, data: developers, message: "All Developers" });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error: " + error.message,
      });
    }
  }

  async createDeveloper(req: any, res: any) {
    try {
      const dev = await AdminService.createDeveloper(req.body);
      return SendResponse({
        res,
        data: dev,
        status: HttpStatusCode.Created,
        message: "Developer created",
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error: " + error.message,
      });
    }
  }

  async getDeveloperById(req: any, res: any) {
    try {
      const developer = await AdminService.getDeveloperById(req.params.id);
      return SendResponse({
        res,
        data: developer,
        message: "Developer details",
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.NotFound,
        message: error.message,
      });
    }
  }

  async updateDeveloper(req: any, res: any) {
    try {
      const updated = await AdminService.updateDeveloper(
        Number(req.params.id),
        req.body
      );
      return SendResponse({ res, data: updated, message: "Developer updated" });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.BadRequest,
        message: error.message,
      });
    }
  }

  async deleteDeveloper(req: any, res: any) {
    try {
      await AdminService.deleteDeveloper(req.params.id);
      return SendResponse({ res, message: "Developer deleted" });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.NotFound,
        message: error.message,
      });
    }
  }

  // Task Controller
  async getAllTasks(req: any, res: any) {
    try {
      const tasks = await AdminService.getAllTasks();
      return SendResponse({ res, data: tasks, message: "All Tasks" });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error: " + error.message,
      });
    }
  }

  async createTask(req: any, res: any) {
    try {
      const task = await AdminService.createTask(req.body);
      return SendResponse({
        res,
        data: task,
        status: HttpStatusCode.Created,
        message: "Task created",
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.BadRequest,
        message: "Error: " + error.message,
      });
    }
  }

  async getTaskById(req: any, res: any) {
    try {
      const task = await AdminService.getTaskById(req.params.id);
      return SendResponse({
        res,
        data: task,
        message: "Task details",
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.NotFound,
        message: error.message,
      });
    }
  }

  async updateTask(req: any, res: any) {
    try {
      const updatedTask = await AdminService.updateTask(
        Number(req.params.id),
        req.body
      );
      return SendResponse({
        res,
        data: updatedTask,
        message: "Task updated",
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.BadRequest,
        message: error.message,
      });
    }
  }

  async deleteTask(req: any, res: any) {
    try {
      await AdminService.deleteTask(req.params.id);
      return SendResponse({ res, message: "Task deleted" });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.NotFound,
        message: error.message,
      });
    }
  }
}

const AdminController = new AdminControllerClass();
export default AdminController;
