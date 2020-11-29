const Note = require('../models/note');
const fs = require('fs');

exports.createNote = (req, res, next) => {
  const noteObject = JSON.parse(req.body.note);
  delete noteObject._id;
  const note = new Note({
    ...noteObject,
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


exports.getNotesByBiere = (req, res, next) => {
  Note.find({
    biere_id: req.params.id
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