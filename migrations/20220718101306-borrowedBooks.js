/* eslint-disable space-before-function-paren */
const tableName = 'data_borrowed_books';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable(tableName, {
        id: {
          type: Sequelize.INTEGER,
          unique: true,
          autoIncrement: true,
          primaryKey: true,
        },
        uuid: {
          type: Sequelize.UUID,
          unique: true,
          defaultValue: Sequelize.UUIDV4,
        },
        book_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        borrowed_by: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        borrowed_date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        return_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        returned: {
          type: Sequelize.ENUM('0', '1'),
          defaultValue: '0',
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable(tableName),
    ]);
  },
};