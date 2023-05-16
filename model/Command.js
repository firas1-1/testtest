const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true
  },
  justification: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  MR: {
    type: Number,
    required: true
  },
  

});

module.exports = mongoose.model('Command', commandSchema);
