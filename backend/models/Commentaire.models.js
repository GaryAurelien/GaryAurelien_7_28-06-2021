const sql = require("./db.js");

const Commentaire = function(client) {
    this.content = client.content,
    this.post_id = client.post_id;
};

/**************************create***************************/

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

/*************************************************************/

Commentaire.findById = (commentaireId, result) => {
    sql.query(`SELECT * FROM commentaires WHERE id = ${commentaireId}`, (err, res) => {
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
  
      // not found Commentaire with the id
      result({ kind: "not_found" }, null);
    });
  };

/*****************************************************/


  Commentaire.findByPostId = (postId, result) => {
    sql.query(`SELECT * FROM commentaires WHERE post_id = ${postId}`, (err, res) => {
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
  
      // not found Commentaire with the id
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
        // not found Commentaire with the id
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
      // not found Commentaire with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("commentaire supprimé avec id: ", id);
    result(null, res);
  });
};

/**************************Tout les Commentaires*****************************/

Commentaire.getAll = result => {
  sql.query("SELECT * FROM commentaires", (err, res) => {
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