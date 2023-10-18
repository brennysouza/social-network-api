const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});
