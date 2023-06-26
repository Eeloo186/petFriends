const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Pet } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { userId: username } });
    if (exUser) {
      return res.status(400).json({ error: "exist" });
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      userId: username,
      password: hash,
    });
    req.login(newUser, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).send("회원가입 및 로그인 성공");
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.error("없는 아이디입니다.");
      return res.status(200).json({ message: "success" });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).send("로그인 성공"); // 로그인 성공 시 응답을 반환합니다.
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.check = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    // 로그인 중이 아닙니다.
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const foundUser = await User.findOne({ where: { id: user.id } });
    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.logout = (req, res) => {
  req.logout(() => {
    // if 주소에 마이페이지 등 있음. => 메인 페이지로
    // else 주소에 마이페이지 등 없음. => 기존 페이지로
    const url = req.headers.referer;
    if (url.includes("mypage") || url.includes("admin")) {
      return res.redirect("/");
    } else {
      return res.redirect(url);
    }
    // res.redirect(req.headers.referer);
  });
};

exports.saveReturnTo = (req, res, next) => {
  req.session.returnTo = req.header("Referer") || "/";
  next();
};
