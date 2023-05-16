const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: String ,
    Date: { type: Date, default: Date.now }

});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
