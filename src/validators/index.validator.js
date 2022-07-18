const Joi = require('joi');

module.exports = class EnrollmentSchema {
    /**
     * addCouponRules
     */
    static get addCouponRules() {
        return Joi.object({
            name: Joi.string().required(),
            discount_percent: Joi.number().required(),
            discount_amount: Joi.number().required(),
            cart_item: Joi.number().required(),
            cart_total: Joi.number().required(),
        });
    }

    /**
     * addCartItem
     */
    static get addCartItem() {
        return Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
        });
    }



};