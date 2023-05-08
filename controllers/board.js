const { Board, Post, Content, User } = require("../models");
const { reformatDate } = require("../utils");

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

exports.deletePost = (req, res, next) => {
  console.log("게시글 삭제 시작");
  const { boardName, postId } = req.params;
  console.log(`게시글ID : ${postId}`);
  console.log(`게시판이름ID : ${boardName}`);
  // 게시글 삭제
  // postId로 Post테이블에서 삭제할 행 검색

  // DB에서 물리적인 삭제가 아닌 deleteAt을 통한 논리적인 삭제 방식이
  // 적용되어있기 때문에 posts 테이블과 연관된 테이블들의 데이터 삭제를
  // 위해서는 수동으로 찾아서 삭제해줄 필요가 있다.
  // 이 과정에서 일부 작업만 성공하고 끝나버리는 문제를 막기 위해
  // 트랜잭션을 도입해서 처리해야한다.
  // 혹은 물리적인 삭제로 변경해야한다. 이 경우 삭제된 정보 복구를 위해서는
  // 삭제와 동시에 백업용 테이블에 정보를 옮겨둘 필요가 있다.

  // 지금은 paranoid: false로 변경해 물리적 삭제로 변경해서 문제를 해결
  Post.destroy({
    where: { id: postId },
  })
    .then(() => {
      console.log("게시글 삭제 성공");
      res.status(200).json({ boardName });
    })
    .catch((err) => {
      console.log("게시글 삭제 중 오류 발생");
      console.error(err);
      next(err);
    });
};

exports.sortPost = async (req, res, next) => {
  if (req.query.sortType == "newest") {
    console.log(1);
    try {
      const viewlist = await Post.findAll({
        order: [["id", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["userId", "nickname"],
          },
        ],
      });
      viewlist.forEach((data) => {
        reformatDate(data, "full");
      });
      res.send(viewlist);
    } catch (err) {
      console.error(err);
      next();
    }
  } else if (req.query.sortType == "old") {
    console.log(2);
    try {
      const viewlist = await Post.findAll({
        order: [["id", "ASC"]],
        include: [
          {
            model: User,
            attributes: ["userId", "nickname"],
          },
        ],
      });
      res.send(viewlist);
    } catch (err) {
      console.error(err);
      next();
    }
  } else if (req.query.sortType == "highView") {
    console.log(3);
    try {
      const viewlist = await Post.findAll({
        order: [["view", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["userId", "nickname"],
          },
        ],
      });
      res.send(viewlist);
    } catch (err) {
      console.error(err);
      next();
    }
  } else if (req.query.sortType == "rowView") {
    console.log(4);
    try {
      const viewlist = await Post.findAll({
        order: [["view"]],
        include: [
          {
            model: User,
            attributes: ["userId", "nickname"],
          },
        ],
      });
      res.send(viewlist);
    } catch (err) {
      console.error(err);
      next();
    }
  }
};
