const jwt = require('jsonwebtoken');
require('dotenv').config();

 module.exports = (req, res, next) =>  { 
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
      return res.status(403).send({
        message: "Aucun token fourni !"
      });
    }
    jwt.verify(token, process.env.DB_TOK, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Non autorisé !"
        });
      }
    next();
});
}; 