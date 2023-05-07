const express = require('express');
const router = express.Router();

const { uploadPost, editPost, deletePost } = require('../controllers/board');




router.post(`/:boardName/posts`, uploadPost);
router.put(`/:boardName/posts`, editPost);
router.delete(`/:boardName/posts/:postId`, deletePost);

module.exports = router;