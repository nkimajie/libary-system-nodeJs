const joiValidator = require('./joi-validator');

/**
 * takes in a joi validation schema
 * and returns a middleware to run a preconfigued joi validator
 * @param {object} schema
 * @param {string} document property on request to validate
 * @returns middleware
 */

module.exports =
    (schema, document = 'body') =>
    // eslint-disable-next-line space-before-function-paren
    async(req, res, next) => {
        try {
            // eslint-disable-next-line max-len
            const value = await joiValidator.validate(req[document], schema);
            req[`${document}Old`] = req[document];
            req[document] = value;

            next();
        } catch (error) {
            res.status(400).json({
                status: false,
                statusCode: 0,
                error,
            });
        }
    };