const express = require('express');
const router = express.Router();

const { uploadPost, editPost } = require('../controllers/board');




router.post(`/:boardName/posts`, uploadPost);
router.put(`/:boardName/posts`, editPost);

module.exports = router;