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
postRoutes.get('/posts-by-rating/', async (req, res) => {
  let conn;
  try {
    // query param
    const { order } = req.query;

    // SELECT * FROM posts ORDER BY rating DESC
    // Vietoj DESC gali buti tik 2 reiksmes ASC | DESC

    conn = await mysql.createConnection(dbConfig);
    const safeOrder = mysql.escape(order);
    console.log('order ===', order);
    console.log('safeOrder ===', safeOrder);
    // salyga ? true :  false
    const ascOrDesc = order === 'ASC' ? 'ASC' : 'DESC';
    const sql = `SELECT * FROM posts ORDER BY rating ${ascOrDesc}`;
    console.log('sql ===', sql);
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error posts-by-rating', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

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
postRoutes.post('/posts', async (req, res) => {
  let conn;
  try {
    const newPostObj = req.body;
    console.log('newPostObj ===', newPostObj);
    // const title = newPostObj.title;
    // const author = newPostObj.author;
    // const body = newPostObj.body;
    // const rating = newPostObj.rating;
    // ===

    // eslint-disable-next-line object-curly-newline
    const { title, author, body, rating } = newPostObj;

    conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO posts (title, author, body, rating)
    VALUES (?, ?, ?, ?)
    `;
    const [insertResultObj] = await conn.execute(sql, [title, author, body, rating]);
    if (insertResultObj.affectedRows === 1) {
      res.status(201).json(insertResultObj);
      return;
    }
    throw new Error('affected row not 1');
  } catch (error) {
    console.log('error creating post', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

// DELETE /api/posts/:postId - istrina posta kurio id === postId
postRoutes.delete('/posts/:postId', async (req, res) => {
  // res.json(req.params.postId);
  let conn;
  try {
    const { postId } = req.params;
    conn = await mysql.createConnection(dbConfig);
    const sql = 'DELETE FROM posts WHERE id = ?';
    const [deleteRezult] = await conn.execute(sql, [postId]);
    if (deleteRezult.affectedRows !== 1) {
      res
        .status(400)
        .json({ success: false, error: `user with id ${postId}, was not found` });
      return;
    }
    if (deleteRezult.affectedRows === 1) {
      res.json('delete ok');
      return;
    }
    throw new Error('sometnig wrong in deleteRezult.affectedRows');
  } catch (error) {
    console.log('error DELETE posts', error);
    res.sendStatus(500);
  } finally {
    await conn?.end();
  }
});

module.exports = postRoutes;
