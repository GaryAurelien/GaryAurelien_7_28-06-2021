const jwt = require('jsonwebtoken');
const sql = require("../models/db.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
    try{
        console.log("Coucou on est dans authComment");
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const userId = decodedToken.userId;
    console.log("userToken",userId);
    const isAdmin = decodedToken.admin;
    console.log("Admin",isAdmin);
    console.log("idComment de req.params", req.params.commentaireId);
    
    sql.query(`SELECT * FROM commentaires WHERE id = ${req.params.commentaireId}`, (err, data) => {
        console.log(data);
        if (isAdmin === 1 || (data[0].user_id === userId)){
            console.log("action autorisé");
            next();
        } else {
            res.status(403).json({ message: "Action non autorisé" });

            console.log(`Hey ! Tu arrêtes ça, tu n'as pas le droit ! Vilain !`);
        }
    });
    }
    catch{
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }

};