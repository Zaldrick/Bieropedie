const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          name: req.body.name,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Buveur créé !' }))
          .catch(error => {
            console.log(error);
            res.status(400).json({ error });
            });
      })
      .catch(error => {
        console.log(error);
        res.status(400).json({ error });
    });
};

exports.login = (req, res, next) => {
User.findOne({ name: req.body.name })
    .then(user => {
    if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
        .then(valid => {
        if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
            userId: user._id,
            userName:user.name,
            token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '48h' }
            )
        });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
/*
exports.getName = (req, res, next) => {
  User.findOne({ _id: req.body.id })
      .then(user => {
      if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      res.status(200).json(user.name);
      }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
    };

exports.getAllUsersNames = (req, res, next) => {
  User.find().then(
    (users) => {
      var userMap = {};
      users.forEach(function(user) {
        userMap[user._id] = user.name;
      });
      res.status(200).json(userMap);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
*/