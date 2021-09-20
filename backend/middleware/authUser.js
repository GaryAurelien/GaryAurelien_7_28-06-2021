const jwt = require('jsonwebtoken');
const sql = require("../models/db.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.admin;
    
    sql.query(`SELECT * FROM users WHERE id = ${req.params.userId}`, (err, data) => {
        if (isAdmin === 1 || (data[0].id === userId) ) {
            console.log("action autorisé dans AuUser");
            next();
        } else {
            res.status(403).json({ message: "Action non autorisé dans AuUser" });

            console.log(`Action non autorisé dans AuUser`);
        }
    });
    }
    catch{
        res.status(401).json('Requête non authentifiée dans AuUser !');
    }

};