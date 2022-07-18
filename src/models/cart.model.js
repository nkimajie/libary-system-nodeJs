const { Model, Sequelize } = require('sequelize');
const { seq: DB } = require('../../sequelize');

/**
 * Class for LGA Model
 */
class Cart extends Model {};

Cart.init({
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
}, {
    tableName: 'data_cart_item',
    underscored: false,
    timestamps: true,
    sequelize: DB,
});

module.exports = Cart;