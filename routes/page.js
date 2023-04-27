const express = require('express');
const router = express.Router();

const { renderMain, renderNotice, renderInfo, renderCommunity,
        renderLogin, renderJoin, renderEditor } = require('../controllers/page');


router.use( (req, res, next) => {
    // res.locals.user = req.user;
    res.locals.user = 100;
    
    // 기타 페이지 이동시 필요한 정보들 여기에 추가

    next();
});


// 메인 페이지
router.get('/', renderMain);

// 로그인 페이지
router.get('/page/login', renderLogin);

// 회원 가입 페이지
router.get('/page/join', renderJoin);

// 공지사항 페이지
router.get('/page/notice', renderNotice);

// 정보제공 페이지
router.get('/page/info', renderInfo);

// 커뮤니티 페이지
router.get('/page/community', renderCommunity);

// 글쓰기(에디터) 페이지
router.get('/page/editor', renderEditor);


module.exports = router;