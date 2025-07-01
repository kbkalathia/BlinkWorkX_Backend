import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import DevelopersModel from "./developers.model";

const TaskModel = sequelize.define(
  "Tasks",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    assigned_developer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Developers",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "Tasks",
    timestamps: true,
  }
);

export default TaskModel;

DevelopersModel.hasMany(TaskModel, {
  foreignKey: "assigned_developer_id",
  as: "assignedTasks",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
TaskModel.belongsTo(DevelopersModel, {
  foreignKey: "assigned_developer_id",
  as: "assignedDeveloper",
});
