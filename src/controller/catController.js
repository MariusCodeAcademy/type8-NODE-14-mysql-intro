const { createTableDB } = require('../models/catModel');

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

module.exports = {
  createTable,
};
