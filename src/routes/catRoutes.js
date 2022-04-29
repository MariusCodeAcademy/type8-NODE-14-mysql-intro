const express = require('express');

const catRoutes = express.Router();

async function createTableDB() {}

async function createTable(req, res) {
  const success = createTableDB();
  if (success) res.json('table created');
}

// routes
catRoutes.post('/categories/create', createTable);

module.exports = catRoutes;
