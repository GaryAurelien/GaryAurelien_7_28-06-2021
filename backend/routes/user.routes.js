const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers.js');

const verifyPassword = require('../middleware/verifyPassword')

router.post('/signup', verifyPassword,  userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:userId', userCtrl.update);
router.delete('/:userId', userCtrl.delete);
router.get('/:id',  userCtrl.findOne);
router.get('/',  userCtrl.findAll);

module.exports = router;