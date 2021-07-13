const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controllers.js');
/* const vpass = require('../middleware/validate-password') */

router.post('/signup', /* vpass, */ userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;