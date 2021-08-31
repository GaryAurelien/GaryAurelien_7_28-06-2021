const sql = require("./db.js");

const Post = function(post) {
    this.titre = post.titre;
    this.file = post.file;
    this.content = post.content;
    this.user_name = post.user_name;
    this.user_firstname = post.user_firstname;
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
    sql.query(`SELECT * FROM posts WHERE id = ${postId}`, (err, res) => {
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
  sql.query("SELECT * FROM posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("posts: ", res);
    result(null, res);
  });
};




module.exports = Post;