/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');*/

const sql = require("../models/db.js");
const Post = require('../models/Post.models.js');
/* require('dotenv').config(); */


/**************Create and Save a new post************/

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Le contenu ne peut pas être vide !"
      });
    }
  
    // Create a Post
    const post = new Post({
      name: req.body.name,
      content: req.body.content
    });
  
    // Save Post in the database
    Post.create(post, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || " Une erreur s'est produite lors de la création du Post."
        });
      else res.send(data);
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

  Post.updateById(
    req.params.postId,
    new Post(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Post introuvable avec  id ${req.params.postId}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour du post avec id " + req.params.postId
          });
        }
      } else res.send(data);
    }
  );
};

/*************************Delete***************************/


exports.delete = (req, res) => {
  Post.remove(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Post non trouvé avec id ${req.params.postId}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer le post avec id " + req.params.postId
        });
      }
    } else res.send({ message: `Le post a été supprimé avec succès !` });
  });
};
