const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config');

const app = express();

// Middle ware
app.use(morgan('dev'));

console.log('yes');

app.listen(PORT, () => console.log('server is running on port', PORT));
