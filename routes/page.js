const express = require("express");

const {previousUrl} = require('../middlewares')

const router = express.Router();


const {
  renderMain,
  renderNotice,
  renderInfo,
  renderCommunity,
  renderCommunityView,
  renderLogin,
  renderJoin,
  renderEditor,
  renderMypage,
  renderModifyUser,
} = require("../controllers/page");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


router.use(previousUrl);

// 메인 페이지
router.get("/", renderMain);

// 공지사항 페이지
router.get("/page/notice", renderNotice);

// 정보제공 페이지
router.get("/page/info", renderInfo);

// 커뮤니티 페이지
router.get("/page/community", renderCommunity);

// 개별 상세보기 페이지
router.get("/page/communityView/:id", renderCommunityView);

// 글쓰기(에디터) 페이지
router.get("/page/editor", renderEditor);

// 마이페이지
router.get("/page/mypage", renderMypage);

// 유저정보 수정 페이지
router.get('/page/users/:id', renderModifyUser);



module.exports = router;
