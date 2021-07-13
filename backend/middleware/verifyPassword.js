const passwordSchema = require('../models/Password');
"use strict";

//verifie que le mode de passe est fort grace au shema de donné 
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(400).json({ error: 'Mot de passe pas assez fort ! ' + passwordSchema.validate(req.body.password, { list: true }) });
    } else {
        next();
    }
};

