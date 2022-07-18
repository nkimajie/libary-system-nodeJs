/* eslint-disable space-before-function-paren */
const tableName = 'data_cart_item';

module.exports = {
    up: async(queryInterface, Sequelize) => {
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
                name: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                price: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
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

    down: async(queryInterface, Sequelize) => {
        await Promise.all([
            queryInterface.dropTable(tableName),
        ]);
    },
};