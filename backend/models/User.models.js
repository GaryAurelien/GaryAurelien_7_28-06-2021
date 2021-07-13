const sql = require("./db.js");

const User = function(client) {
    this.email = client.email;
    this.password = client.password;
    this.name = client.name;
    this.firstname = client.firstname;
    this.position = client.position;
    this.admin = client.admin;
};

/*************************************************************/

User.create = (newUtilisateur, result) => {
    sql.query("INSERT INTO users SET ?", newUtilisateur, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUtilisateur });
      result(null, { id: res.insertId, ...newUtilisateur });
    });
  };

/*************************************************************/

  User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
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
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };



module.exports = User;