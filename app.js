const express = require('express');
const app = express();

const mountApp = require('./helpers/mount-app');

mountApp(app);

module.exports = app;