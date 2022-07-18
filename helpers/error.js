module.exports = class AppError extends Error {
    /**
     * define the app error
     * @param {string} name
     * @param {integer} statusCode
     * @param {string} message
     */
    constructor({
        name = 'InternalServerError',
        statusCode = 500,
        message = 'Oops! something has gone wrong',
    }) {
        super(message);

        if (name) {
            this.name = name;
        }
        if (statusCode) {
            this.statusCode = statusCode;
        }

        Error.captureStackTrace(this, this.constructor);
    }
};