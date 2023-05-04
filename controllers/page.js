const e = require("express");
const { User, Post, Board, Content } = require("../models");

exports.renderMain = async (req, res, next) => {
  console.log("renderMain 진입");
  try {
    const kakao = process.env.KAKAO_ID;
    const posts = await Post.findAll({
      order: [["view", "DESC"]],
      limit: 5,
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
    });

    res.render("main", {
      title: "메인페이지",
      twits: posts,
      boardName: "main",
      user: req.user,
      kakao,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderNotice = async (req, res, next) => {
  const page = req.query.currentPage;
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
          where: { name: "notice" },
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });

    const postsCount = await Post.findAndCountAll({
      nest: false,
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
          where: { name: "notice" },
        },
        {
          model: Content,
          attributes: ["id", "content"],
        },
      ],
      limit: 10,
      offset: page * 10,
    });

    const { count } = postsCount;
    let limit = 10;

    const pagingData = getPagingDataCount(count, page, limit);

    // DB createdAt에 들어있는 Date 정보 커스터마이징
    posts.forEach((post) => {
      let date = post["dataValues"]["createdAt"];
      post["dataValues"][
        "createdAt"
      ] = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    });

    res.render("notice", {
      title: "공지사항페이지",
      twits: posts,
      boardName: "notice",
      pagingData,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderInfo = async (req, res, next) => {
  const page = req.query.currentPage;
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
          where: { name: "info" },
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });

    const postsCount = await Post.findAndCountAll({
      nest: false,
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
          where: { name: "info" },
        },
        {
          model: Content,
          attributes: ["id", "content"],
        },
      ],
      limit: 10,
      offset: page * 10,
    });

    const { count } = postsCount;
    let limit = 10;

    const pagingData = getPagingDataCount(count, page, limit);

    // DB createdAt에 들어있는 Date 정보 커스터마이징
    posts.forEach((post) => {
      let date = post["dataValues"]["createdAt"];
      post["dataValues"][
        "createdAt"
      ] = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    });

    res.render("info", {
      title: "정보페이지",
      twits: posts,
      boardName: "info",
      pagingData,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderCommunityView = async (req, res, next) => {
  //console.log(req.params);
  const { id } = req.params;
  try {
    const posts = await Post.findOne({
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
      where: {
        id: id,
      },
    });

    res.render("communityView", {
      title: "메인페이지",
      twits: posts,
      boardName: "communityView",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderCommunity = async (req, res, next) => {
  const page = req.query.currentPage;
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
          where: { name: "community" },
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });
    //console.log(posts);

    const postsCount = await Post.findAndCountAll({
      nest: false,
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
          where: { name: "community" },
        },
        {
          model: Content,
          attributes: ["id", "content"],
        },
      ],
      limit: 10,
      offset: page * 10,
    });

    const { count } = postsCount;
    let limit = 10;

    const pagingData = getPagingDataCount(count, page, limit);

    // DB createdAt에 들어있는 Date 정보 커스터마이징
    posts.forEach((post) => {
      let date = post["dataValues"]["createdAt"];
      post["dataValues"][
        "createdAt"
      ] = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    });

    res.render("community", {
      title: "커뮤니티페이지",
      twits: posts,
      boardName: "community",
      pagingData,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

getPagingDataCount = (totalItems, page, limit) => {
  const currentPage = page ? page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  const pnStart = (Math.ceil(page / limit) - 1) * limit + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
  let pnEnd = pnStart + limit; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
  if (pnEnd > totalPages) pnEnd = totalPages; // NOTE: 페이지네이션의 끝 번호가 페이지네이션 전체 카운트보다 높을 경우.

  return { totalItems, totalPages, currentPage, pnStart, pnEnd };
};

exports.renderLogin = (req, res) => {
  res.render("login", { title: "로그인 페이지" });
};

exports.renderJoin = async (req, res, next) => {
  try {
    res.render("join", {
      title: "회원가입",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderEditor = (req, res) => {
  res.render("editor", {
    title: "글쓰기(에디터) 페이지",
    boardName: req.query["board-name"],
  });
};

exports.renderMypage = (req, res) => {
  // console.log(req.user);
  // res.render('mypage', {
  //   user: req.user,
  // });
  res.render("mypage");
};

exports.renderModifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    // console.log(user);
    //console.log('----------------------------');
    // console.log(req.user["dataValues"]["id"]);
    // console.log(req.user.id);
    //console.log(user);
    //console.log('----------------------------');

    res.render("modify", {
      title: "회원정보수정",
      user: user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.popularList = async (req, res, next) => {
  try {
    const popularList = await Post.findAll({
      order: [["view", "DESC"]],
      limit: 10,
    });
    res.json({ popularList }); // popularList를 객체 형태로 응답합니다.
  } catch (err) {
    console.error(err);
    next(err);
  }
};
