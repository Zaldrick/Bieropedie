const Biere = require('../models/biere');
const fs = require('fs');

exports.createBiere = (req, res, next) => {
  const biereObject = JSON.parse(req.body.biere);
  delete biereObject._id;
  const biere = new Biere({
    ...biereObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  biere.save()
    .then(() => res.status(201).json({ message: 'Bière ajouté !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneBiere = (req, res, next) => {
  Biere.findOne({
    _id: req.params.id
  }).then(
    (biere) => {
      res.status(200).json(biere);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyBiere = (req, res, next) => {
  const biereObject = req.file ?
    {
      ...JSON.parse(req.body.biere),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Biere.updateOne({ _id: req.params.id }, { ...biereObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteBiere = (req, res, next) => {
  Biere.findOne({ _id: req.params.id })
    .then(biere => {
      const filename = biere.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Biere.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  Biere.find().then(
    (bieres) => {
      res.status(200).json(bieres);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};