import TaskModel from "../models/tasks.model";

class DevelopersServiceClass {
  async getTasksForDeveloper(developerId: number) {
    const tasks = await TaskModel.findAll({
      where: { assigned_developer_id: developerId },
      order: [["updatedAt", "DESC"]],
    });

    return tasks;
  }

  async updateTaskForDeveloper(
    developerId: number,
    taskId: number,
    updates: any
  ) {
    const task = await TaskModel.findOne({
      where: {
        id: taskId,
        assigned_developer_id: developerId,
      },
    });

    if (!task) {
      throw new Error("Task not found for this developer");
    }

    await task.update(updates);
    return task;
  }
}

const DevelopersService = new DevelopersServiceClass();
export default DevelopersService;
