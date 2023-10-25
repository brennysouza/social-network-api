const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use('/', routes);


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});


