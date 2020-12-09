const mongoose = require('mongoose');


const noteSchema = mongoose.Schema({
  biereId: {type: String, required: true },
  userId: {type: String, required: true },
  
  notePackaging: { type: Number, required: true },
  remarquePackaging: { type: String },

  noteOdeur: { type: Number, required: true },
  remarqueOdeur: { type: String },
  
  noteMiseEnBouche: { type: Number, required: true },
  remarqueMiseEnBouche: { type: String },
  
  noteRetour: { type: Number, required: true },
  remarqueRetour: { type: String },
  
  noteEndurance: { type: Number, required: true },
  remarqueEndurance: { type: String },
});

module.exports = mongoose.model('Note', noteSchema);