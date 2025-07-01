"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "Tasks",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          status: {
            type: Sequelize.ENUM("pending", "in_progress", "completed"),
            allowNull: false,
            defaultValue: "pending",
          },
          assigned_developer_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: "Developers",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("NOW"),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("NOW"),
          },
        },
        { transaction }
      );

      // Prepopulate tasks
      await queryInterface.bulkInsert(
        "Tasks",
        [
          {
            title: "Design database schema",
            description:
              "Define and create all necessary tables and relations.",
            status: "completed",
            assigned_developer_id: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "Implement login system",
            description: "Allow admin and developer roles to authenticate.",
            status: "in_progress",
            assigned_developer_id: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "Setup CI/CD pipeline",
            description: "Configure automatic build and deployment.",
            status: "pending",
            assigned_developer_id: 2,
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
      await queryInterface.dropTable("Tasks", { transaction });
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_Tasks_status";',
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
