const container = require('../ioc-container');
const { loadIndexRoutes } = require('./routes/index.route');

module.exports.indexRoutes = loadIndexRoutes(container);