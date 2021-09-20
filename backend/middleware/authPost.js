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
    
    sql.query(`SELECT * FROM posts WHERE id = ${req.params.postId}`, (err, data) => {
        if (isAdmin === 1 || (data[0].user_id === userId) ) {
            console.log("action autorisé dans AuPost");
            next();
        } else {
            res.status(403).json({ message: "Action non autorisé dans AuPost" });

            console.log(`Action non autorisé dans AuPost`);
        }
    });
    }
    catch{
        res.status(401).json({error: error | 'Requête non authentifiée dans AuPost!'});
    }

};