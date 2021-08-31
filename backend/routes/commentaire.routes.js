const express = require('express');
const router = express.Router();

const comCtrl = require('../controllers/commentaire.controllers.js');

const auth = require('../middleware/auth');
const authComment = require('../middleware/authComment');


router.post('/create', comCtrl.create);
router.put('/:commentaireId', auth, authComment, comCtrl.update);
router.get('/:postId/comment', auth, comCtrl.findComWithPostId);
router.delete('/:commentaireId', auth, authComment, comCtrl.delete);
router.get('/:id', auth, authComment, comCtrl.findOne);
router.get('/', auth, comCtrl.findAll);


module.exports = router; 