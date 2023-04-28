const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserialize");
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followings",
        },
      ],
    })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });

  local();
<<<<<<< HEAD
  // kakao();
=======
  //kakao();
>>>>>>> 40229bb (routes, controllers안 page.js와 views안 community, communityView, info, notice 4개 html파일 총 6개 파일 수정)
};
