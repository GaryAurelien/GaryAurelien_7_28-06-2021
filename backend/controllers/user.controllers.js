const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sql = require("../models/db.js");
const User = require('../models/User.models.js');
/* require('dotenv').config(); */


/**************Create and Save a new user************/

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const utilisateur = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        firstname: req.body.firstname,
        position: req.body.position,
        admin: 0
      });

      User.create(utilisateur, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Une erreur est servenue lors de la création du User."
          });
        else res.send(data);
      });
    })
    .catch(error => res.status(500).json({ error }));
};

/************************************************************/

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
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
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

/***************************Update****************************/

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
  }

  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Utilisateur introuvable avec  id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour de l'utilisateur avec id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

/*************************Delete***************************/


exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur non trouvé avec id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer l'utilisateur avec id " + req.params.userId
        });
      }
    } else res.send({ message: `L'utilisateur a été supprimé avec succès !` });
  });
};

/*************************recuperer un user***************************/


exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

/*************************recuperer tout les users***************************/

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else res.send(data);
  });
};