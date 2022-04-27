const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql2/promise');
const { PORT } = require('./config');

const app = express();

// db config
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'type8_first_db',
};

// Middle ware
app.use(morgan('dev'));

// home route
app.get('/', async (req, res) => {
  let connection;
  try {
    // 1 prisijungti
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    // 2 atlikti veiksma
    res.json('connected');
  } catch (error) {
    // err gaudom klaidas
    console.log('home route error ===', error);
    res.status(500).json('something went wrong');
  } finally {
    // 3 atsijungti
    if (connection) connection.close();
    // connection?.close();
  }
});

app.listen(PORT, () => console.log('server is running on port', PORT));
