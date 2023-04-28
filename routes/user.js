const express = require("express");
const router = express.Router();

// const { checkUserId, checkUserNick } = require("../controllers/user");
const { checkUser, getPost, updateUser } = require("../controllers/user");

router.get("/check", checkUser);

// router.get("/check", checkUserNick);

router.post('/:id/posts', getPost);

// router.patch('/:id', updateUser);

module.exports = router;
