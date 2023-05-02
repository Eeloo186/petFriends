const { User, Post, Content } = require("../models");

exports.checkUser = async (req, res) => {
  try {
    if (Object.keys(req.query)[0] == "userId") {
      const userId = req.query.userId;
      const user = await User.findOne({ where: { userId: userId } });
      const isDuplicate = user !== null;
      res.json({ isDuplicate: isDuplicate });
    } else if (Object.keys(req.query)[0] == "nickname") {
      const nickname = req.query.nickname;
      const user = await User.findOne({ where: { nickname: nickname } });
      const isDuplicate = user !== null;
      res.json({ isDuplicate: isDuplicate });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getPost = async(req, res, next) => {
  console.log(req.user.id);
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
          where: { id: req.user.id },
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
    });
    res.json({
      posts,
    });
} catch (err) {
    console.error(err);
    next(err);
}
};

// exports.updateUser( async (req, res) => {
// });