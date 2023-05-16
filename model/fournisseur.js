const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true
  },
  Prenom: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Telephone: {
    type: String,
    required: true
  },
  Adresse_1: {
    type: String,
    required: true
  },
  Adresse_2: {
    type: String,
    required: true
  },
  Ville: {
    type: String,
    required: true
  },
  Code_Postal: {
    type: String,
    required: true
  },


});

module.exports = mongoose.model('fournisseur', fournisseurSchema);
