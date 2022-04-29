const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const catRoutes = express.Router();

// model fn
async function createTableDB() {
  console.log('createTableDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts';
    const [result] = await conn.query(sql);
    return result;
  } catch (error) {
    console.log('error createTableDB', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function createTable(req, res) {
  console.log('createTable controller ran');
  const createResult = await createTableDB();

  if (createResult === false) {
    res.sendStatus(500);
    return;
  }
  res.json(createResult);
}

// routes
catRoutes.post('/categories/create', createTable);

module.exports = catRoutes;
