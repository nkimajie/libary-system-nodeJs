/* eslint-disable space-before-function-paren */
const tableName = 'data_rules';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn(tableName, 'cart_item', {
        type: Sequelize.STRING(255),
        defaultValue: 0,
      }),
      queryInterface.addColumn(tableName, 'cart_total', {
        type: Sequelize.STRING(255),
        defaultValue: 0,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn(tableName, 'cart_item'),
      queryInterface.removeColumn(tableName, 'cart_total'),
    ]);
  },
};