const sql = require("./db.js");

const User = function(client) {
    this.email = client.email;
    this.password = client.password;
    this.name = client.name;
    this.firstname = client.firstname;
    this.position = client.position;
    this.admin = client.admin;
};

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


module.exports = User;