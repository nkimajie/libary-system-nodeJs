// eslint-disable-next-line no-unused-vars
const awilix = require('awilix');
const $ = require('express-async-handler');
const router = require('express').Router();
const Validator = require('../../helpers/validator');
const indexSchema = require('../validators/index.validator');


/**
 * index routes
 * @param {awilix.AwilixContainer} container ioc container
 * @return {express.Router}
 */
module.exports.loadIndexRoutes = function loadIndexRoutes(container) {
    const indexController = container.resolve('indexController');

    router.route('/get-all-cart-item').get(
        $((...args) => indexController.getAllCartItem(...args)),
    );

    router.route('/add-cart-item').post(
        Validator(indexSchema.addCartItem),
        $((...args) => indexController.addCartItem(...args)),
    );

    router.route('/add-coupon-rules').post(
        Validator(indexSchema.addCouponRules),
        $((...args) => indexController.addCouponRules(...args)),
    );

    router.route('/apply-coupon-to-cart').get(
        $((...args) => indexController.applyCouponToCart(...args)),
    );

    return router;
};