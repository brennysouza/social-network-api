require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('MongoDB connection successful.');
});

module.exports = mongoose.connection;



// 127.0.0.1
