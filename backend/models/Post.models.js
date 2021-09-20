const sql = require("./db.js");


// constructeur

const Post = function(post) {
    this.titre = post.titre;
    this.imageUrl = post.imageUrl;
    this.content = post.content;
    this.user_id = post.user_id;
};

/**************************create***************************/

Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("post créé : ", { id: res.insertId, ...newPost });
      result(null, { id: res.insertId, ...newPost });
    });
  };

/*************************************************************/

  Post.findById = (postId, result) => {
    sql.query("SELECT posts.id, content, imageUrl, titre, user_id, date_création, admin, name, firstname, profilPic FROM posts INNER JOIN users ON users.id = posts.user_id  WHERE posts.id = ?", [postId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("post trouvé: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found post with the id
      result({ kind: "not_found" }, null);
    });
  };


/*************************update****************************/


Post.updateById = (id, post, result) => {
  sql.query(
    "UPDATE posts SET titre = ?, content = ? WHERE id = ?",
    [post.titre, post.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found post with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("post update: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};


/**************************Delete*****************************/

Post.remove = (id, result) => {
  sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found post with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("post suprimer avec id: ", id);
    result(null, res);
  });
};

/**************************Tout les posts*****************************/

Post.getAll = result => {
  sql.query('SELECT posts.id, content, imageUrl, titre, user_id, date_création, admin, name, firstname, profilPic FROM posts INNER JOIN users ON users.id = posts.user_id ORDER BY date_création DESC', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("posts: ", res);
    result(null, res);
  });
};

/************************** recupere tout les posts de cette user *****************************/
//on recupere tout ce quil y a dans post et user qui corespon au userid de la requete
Post.findByUserId = (userId, result) => { 
  sql.query(`SELECT posts.id, content,  imageUrl, titre, user_id, date_création, admin, name, firstname, profilPic FROM posts INNER JOIN users ON users.id = posts.user_id WHERE posts.user_id = ?`, [userId], (err, res)  => { 
    //si il y a une erreur dans la req
    if (err) { 
       console.log("error: ", err);
       result(err, null);
       return;
     }
     //si il trouve un ou des post il les retourne
     if (res.length) {
       console.log("found post: ", res);
       result(null, res);
       return res;
     }

     //si il ne trouve pas de post avec le userid
     result({ kind: "not_found" }, null);
   });
 };



module.exports = Post;