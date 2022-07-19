/* eslint-disable max-len */
const awilix = require('awilix');
const logger = require('./helpers/logger');
const IndexController = require('./src/controllers/index.controller');
const IndexService = require('./src/services/index.service');
const UsersRepository = require('./src/repositories/users.repository');
const BooksRepository = require('./src/repositories/books.repository');
const BorrowedRepository = require('./src/repositories/borrowed.repository');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    logger: awilix.asValue(logger),
});

container.register({
    indexController: awilix.asClass(IndexController),
    indexService: awilix.asClass(IndexService),
    UsersRepository: awilix.asValue(UsersRepository),
    BooksRepository: awilix.asValue(BooksRepository),
    BorrowedRepository: awilix.asValue(BorrowedRepository),
});


module.exports = container;