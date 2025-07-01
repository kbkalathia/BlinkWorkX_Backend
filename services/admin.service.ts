import { NewDeveloperData } from "../interfaces/developer.interface";
import DevelopersModel from "../models/developers.model";
import TaskModel from "../models/tasks.model";
import { HashPassword } from "../utils/helpers";

class AdminServiceClass {
  async getAllDevelopers() {
    return await DevelopersModel.findAll({
      attributes: ["id", "name", "email", "role"],
      order: [["createdAt", "DESC"]],
      where: {
        role: "developer",
      },
    });
  }

  async createDeveloper(userData: {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "developer";
  }) {
    const { name, email, password, role = "developer" } = userData;

    const existing = await DevelopersModel.findOne({ where: { email } });
    if (existing) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await HashPassword(password);

    let newDevInstance = await DevelopersModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const newDeveloper: NewDeveloperData = newDevInstance.toJSON();

    return {
      id: newDeveloper.id,
      name: newDeveloper.name,
      email: newDeveloper.email,
      role: newDeveloper.role,
    };
  }

  async getDeveloperById(id: string) {
    const developer = await DevelopersModel.findByPk(id, {
      attributes: ["id", "name", "email", "role"],
    });

    if (!developer) throw new Error("Developer not found");
    return developer;
  }

  async updateDeveloper(id: number, updates: any) {
    const developer: any = await DevelopersModel.findByPk(id);
    if (!developer) throw new Error("Developer not found");

    if (updates.password) {
      updates.password = await HashPassword(updates.password);
    }

    await developer.update(updates);

    return {
      id: developer.id,
      name: developer.name,
      email: developer.email,
      role: developer.role,
    };
  }

  async deleteDeveloper(id: string) {
    const deleted = await DevelopersModel.destroy({ where: { id } });
    if (!deleted) throw new Error("Developer not found or already deleted");
    return true;
  }

  //   Tasks Service
  async getAllTasks() {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: DevelopersModel,
          as: "assignedDeveloper",
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // To get assigned developer's name directly
    return tasks.map((task) => {
      const { assignedDeveloper, ...rest } = task.toJSON();
      return {
        ...rest,
        assigned_developer: assignedDeveloper?.name || null,
      };
    });
  }

  async createTask(data: {
    title: string;
    description?: string;
    status?: "pending" | "in_progress" | "completed";
    assigned_developer_id?: number;
  }) {
    const task = await TaskModel.create(data);
    return task;
  }

  async getTaskById(id: string) {
    const task = await TaskModel.findByPk(id, {
      include: [
        {
          model: DevelopersModel,
          as: "assignedDeveloper",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!task) throw new Error("Task not found");
    return task;
  }

  async updateTask(id: number, updates: any) {
    const task = await TaskModel.findByPk(id);
    if (!task) throw new Error("Task not found");

    await task.update(updates);
    return task;
  }

  async deleteTask(id: string) {
    const deleted = await TaskModel.destroy({ where: { id } });
    if (!deleted) throw new Error("Task not found or already deleted");
    return true;
  }
}

const AdminService = new AdminServiceClass();
export default AdminService;
