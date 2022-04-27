const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// sukurti routeri
const postRoutes = express.Router();
// routeri importuoti i server js
// sukurti tuscia route ir isitikinti kad veikia
// GET /api/first-posts - parsiusti pirmus 2 posts (LIMIT)
postRoutes.get('/posts', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error getting all posts', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});
postRoutes.get('/first-posts', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts LIMIT 2';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error getting first posts', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

// GET /api/posts-by-rating/  - parsiusti visus posts isrikiuotuos nuo diziausio rating vertinimo.

// perkelti /api/posts routa is server.js i postRoute.js

// sukurti 404 endpointa kuris grazintu atsakyma json formatu

// GET /api/posts/name/:name - parisiusti postus kuriuos parase :name
postRoutes.get('/posts/name/:name', async (req, res) => {
  let conn;
  try {
    const { name } = req.params;
    console.log('name ===', name);
    conn = await mysql.createConnection(dbConfig);
    // esam neapsaugoti nuo sql injection
    // const sql = `SELECT * FROM posts WHERE author = '${name}'`;
    // const [rows] = await conn.query(sql);

    // reikia neautralizuoti vartotojo ivesties duomenis
    const sql = 'SELECT * FROM posts WHERE author = ?';
    const [rows] = await conn.execute(sql, [name]);
    res.json(rows);
  } catch (error) {
    console.log('error getting all posts', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

// POST /api/posts - sukurti nauja posta su duomenimis kuriuos gavo is post route

module.exports = postRoutes;
