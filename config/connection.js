const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONOGDB_URI || 'mongodb://localhost:27017/social-network-api',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.error('Error connecting to MongoDB!');
    else console.log('Connected to MongoDB!');
  }
);

module.exports = mongoose.connection;
