const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers.js');


/*const verifyPassword = require('../middleware/verifyPassword')*/

router.post('/create', /* verifyPassword, */ postCtrl.create);
router.put('/:postId', postCtrl.update);
router.delete('/:postId', postCtrl.delete);

module.exports = router;