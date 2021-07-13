const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

/****************Connexion à la base de données****************/


// Créer une connexion à la base de données
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });
  
  // ouvrir la connexion MySQL
  connection.connect(error => {
    if (error) throw error;
    console.log("Connecté à la base de données !");
  });
  
  /**************************************************************/

module.exports = connection;