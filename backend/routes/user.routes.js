const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controllers.js');
const verifyPassword = require('../middleware/verifyPassword.js')

router.post('/signup', verifyPassword,  userCtrl.signup);
router.post('/login', userCtrl.login);

router.put('/:userId', verifyPassword, userCtrl.update);
router.delete('/:userId', userCtrl.delete);
router.get('/:userId',  userCtrl.findOne);
router.get('/',  userCtrl.findAll);
router.delete('/', userCtrl.deleteAll);

module.exports = router;