
require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
  console.error('MongoDB connection error:', err);
} else {
  console.log('MongoDB connection successful.');
}
});

module.exports = mongoose.connection;



// 127.0.0.1
