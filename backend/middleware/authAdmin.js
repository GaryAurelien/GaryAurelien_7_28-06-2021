const jwt = require('jsonwebtoken');
const sql = require("../models/db.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const isAdmin = decodedToken.admin;
        if (isAdmin === 1 ) {
            console.log("action autorisé");
            next();
        } else {
            res.status(403).json({ message: "Action non autorisé" });
            console.log(`Action non autorisé`);
        }
    }
    catch{
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }

};