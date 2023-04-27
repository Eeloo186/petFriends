const express = require('express');
const router = express.Router();
// 라우트 포함 (추후 라우트 분류하면서 수정 필요함)
const pageRouter = require("./page");
const boardRouter = require("./board");
// const authRouter = require("./routes/auth");
// const postRouter = require("./routes/post");
// const userRouter = require("./routes/user");
// const pageRouter = require('./routes/page');

// 라우터 사용 선언 (추후 라우트 분류하면서 수정 필요함)
router.use("/", pageRouter);
router.use("/boards", boardRouter);
// app.use("/auth", authRouter);
// app.use("/post", postRouter);
// app.use("/user", userRouter);


/////////////////////////////////////////////////////////
//////////// 라우트 분류 전 임시 사용 공간 //////////////
/////////////////////////////////////////////////////////
// const { renderProfile, renderJoin, renderMain, renderHashtag, renderTestmain, renderNotice, renderInfo, renderCommunity, renderLogin, renderEditorTest
//     ,renderUploadTest } = require('../controllers');
// const { isLoggedIn, isNotLoggedIn } = require('../middlewares');


// router.get('/', renderMain);
// router.get('/notice', renderNotice);
// router.get('/info', renderInfo);
// router.get('/community', renderCommunity);
// router.get('/login', isNotLoggedIn, renderLogin);
// router.get('/editorTest/community', /* isLoggedIn */ renderEditorTest);
// router.post('/uploadTest', renderUploadTest);


module.exports = router;