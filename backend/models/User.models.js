const sql = require("./db.js");

const User = function (client) {
  this.email = client.email;
  this.password = client.password;
  this.name = client.name;
  this.firstname = client.firstname;
  this.position = client.position;
  this.admin = client.admin;
  this.profilPic= client.profilPic;
};

/**************************create***************************/

User.create = (newUtilisateur, result) => {
  sql.query("INSERT INTO users SET ?", newUtilisateur, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("user crée: ", { id: res.insertId, ...newUtilisateur });
    result(null, { id: res.insertId, ...newUtilisateur });
  });
};

/*************************************************************/


User.findOne = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = ?`, [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

/*************************************************************/

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ?`, [userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("user trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


/*************************update****************************/


User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET email = ?, password = ?, name = ?, firstname = ?, position = ?, profilPic= ? WHERE id = ?",
    [user.email, user.password, user.name, user.firstname, user.position, user.profilPic, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("user update: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};


/**************************Delete*****************************/

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("user supprimé avec id: ", id);
    result(null, res);
  });
};

/************************** Remove tout les users*****************************/

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user`);
    result(null, res);
  });
};


/**************************Tout les users*****************************/

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};



module.exports = User;