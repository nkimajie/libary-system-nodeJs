const { Model, Sequelize } = require('sequelize');
const { seq: DB } = require('../../sequelize');

/**
 * Class for Borrowed Model
 */
class Borrowed extends Model { };

Borrowed.init({
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
}, {
    tableName: 'data_borrowed_books',
    underscored: false,
    timestamps: true,
    sequelize: DB,
});

module.exports = Borrowed;