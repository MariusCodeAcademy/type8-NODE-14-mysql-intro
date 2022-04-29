const express = require('express');
const controller = require('../controller/catController');

const catRoutes = express.Router();

// routes
catRoutes.post('/categories/create', controller.createTable);

// POST /api/categories/ - atsiusti title ir sukuri nauja kategorija
catRoutes.post('/categories/', controller.createCategory);

module.exports = catRoutes;
