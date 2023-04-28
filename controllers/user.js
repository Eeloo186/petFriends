const { User, Post, Content } = require("../models");

exports.checkUser = async (req, res) => {
  try {
    console.log(Object.keys(req.query)[0]);
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


exports.getPost = async(req, res) => {
  console.log('------------------1------------------');
  try {
    const posts = await Post.findAll({
        attributes: ['title', 'createdAt',],
        where: {UserId: req.user.id},

        include: [
            {
                model: User,
                attributes: ['userId', 'nickname'],
            },
            {
                model: Content,
                attributes: ['content'],
            },
        ],

    });
    // res
    console.log('-------------------------------------');
    console.log(posts);
    console.log('-------------------------------------');

    // res.render('mypage',{ 
    //   twits: posts,
    // });
    res.send("TEST");
} catch (err) {
    console.error(err);
    next(err);
}
};

// exports.updateUser( async (req, res) => {

// });