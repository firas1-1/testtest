const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT)
  .then(() => console.log('connected to db'))
  .catch((err) => console.error('connection error:', err));

module.exports = mongoose;
