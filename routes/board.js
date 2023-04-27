const express = require('express');
const router = express.Router();

const { uploadPost } = require('../controllers/board');




router.post(`/:boardName/posts`, uploadPost);


module.exports = router;