const { createTableDB, insertCatDB } = require('../models/catModel');

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

async function createCategory(req, res) {
  console.log('createCategory controller ran');
  try {
    const { title } = req.body;
    const createResult = await insertCatDB(title);
    res.json(createResult);
  } catch (error) {
    // console.log('error createTable ===', error);
    console.log('error createCategory ===', error.sqlMessage);
    res.sendStatus(500);
  }
}

module.exports = {
  createTable,
  createCategory,
};
