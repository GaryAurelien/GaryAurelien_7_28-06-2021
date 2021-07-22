const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controllers.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/*const verifyPassword = require('../middleware/verifyPassword')*/

router.post('/create',/*auth,*/multer, postCtrl.create);
router.put('/:postId',/*auth,*/ postCtrl.update);
router.delete('/:postId', /*auth,*/ postCtrl.delete);
router.get('/:id', /*auth,*/ postCtrl.findOne);
router.get('/', /*auth,*/ postCtrl.findAll);//ok
//router.post('/:id/like', /*auth,*/ saucesCtrl.likeOrDislikeSauce);

module.exports = router;  