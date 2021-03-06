const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

/**************************Sécurité**************************/

const helmet = require('helmet');

/**************************Importation route et divers**************************/
 
const userRoutes = require("./routes/user.routes.js");
const postRoutes = require("./routes/post.routes.js");
const comRoutes = require("./routes/commentaire.routes.js");

const app = express();


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

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/profilPic', express.static(path.join(__dirname, 'profilPic')));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/commentaires', comRoutes);

//on export app que l'on utilisera dans server.js
module.exports = app;