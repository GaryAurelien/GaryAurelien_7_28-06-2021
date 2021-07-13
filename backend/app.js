/*vous placerez votre application Express :*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

/**************************Sécurité**************************/

const helmet = require('helmet');

/**************************Importation route et divers**************************/
 
const userRoutes = require("./routes/user.routes.js");

const app = express();

/*Ces headers permettent :
d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.). */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.json());

// analyser les requêtes de type de contenu : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);


module.exports = app;