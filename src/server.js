const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const postRoutes = require('./routes/postsRoutes');
const catRoutes = require('./routes/catRoutes');

const app = express();

// Middle ware
app.use(morgan('dev'));
app.use(cors());
// kad express galetu gauti json siustus duomenis
app.use(express.json());

// ROUTES
app.use('/api/', postRoutes);
app.use('/api/', catRoutes);

// 404
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('server is running on port', PORT));

// POST /api/categories/create - sukuria nauja lentele categories
// categories lentele turi id ir title
