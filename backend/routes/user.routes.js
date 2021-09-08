const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin')
const authUser = require('../middleware/authUser')
const userCtrl = require('../controllers/user.controllers.js');
const verifyPassword = require('../middleware/verifyPassword.js')
const multer = require('../middleware/multer-profile');


router.post('/signup', multer, verifyPassword,  userCtrl.signup);
router.post('/login', userCtrl.login);

router.put('/:userId',auth, authUser, verifyPassword, userCtrl.update);
router.delete('/:userId',auth, authUser, userCtrl.delete);
router.get('/:userId',auth, authUser,  userCtrl.findOne);
router.get('/', auth, authAdmin ,userCtrl.findAll);
/*router.delete('/', userCtrl.deleteAll);*/

module.exports = router;