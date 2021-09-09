const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const sql = require("../models/db.js");
const User = require('../models/User.models.js');
const Post = require('../models/Post.models.js');
require('dotenv').config();


/**************Create and Save a new user************/

exports.signup = (req, res, next) => {
  console.log("signup1");
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      console.log("signup2");
      const utilisateur = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        firstname: req.body.firstname,
        position: req.body.position,
        admin: 0,
        profilPic: `${req.protocol}://${req.get('host')}/profilPic/${req.file.filename}`
      });

      User.create(utilisateur, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Une erreur est servenue lors de la création du User."
          });
        else res.status(201).json({

          token: jwt.sign(
              { userId: data.id, 
                userName: data.name,
                userFirstname: data.firstname,
                position: data.position,
                email: data.email,
                admin: data.admin,
                profilPic: data.profilPic
              },
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
        res.status(404).json({
          message: `Le user avec l'email ${req.body.email} n'a pas été trouvé.`,
          error: err
        });
      } else {
        res.status(500).json({
          message: "Erreur de récupération du user avec l'email " + req.body.email ,
          error: err
        });
      }
    } else {
      bcrypt.compare(req.body.password, data.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !', message: "Mot de passe incorrect !" });
            
          }else{
          res.status(200).json({
            
            token: jwt.sign(
              { userId: data.id, 
                userName: data.name,
                userFirstname: data.firstname,
                position: data.position,
                email: data.email,
                admin: data.admin,
                profilPic: data.profilPic
              },
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
  console.log("on est dans le update");
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
  }
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const utilisateur = new User({
          email: req.body.email,
          password: hash,
          name: req.body.name,
          firstname: req.body.firstname,
          position: req.body.position,
          admin: req.body.admin,
          profilPic: `${req.protocol}://${req.get('host')}/profilPic/${req.file.filename}`
        });
        console.log('uptade4');
        console.log(utilisateur);

        User.findById(req.params.userId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Le User Id ${req.params.userId} n'a pas été trouvé.`
              });
            } else {
              res.status(500).send({
                message: "Erreur de recuperation du User Id" + req.params.userId
              });
            }
          } else {

            const filename = data.profilPic.split('/profilPic/')[1];
            fs.unlink(`profilPic/${filename}`, () => {
              User.updateById(req.params.userId, utilisateur, (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Le User Id ${req.params.userId} n'a pas été trouvé.`
                  });
                } else {
                  res.status(500).send({
                    message: "Erreur MAJ User Id " + req.params.userId
                  });
                }
              } else res.send(data);
              })
            })
          }}
          )}
        )
      .catch(error => res.status(500).json({ error }));
};



/*************************Delete***************************/


exports.delete = (req, res) => {


  User.findById(req.params.userId, (err, dota) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
        });
      } else {
        res.status(500).send({
          message: "Erreur de récupération du User avec l'id " + req.params.userId
        });
      }
    } else {

          Post.findByUserId(dota.id, (err, donnee) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `L'article avec le user_id ${donnee.id} n'a pas été trouvé.`
                });
              } else {
                res.status(500).send({
                  message: "Erreur de récupération de l'article avec le user_id " + donnee.id
                });
              }
            } else {

              for (const element of donnee) {

                if(!element.imageUrl){
                console.log("Oh il n'y a pas d'image !");

                }else{
                  const filename = element.imageUrl.split('/images/')[1];
                          fs.unlink(`images/${filename}`, () => {

                            console.log("image supprimée"); 
                        })
                        };
                    }

                        const filename = dota.profilPic.split('/profilPic/')[1];
                                fs.unlink(`profilPic/${filename}`, () => {
                                User.remove(req.params.userId, (err, data) => {
                                  if (err) {
                                    if (err.kind === "not_found") {
                                      res.status(404).send({
                                        message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
                                      });
                                    } else {
                                      res.status(500).send({
                                        message: "Erreur de suppression du User avec l'id " + req.params.userId
                                      });
                                    }
                                  } else res.send({ message: `Le User a été supprimé !`});
                          });
                        })
                        };
                })}
                })}


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