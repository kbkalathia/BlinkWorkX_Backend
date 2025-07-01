import { HttpStatusCode } from "axios";
import { decodeToken, SendResponse } from "../utils/helpers";
import DevelopersService from "../services/developer.service";

class DevelopersClass {
  async getTasksForDeveloper(req: any, res: any) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decodedToken: any = decodeToken(token);
      const developerId = decodedToken.id;

      const tasks = await DevelopersService.getTasksForDeveloper(
        Number(developerId)
      );

      return SendResponse({
        res,
        data: tasks,
        message: "Tasks assigned to developer",
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error: " + error.message,
      });
    }
  }

  async updateTaskForDeveloper(req: any, res: any) {
    try {
      const { taskId } = req.params;

      const token = req.headers.authorization.split(" ")[1];

      const decodedToken: any = decodeToken(token);
      const developerId = decodedToken.id;

      const updatedTask = await DevelopersService.updateTaskForDeveloper(
        Number(developerId),
        Number(taskId),
        req.body
      );

      return SendResponse({
        res,
        data: updatedTask,
        message: "Developer's task updated",
      });
    } catch (error: any) {
      return SendResponse({
        res,
        status: HttpStatusCode.BadRequest,
        message: "Error: " + error.message,
      });
    }
  }
}

const DevelopersController = new DevelopersClass();
export default DevelopersController;
