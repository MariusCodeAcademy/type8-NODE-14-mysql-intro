const express = require('express');
const controller = require('../controller/catController');

const catRoutes = express.Router();

// routes
catRoutes.post('/categories/create', controller.createTable);

module.exports = catRoutes;
