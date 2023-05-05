const { reformatDate } = require('../utils');
const { Comment, User, Post } = require("../models");

exports.afterUploadImage = (req, res) => {
  console.log(req.files[0].mimetype);
  res.json({ url: `/img/${req.files[0].filename}` });
};

exports.uploadComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { commentContent, userId } = req.body;

    // 받아온 정보로 db에 댓글 정보 추가
    await Comment.create({
      content: commentContent,
      UserId: userId,
      PostId: postId,
    });

    // 댓글 목록 갱신을 위해서 댓글 목록을 읽어와서 json 형식으로 되돌려준다
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "userId", "nickname"],
        },
        {
          model: Post,
          attributes: ["id"],
          where: { id: postId },
        },
      ],
    });

    // 날짜를 필요한 형태로 바꿈
    comments.forEach((comment) => {
      reformatDate(comment, "full");
    })
    return res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
