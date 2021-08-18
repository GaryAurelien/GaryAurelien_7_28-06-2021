const express = require('express');
const router = express.Router();

const comCtrl = require('../controllers/commentaire.controllers.js');
const auth = require('../middleware/auth');

/*const verifyPassword = require('../middleware/verifyPassword')*/

router.post('/create', /*auth,*/ comCtrl.create);
router.put('/:commentaireId', /*auth,*/ comCtrl.update);
router.get('/:postId/comment', /*auth,*/ comCtrl.findComWithPostId);
router.delete('/:commentaireId', /*auth,*/ comCtrl.delete);
router.get('/:id', /*auth,*/ comCtrl.findOne);
router.get('/', /*auth,*/ comCtrl.findAll);


module.exports = router; 