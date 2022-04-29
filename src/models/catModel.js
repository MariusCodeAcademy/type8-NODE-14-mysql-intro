const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// model fn
async function createTableDB() {
  console.log('createTableDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts';
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

module.exports = {
  createTableDB,
};
