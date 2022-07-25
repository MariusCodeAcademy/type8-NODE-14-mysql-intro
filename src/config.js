require('dotenv').config();

const PORT = process.env.PORT || 5000;

// db config
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'type8_first_db',
};

module.exports = {
  PORT,
  dbConfig,
};
