const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {// on compare le tokens
      throw "echec de l'authentififcation"  
    } else {
      console.log()
      console.log('authentification réussie')
      console.log()
      next();
    }
  } catch {
    res.status(401).json({error: new Error("authentification impossible")});
  }
};