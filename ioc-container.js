/* eslint-disable max-len */
const awilix = require('awilix');
const logger = require('./helpers/logger');
const IndexController = require('./src/controllers/index.controller');
const IndexService = require('./src/services/index.service');
const CouponRepository = require('./src/repositories/coupon.repository');
const CartRepository = require('./src/repositories/cart.repository');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    logger: awilix.asValue(logger),
});

container.register({
    indexController: awilix.asClass(IndexController),
    indexService: awilix.asClass(IndexService),
    couponRepository: awilix.asValue(CouponRepository),
    cartRepository: awilix.asValue(CartRepository),
});


module.exports = container;