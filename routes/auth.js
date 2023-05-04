const express = require("express");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");
const {
  renderLogin,
  renderJoin,
} = require("../controllers/page");


const router = express.Router();


// 회원 가입 페이지
router.get("/join", renderJoin);

// POST /auth/join
router.post("/join", isNotLoggedIn, join);

// 로그인 페이지
router.get("/login", renderLogin);

// POST /auth/login
router.post("/login", isNotLoggedIn, login);

// GET /auth/logout
router.get("/logout", isLoggedIn, logout);

// GET /auth/kakao
router.get("/kakao", passport.authenticate("kakao"));

// GET /auth/kakao/callback
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인 실패",
  }),
  (req, res) => {
    res.redirect("/"); // 성공 시에는 /로 이동
  }
);



module.exports = router;
