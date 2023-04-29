// const { User, Post, Board, Content } = require("../models");
const { Board, Post, Content } = require("../models");

exports.uploadPost = async (req, res, next) => {
  try {
    const { boardName, title, content } = req.body;

    // 게시판이름으로 게시판ID 찾아서 저장
    const board = await Board.findOne({ where: { name: boardName } });

    // posts 테이블에 데이터 저장
    const post = await Post.create({
      title,
      BoardId: board.id,
      UserId: req.user.id,
    });

    // contents 테이블에 데이터 저장
    const contentHTML = await Content.create({
      content,
      PostId: post.id,
    });
    return res.end();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
