// const { User, Post, Board, Content } = require("../models");
const { Board, Post, Content } = require("../models");

exports.uploadPost = async (req, res, next) => {
  try {
    const { boardName, title, content } = req.body;
    // console.log(`게시판 이름 : ${boardName}`);
    // console.log(`게시글 타이틀 : ${title}`);
    // console.log(`게시글 innerHTML : ${content}`);
    // console.log(`작성자 : ${res.locals.user}`);
    // const data = {
    //     title,
    //     content: editor.getData(),
    //     boardName,
    //   };

    // 게시판이름으로 게시판ID 찾아서 저장
    const board = await Board.findOne({ where: { name: boardName } });
    // console.log(`boardId : ${board.id}`);

    // posts 테이블에 데이터 저장
    const post = await Post.create({
      title,
      BoardId: board.id,
      UserId: 5,
    });
    // console.log(post);

    // contents 테이블에 데이터 저장
    const contentHTML = await Content.create({
      content,
      PostId: post.id,
    });
    // console.log(contentHTML);
    console.log("redirect 전");
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
};
