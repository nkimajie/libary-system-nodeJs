const { Model, Sequelize } = require('sequelize');
const { seq: DB } = require('../../sequelize');

/**
 * Class for LGA Model
 */
class Books extends Model {};

Books.init({
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
      publisher: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      available: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue: 1,
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
    tableName: 'data_books',
    underscored: false,
    timestamps: true,
    sequelize: DB,
});

module.exports = Books;