// const { User, Post, Board, Content } = require("../models");
const { Board, Post, Content } = require("../models");

exports.uploadPost = async (req, res, next) => {
  try {
    console.log(req.body);
    const { boardName, title, content } = req.body;

    // 게시판이름으로 게시판ID 찾아서 저장
    const board = await Board.findOne({ where: { name: boardName } });
    console.log(board);
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

exports.editPost = async (req, res, next) => {
  try {
    const { boardName, title, content, postId } = req.body;
    console.log(`게시글 ${postId}번을 수정합니다`);
    // posts 테이블에 데이터 수정
    await Post.update(
      {
        title: title,
        updatedAt: new Date(),
      },
      {
        where: { id: postId },
      }
    );

    // contents 테이블에 데이터 수정
    await Content.update(
      {
        content: content,
        updatedAt: new Date(),
      },
      {
        where: { PostId: postId },
      }
    );

    return res.status(200).end();
  } catch (err) {
    console.error(err);
  }
};
