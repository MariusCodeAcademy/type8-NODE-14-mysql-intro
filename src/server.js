const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { PORT, dbConfig } = require('./config');
const postRoutes = require('./routes/postsRoutes');

const app = express();

// Middle ware
app.use(morgan('dev'));
app.use(cors());
// kad express galetu gauti json siustus duomenis
app.use(express.json());

app.use('/api/', postRoutes);

app.listen(PORT, () => console.log('server is running on port', PORT));
