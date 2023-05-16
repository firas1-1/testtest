const mongoose = require('mongoose');
const { string } = require('yup');

const responseCommandSchema = new mongoose.Schema({
  command_id: {
    type: String,
    
  },
  Respons: {
    type: String,
    required: true,
  },
  name:{ type:String,
    required:true,
  },
  Status:{
    type:String,
    default: 'In process'
    
  },
  date: {
    type: Date
  }
}, { timestamps: true });


const ResponseCommand = mongoose.model('ResponseCommand', responseCommandSchema);

module.exports = ResponseCommand;
