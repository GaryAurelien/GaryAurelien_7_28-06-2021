const express = require('express');
const router = express.Router();

const comCtrl = require('../controllers/commentaire.controllers.js');
const auth = require('../middleware/auth');

/*const verifyPassword = require('../middleware/verifyPassword')*/

router.post('/createCom', /*auth,*/ comCtrl.createCom);
router.put('/:commentaireId', /*auth,*/ comCtrl.update);
router.delete('/:commentaireId', /*auth,*/ comCtrl.delete);
router.get('/:id', /*auth,*/ comCtrl.findOne);
router.get('/', /*auth,*/ comCtrl.findAll);
//router.post('/:id/like', /*auth,*/ saucesCtrl.likeOrDislikeSauce);

module.exports = router; 