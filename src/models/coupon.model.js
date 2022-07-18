const { Model, Sequelize } = require('sequelize');
const { seq: DB } = require('../../sequelize');

/**
 * Class for Coupon Model
 */
class Coupon extends Model { };

Coupon.init({
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
    discount_percent: {
        type: Sequelize.STRING(255),
        defaultValue: 0,
    },
    discount_amount: {
        type: Sequelize.STRING(255),
        defaultValue: 0,
    },
    cart_item: {
        type: Sequelize.STRING(255),
        defaultValue: 0,
    },
    cart_total: {
        type: Sequelize.STRING(255),
        defaultValue: 0,
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
    tableName: 'data_rules',
    underscored: false,
    timestamps: true,
    sequelize: DB,
});

module.exports = Coupon;