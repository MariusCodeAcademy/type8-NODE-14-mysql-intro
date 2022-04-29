const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// model fn
async function createTableDB() {
  console.log('createTableDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
    CREATE TABLE type8_first_db.categories ( 
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL, 
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
      PRIMARY KEY (id)
      ) ENGINE = InnoDB;
    `;
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
