const sql = require("../models/db.js");
const Post = require('../models/Post.models.js');
const fs = require('fs');

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
        titre: req.body.titre,
        content: req.body.content,
        user_name: req.body.user_name,
        user_firstname: req.body.user_firstname,
        user_id: req.body.user_id
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
                    message: `Le post avec l'id ${req.params.postId} n'a pas été trouvé.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer le post avec id " + req.params.postId
                });
            }
        } else res.send({ message: `Le post a été supprimé avec succès !` });
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