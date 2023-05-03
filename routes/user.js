const express = require("express");
const router = express.Router();

// const { checkUserId, checkUserNick } = require("../controllers/user");
const { checkUser, getPost, editUser } = require("../controllers/user");

router.get("/check", checkUser);

// router.get("/check", checkUserNick);

router.get("/:id/posts", getPost);

// router.patch('/:id', updateUser);

router.post("/:id", editUser);

module.exports = router;
