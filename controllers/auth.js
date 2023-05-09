const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Pet } = require("../models");

exports.join = async (req, res, next) => {
  const {
    userId,
    password,
    nickname,
    email,
    address1,
    address2,
    address3,
    provider,
    pet,
    petName,
    petType,
    petKind,
    petAge,
    petEtc,
  } = req.body;
  try {
    const exUser = await User.findOne({ where: { userId } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      userId,
      password: hash,
      nickname,
      email,
      address1,
      address2,
      address3,
      provider,
      pet,
    });
    await Pet.create({
      name: petName,
      type: petType,
      kind: petKind,
      age: Number(petAge),
      etc: petEtc,
    });
    return res.redirect("/");
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
      return res
        .status(401)
        .send(
          `<script>alert('아이디가 없거나 비밀번호가 잘못되었습니다.');history.back();</script>`
        );
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const returnTo = req.session.returnTo || "/";
      delete req.session.returnTo;
      return res.redirect(returnTo);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};

exports.saveReturnTo = (req, res, next) => {
  req.session.returnTo = req.header("Referer") || "/";
  next();
};
