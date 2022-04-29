const express = require('express');

const catRoutes = express.Router();

// routes
catRoutes.post('/categories/create', async (req, res) => {
  res.json('create category');
});

module.exports = catRoutes;
