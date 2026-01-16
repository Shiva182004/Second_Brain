'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      type: {
        type: Sequelize.ENUM(
          'document',
          'tweet',
          'youtube',
          'link'
        ),
        allowNull: false,
      },

      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      tags: {
        type: Sequelize.JSON,
        allowNull: false,
      },

      // 🔗 User reference
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // table name
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // IMPORTANT: Drop ENUM first (Postgres safety)
    await queryInterface.dropTable('Contents');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Contents_type";'
    );
  },
};
