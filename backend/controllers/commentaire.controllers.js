const sql = require("../models/db.js");
const Commentaire = require('../models/Commentaire.models.js');


/**************Create and Save a new Commentaire************/

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide !"
        });
    }

    // Create a Commentaire
    const commentaire = new Commentaire({
        content: req.body.content,
        post_id: req.body.post_id,
        name: req.body.name,
        firstname: req.body.firstname,
        user_id: req.body.user_id,
    
    });

    // Save Commentaire in the database
    Commentaire.create(commentaire, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || " Une erreur s'est produite lors de la création du Commentaire."
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

    Commentaire.updateById(
        req.params.commentaireId,
        new Commentaire(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Commentaire introuvable avec  id ${req.params.commentaireId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Erreur lors de la mise à jour du commentaire avec id " + req.params.commentaireId
                    });
                }
            } else res.send(data);
        }
    );
};

/*************************Delete***************************/


exports.delete = (req, res) => {
    Commentaire.remove(req.params.commentaireId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Commentaire non trouvé avec id ${req.params.commentaireId}.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer le Commentaire avec id " + req.params.commentaireId
                });
            }
        } else res.send({ message: `Le commentaire a été supprimé avec succès !` });
    });
};

/*************************recuperer un Commentaire***************************/


exports.findOne = (req, res) => {
    Commentaire.findById(req.params.commentaireId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pas de commentaire trouvé avec l'identifiant ${req.params.commentaireId}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la récupération du commentaire avec l'identifiant " + req.params.commentaireId
                });
            }
        } else res.send(data);
    });
};

/*************************recuperer tout les Commentaires***************************/

exports.findAll = (req, res) => {
    Commentaire.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération du commentaire."
            });
        else res.send(data);
    });
};




exports.findComWithPostId  = (req, res) => {
    Commentaire.findByPostId(req.params.postId, (err, data) => {
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
