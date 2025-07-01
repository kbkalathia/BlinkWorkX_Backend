import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const DevelopersModel = sequelize.define(
  "Developers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "developer"),
      allowNull: false,
      defaultValue: "developer",
    },
  },
  {
    timestamps: true,
    tableName: "Developers",
    freezeTableName: true,
  }
);

export default DevelopersModel;
