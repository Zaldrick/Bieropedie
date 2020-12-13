const Note = require('../models/note');
const fs = require('fs');

exports.createNote = (req, res, next) => {
 //const noteObject = JSON.parse(req.body);
  //delete noteObject._id;
  const note = new Note({
  biereId:  req.body.biereId,
  userName: req.body.userName,
  notePackaging: req.body.notePackaging,
  remarquePackaging: req.body.remarquePackaging,

  noteOdeur:req.body.noteOdeur,
  remarqueOdeur:req.body.remarqueOdeur,
  
  noteMiseEnBouche:req.body.noteMiseEnBouche,
  remarqueMiseEnBouche: req.body.remarqueMiseEnBouche,
  
  noteRetour:req.body.noteRetour,
  remarqueRetour: req.body.remarqueRetour,
  
  noteEndurance:req.body.noteEndurance,
  remarqueEndurance:req.body.remarqueEndurance,
  remarqueApparence:req.body.remarqueApparence
  });
  note.save()
    .then(() => res.status(201).json({ message: 'Note ajouté !'}))
    .catch(error => res.status(400).json({ error }));
};
 
exports.getOneNote = (req, res, next) => {
  Note.findOne({
    _id: req.params.id
  }).then(
    (note) => {
      res.status(200).json(note);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
exports.getAllNotes = (req, res, next) => {
  Note.find().then(
    (notes) => {
      res.status(200).json(notes);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};



exports.getAllNotesByBiere = (req, res, next) => {
  Note.find({
    biereId: req.params.id
  }).then(
    (note) => {
      res.status(200).json(note);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
/*
exports.modifyNote = (req, res, next) => {
  const noteObject = req.file ?
    {
      ...JSON.parse(req.body.note)
    } : { ...req.body };
  Note.updateOne({ _id: req.params.id }, { ...noteObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Note modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteNote = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then(note => {
      const filename = note.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Note.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Note supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
*/