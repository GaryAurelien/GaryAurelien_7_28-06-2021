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
        else res.status(201).json({
          userId: data.id,
          userName: data.name,
          userFirstname: data.firstname,
          position: data.position,
          token: jwt.sign(
            { userId: data.id },
            process.env.DB_TOK,
            { expiresIn: '24h' }
          )
        });
      })
    })
    .catch(error => res.status(500).json({ error }));
};

/************************************************************/

exports.login = (req, res, next) => {
  User.findOne(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Le user avec l'email ${req.body.email} n'a pas été trouvé.`
        });
      } else {
        res.status(500).send({
          message: "Erreur de récupération du user avec l'email " + req.body.email
        });
      }
    } else {
      bcrypt.compare(req.body.password, data.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }else{
          res.status(200).json({
            userId: data.id,
            userName: data.name,
            userFirstname: data.firstname,
            position: data.position,
            token: jwt.sign(
              { userId: data.id, admin: data.admin },
              process.env.DB_TOK,
              { expiresIn: '24h' }
            )
          });
        }
        }).catch(error => res.status(500).json({ error }))
    }
  });
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
          message: `Pas d'utilisateur trouvé avec l'identifiant ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération l'utilisateur avec l'identifiant " + req.params.userId
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
          err.message || "Une erreur s'est produite lors de la récupération de l'utilisateur."
      });
    else res.send(data);
  });
};

/*************************supprimer tout les users***************************/

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la suppression de tous les Users."
        });
      else res.send({ message: `Les Users ont été supprimés !` });
    });
};