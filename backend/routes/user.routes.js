const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin')
const authUser = require('../middleware/authUser')
const userCtrl = require('../controllers/user.controllers.js');
const verifyPassword = require('../middleware/verifyPassword.js')
const multerProfile = require('../middleware/multer-profile');


router.post('/signup', multerProfile, verifyPassword,  userCtrl.signup);
router.post('/login', userCtrl.login);

router.put('/:userId',auth, authUser, multerProfile, verifyPassword, userCtrl.update);
router.delete('/:userId',auth, authUser, userCtrl.delete);
router.get('/:userId',auth, authUser,  userCtrl.findOne);
router.get('/', auth, authAdmin ,userCtrl.findAll);


module.exports = router;



/*Lorsqu'un client envoie une requête pour un point de terminaison à l'aide 
d'une requête HTTP (GET, POST, PUT, DELETE), nous devons déterminer comment le serveur répondra. 
Voici les itinéraires.*/