const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const Pet = require("../models/pet");

exports.join = async (req, res, next) => {
  const {
    userId,
    password,
    nickname,
    email,
    emailSelect,
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
    const address = `${address1} ${address2} ${address3}`;
    const allEmail = `${email}@${emailSelect}`;
    await User.create({
      userId,
      password: hash,
      nickname,
      email: allEmail,
      address,
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
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
