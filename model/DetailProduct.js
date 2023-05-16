const mongoose = require('mongoose');
const { string } = require('yup');
const Schema = mongoose.Schema;

const detailProductSchema = new Schema({
    idProduct: String,
    quantity: Number,
    correction: String,
    recentQuantity: Number,
    minimumStock: Number,
    department: String,
    codeOracle:String,
    Date: { type: Date, default: Date.now }
});

const detailProduct = mongoose.model('detailProduct', detailProductSchema);

module.exports = detailProduct;
