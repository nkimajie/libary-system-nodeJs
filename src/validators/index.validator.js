const Joi = require('joi');

module.exports = class EnrollmentSchema {
    /**
     * enrollUserSchema
     */
    static get enrollUserSchema() {
        return Joi.object({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().email().required(),
        });
    }

    /**
     * addBooksSchema
     */
    static get addBooksSchema() {
        return Joi.object({
            name: Joi.string().required(),
            publisher: Joi.string().required(),
            category: Joi.string().required(),
        });
    }

    /**
     * borrowBookSchema
     */
     static get borrowBookSchema() {
        return Joi.object({
            bookId: Joi.string().required(),
            userId: Joi.string().required(),
            days: Joi.number().required(),
        });
    }



};