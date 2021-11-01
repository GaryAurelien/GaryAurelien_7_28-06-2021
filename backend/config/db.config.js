require('dotenv').config()

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB_DB
  }; 


// fichier configuration a la base de donnée MySQL