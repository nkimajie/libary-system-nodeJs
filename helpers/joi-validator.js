const Joi = require('joi');

module.exports = class {
    /**
     * object payload and schema it should be validated against
     * @param {object} payload
     * @param {object} schema
     * @return {Object}
     */
    static validate(payload, schema) {
        try {
            return Joi.attempt(payload, schema, {
                abortEarly: false,
                convert: true,
                stripUnknown: true,
            });
        } catch (errors) {
            return Promise.reject(this.modifyErrors(errors));
        }
    }

    /**
     * reducer callback function to turn joi error message into a simple object
     * it takes the label or key property and makes it a key
     * while the value of the key would be the error message
     * @param {Object} accumulatedErrorObject
     * @param {Object} currentError
     * @return {Object}
     */
    static errorReducer(accumulatedErrorObject, currentError) {
        return Object.assign(accumulatedErrorObject, {
            // eslint-disable-next-line max-len
            [currentError.context.label || currentError.context.key]: currentError.message.replace(new RegExp('"', 'ig'), ''),
        });
    }

    /**
     * modifies error message to simple readable format
     * @param {object} errors
     * @return {object}
     */
    static modifyErrors(errors) {
        return !errors.details ?
            errors.message :
            errors.details.reduce(this.errorReducer, {});
    }
};