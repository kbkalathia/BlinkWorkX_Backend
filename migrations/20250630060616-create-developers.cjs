"use strict";

const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Pre-populating data
      const hashedAdmin = await bcrypt.hash("admin123", 10);
      const hashedDev = await bcrypt.hash("dev123", 10);

      await queryInterface.createTable(
        "Developers",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
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
            defaultValue: hashedDev,
          },
          role: {
            type: DataTypes.ENUM("admin", "developer"),
            allowNull: false,
            defaultValue: "developer",
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW"),
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW"),
          },
        },
        { transaction }
      );

      await queryInterface.bulkInsert(
        "Developers",
        [
          {
            name: "Admin One",
            email: "admin@user.com",
            password: hashedAdmin,
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Developer One",
            email: "dev1@user.com",
            password: hashedDev,
            role: "developer",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("Developers", { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
