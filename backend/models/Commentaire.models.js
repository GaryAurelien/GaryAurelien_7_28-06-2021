const sql = require("./db.js");

const Commentaire = function(commentaire) {
    this.content = commentaire.content,
    this.user_id = commentaire.user_id,
    this.post_id = commentaire.post_id
};

/**************************create***************************/
// creer un nouveau commentaire en faisant une requet sql a la base de données
Commentaire.create = (newCommentaire, result) => {
    sql.query("INSERT INTO commentaires SET ?", newCommentaire, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("commentaire crée: ", { id: res.insertId, ...newCommentaire });
      result(null, { id: res.insertId, ...newCommentaire });
    });
  };

/*********************trouver un commentaire avec son id *****************************/

Commentaire.findById = (commentaireId, result) => {
    sql.query(`'SELECT commentaires.id, content, user_id, date_création, admin, name, firstname, profilPic FROM commentaires INNER JOIN users ON users.id = commentaires.user_id  WHERE commentaires.id = ? `, [commentaireId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("commentaire trouvé: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

/************************************************************/

  Commentaire.findByPostId = (postId, result) => {
    sql.query(`SELECT commentaires.id, content, user_id, date_création, admin, name, firstname, profilPic FROM commentaires INNER JOIN users ON users.id = commentaires.user_id WHERE post_id = ? ORDER BY date_création ASC`, [postId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("commentaire trouvé: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };




/*************************update****************************/


Commentaire.updateById = (id, commentaire, result) => {
  sql.query(
    "UPDATE commentaires SET name = ?, content = ? WHERE id = ?",
    [commentaire.name, commentaire.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("commentaire update: ", { id: id, ...commentaire });
      result(null, { id: id, ...commentaire });
    }
  );
};


/**************************Delete*****************************/

Commentaire.remove = (id, result) => {
  sql.query("DELETE FROM commentaires WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("commentaire supprimé avec id: ", id);
    result(null, res);
  });
};

/**************************Tout les Commentaires*****************************/

Commentaire.getAll = result => {
  sql.query('SELECT commentaires.id, content, user_id, date_création, admin, name, firstname, profilPic FROM commentaires INNER JOIN users ON users.id = commentaires.user_id ORDER BY date_création ASC', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("commentaires: ", res);
    result(null, res);
  });
};



module.exports = Commentaire;