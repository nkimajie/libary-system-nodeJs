const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const customResponse = require('./express-response');
const AppError = require('./error');
const container = require('../ioc-container');
const prefix = "/api/v1";
const { indexRoutes } = require('../src/index');
const winston = require('winston');


/**
 * @type {winston.Logger}
 */
const logger = container.resolve('logger');

/**
 * Load app and mount endpoints
 * @param {express.Express} app
 */
module.exports = function mountApp(app) {
    app.response = Object.create(customResponse);

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.on('error', (err) => {
        console.log(err);
    });

    app.use((req, _res, next) => {
        if (req.query.limit || req.query.offset) {
            req.query.limit = +req.query.limit || 20;
            req.query.offset = +req.query.offset || 0;
        }
        next();
    });

    app.use(morgan('combined', { stream: logger.stream }));


    app.get(`${prefix}`, (_req, res) =>
        res.json({
            status: true,
            message: `***APIs RUNNING***`,
        }),
    );


    app.use(
        `${prefix}/app`,
        indexRoutes,
    );

    app.use((err, _req, res, _next) => {
        if (err.type && err.type === 'entity.parse.failed') {
            res.status(400).errorMessage('Invalid JSON payload passed.');
        } else {
            if (err instanceof AppError) {
                res.status(err.statusCode || 400).error(err.message);
            } else {
                logger.error('Error middleware - Error -', err);
                res.status(500).error('Oops! something went wrong!');
            }
        }
    });
};