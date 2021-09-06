const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controllers.js');

const auth = require('../middleware/auth');
const authPost = require('../middleware/authPost.js')


const multer = require('../middleware/multer-config');


router.post('/create', multer, postCtrl.create);
router.put('/:postId', auth , authPost, postCtrl.update);
router.delete('/:postId', auth, authPost, postCtrl.delete);
router.get('/:postId', auth, authPost, postCtrl.findOne);
router.get('/', auth, postCtrl.findAll);


module.exports = router;