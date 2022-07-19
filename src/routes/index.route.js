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

    router.route('/users/enroll-user').post(
        Validator(indexSchema.enrollUserSchema),
        $((...args) => indexController.enrollUser(...args)),
    );

    router.route('/users/borrow-book-by-id').post(
        Validator(indexSchema.borrowBookSchema),
        $((...args) => indexController.borrowBook(...args)),
    );

    router.route('/users/list-all-books').get(
        $((...args) => indexController.getAllBooks(...args)),
    );
    router.route('/users/get-book-by-id').get(
        $((...args) => indexController.getBookById(...args)),
    );

    router.route('/users/filter-book').get(
        $((...args) => indexController.filterBookBy(...args)),
    );


    router.route('/admin/add-books').post(
        Validator(indexSchema.addBooksSchema),
        $((...args) => indexController.addBooks(...args)),
    );

    router.route('/admin/all-users').get(
        $((...args) => indexController.allUsers(...args)),
    );


    return router;
};