const express = require("express");
const router = express.Router();

const {
  renderMain,
  renderNotice,
  renderInfo,
  renderCommunity,
  renderCommunityView,
  renderPostDetail,
  renderLogin,
  renderJoin,
  renderEditor,
  renderMypage,
  renderModifyUser,
  renderAdminpost,
  renderMember,
  highViewList,
  rowViewList,
  newestList,
  oldList,
} = require("../controllers/page");

router.use((req, res, next) => {
  // req.user를 통해 암호화된 password 등 불필요한 정보가
  // 브라우저에 유출되지 않도록
  // 필요한 정보만 저장하는 방식으로 변경할 필요성이 있음
  res.locals.user = req.user;
  res.locals.likedPostList = req.user?.Likes?.map((f) => f.PostId) || [];
  next();
});

// 메인 페이지
router.get("/", renderMain);

// 로그인 페이지
// router.get("/page/login", renderLogin);
router.post("/page/login", renderLogin);

// 회원 가입 페이지
router.get("/page/join", renderJoin);

// 공지사항 페이지
router.get("/page/notice", renderNotice);

// 정보제공 페이지
router.get("/page/info", renderInfo);

// 커뮤니티 페이지
router.get("/page/community", renderCommunity);



// 글쓰기(에디터) 페이지
router.get("/page/editor", renderEditor);
// router.get("/page/editor/:postId");

// 마이페이지
router.get("/page/mypage", renderMypage);

// 유저정보 수정 페이지
router.get("/page/users/:id", renderModifyUser);

router.get("/page/admin_post", renderAdminpost);

router.get("/admin_post/admin_member", renderMember);

// 개별 상세보기 페이지
// router.get("/page/communityView/:postId", renderCommunityView);
router.get("/page/:boardName/:postId", renderPostDetail);

//커뮤니티 순서 정렬
// router.get("/page/community/list/highView", highViewList);
// router.get("/page/community/list/rowView", rowViewList);
// router.get("/page/community/list/newest", newestList);
// router.get("/page/community/list/old", oldList);

module.exports = router;
