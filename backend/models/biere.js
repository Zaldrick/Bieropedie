const mongoose = require('mongoose');

const biereSchema = mongoose.Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true },
  pays: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Biere', biereSchema);