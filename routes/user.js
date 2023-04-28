const express = require("express");
const router = express.Router();

// const { checkUserId, checkUserNick } = require("../controllers/user");
const { checkUser } = require("../controllers/user");

router.get("/check", checkUser);

// router.get("/check", checkUserNick);

module.exports = router;
