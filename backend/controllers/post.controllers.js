const sql = require("../models/db.js");
const Post = require('../models/Post.models.js');
const fs = require('fs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

/**************Create and Save a new post************/

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide !"
        })};

    if (!req.file){
    const post = new Post({
        titre: req.body.titre,
        content: req.body.content,
        user_id: req.body.user_id,
        imageUrl: null,
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
    }else{
            const post = new Post({
                titre: req.body.titre,
                content: req.body.content,
                user_id: req.body.user_id,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
    }
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
    Post.findById(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pas de commentaire trouvé avec l'identifiant ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la récupération du commentaire avec l'identifiant " + req.params.postId
                });
            }
        } else{
            if(!data.imageUrl){
                Post.remove(req.params.postId, (err, data) => {
                  if (err) {
                    if (err.kind === "not_found") {
                      res.status(404).send({
                        message: `L'article avec l'id ${req.params.postId} n'a pas été trouvé.`
                      });
                    } else {
                      res.status(500).send({
                        message: "Erreur de suppression de l'article avec l'id " + req.params.articleId
                      });
                    }
                  } else res.send({ message: `L'article a été supprimé !` });
                });
            } else{
                const filename = data.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                Post.remove(req.params.postId, (err, data) => {
                    if (err) {
                      if (err.kind === "not_found") {
                        res.status(404).send({
                          message: `L'article avec l'id ${req.params.postId} n'a pas été trouvé.`
                        });
                      } else {
                        res.status(500).send({
                          message: "Erreur de suppression de l'article avec l'id " + req.params.postId
                        });
                      }
                    } else res.send({ message: `L'article a été supprimé !` });
                  });
            })}
        }
    });
};

/*************************recuperer un post***************************/


exports.findOne = (req, res) => {
    Post.findById(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pas de commentaire trouvé avec l'identifiant ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la récupération du commentaire avec l'identifiant " + req.params.postId
                });
            }
        } else res.send(data);
    });
};

/*************************recuperer tout les posts***************************/

exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération du commentaire."
            });
        else res.send(data);
    });
};