// model/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique:true
  },
  email: {
    type: String,
    
    unique: true
  },
  password: {
    type: String,
    required:false
  },
  
  Role: {
    type: String,
    minlength: 1
  },
  department: {
    type: String,
    minlength: 1
  },
  Tel:{
    type: Number,
  },
  Gender:{
    type: Number,
  },
 

});

const User = mongoose.model('User', userSchema);

module.exports = User;

console.log('User model has been loaded.');
