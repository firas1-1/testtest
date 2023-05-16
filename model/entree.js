const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entreeSchema = new Schema({
    quantiteEntree: String,
    Date:Date.now
});

const Entree = mongoose.model('entree', entreeSchema);

module.exports = Entree;
