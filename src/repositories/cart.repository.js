const CartModel = require('../models/cart.model');
const { Sequelize } = require('sequelize');


module.exports = class CartRepository extends CartModel {

    /**
     * create get User Balance
     * @param {string} userId
     * @param {string} paymentType
     * @return {bool}
     */
     static async getCartBalance() {
        const amounts = await this.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.cast(Sequelize.col('price'), 'float')), 'totalAmount'],
            ],
            raw: true,
        });

        return amounts.map((amount) => amount.totalAmount);
    }
};