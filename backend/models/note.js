const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  //biereId: {type: Schema.Types.ObjectId, ref: 'biere'},
  //userId: {type: Schema.Types.ObjectId, ref: 'user'},
  
  notePackaging: { type: Number, required: true },
  remarquePackaging: { type: String },

  noteOdeur: { type: Number, required: true },
  remarqueOdeur: { type: String },
  
  noteMiseEnBouche: { type: Number, required: true },
  remarqueMiseEnBouche: { type: String },
  
  noteRetour: { type: Number, required: true },
  remarqueMiseEnBouche: { type: String },
  
  noteEcoeurement: { type: Number, required: true },
  remarqueEcoeurement: { type: String },
  
  remarqueGeneral: { type: String, required: true },
});

module.exports = mongoose.model('Note', noteSchema);