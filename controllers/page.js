const { User, Post, Board, Content } = require("../models");

exports.renderMain = async (req, res, next) => {
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
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderNotice = async (req, res, next) => {
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
    });
    res.render("notice", {
      title: "공지사항페이지",
      twits: posts,
      boardName: "notice",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderInfo = async (req, res, next) => {
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
    });
    res.render("info", {
      title: "정보페이지",
      twits: posts,
      boardName: "info",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderCommunity = async (req, res, next) => {
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
    });

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
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderLogin = (req, res) => {
  res.render("login", { title: "로그인 페이지" });
};

exports.renderJoin = async (req, res, next) => {
  try {
    const joins = await User.findAll({
      attributes: ["id", "userId"],
    });
    res.render("join", {
      title: "회원가입 - NodeBird",
      script: "/javascript/join.js",
      join: joins,
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
