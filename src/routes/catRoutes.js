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
    const sql = 'SELECT nera FROM posts';
    console.log('pries uzklausa');
    const [result] = await conn.query(sql);
    console.log('po uzklausos');
    return result;
  } catch (error) {
    console.log('error createTableDB');
    // return false;
    // throw new Error('error createTableDB');
    throw error;
  } finally {
    conn?.end();
  }
}

async function createTable(req, res) {
  console.log('createTable controller ran');
  try {
    const createResult = await createTableDB();
    res.json(createResult);
  } catch (error) {
    // console.log('error createTable ===', error);
    console.log('error createTable ===', error.sqlMessage);
    res.sendStatus(500);
  }
}

// routes
catRoutes.post('/categories/create', createTable);

module.exports = catRoutes;
