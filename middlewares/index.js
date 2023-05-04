exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};


// 관리자 여부 조사
exports.isAdmin = (req, res, next) => {
  // id 받아서 등급 조사로 admin 여부 구해옴
};
exports.isNotAdmin = (req, res, next) => {

};


exports.previousUrl= ((req, res, next) => {

  if(!req.path.includes('/auth/login') && !req.path.includes('/auth/logout') ){
    req.session.previousUrl= req.originalUrl;

  }
  //console.log("app.use ----->", req.session.previousUrl);

  next();
})
