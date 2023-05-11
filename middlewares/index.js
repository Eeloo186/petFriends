exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/page/login");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

// 관리자 여부 조사
exports.isAdmin = (req, res, next) => {
  // id 받아서 등급 조사로 admin 여부 구해옴
};
exports.isNotAdmin = (req, res, next) => {};
