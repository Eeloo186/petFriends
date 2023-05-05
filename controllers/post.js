const Post = require("../models/post");

exports.afterUploadImage = (req, res) => {
  console.log(req.files[0].mimetype);
  res.json({ url: `/img/${req.files[0].filename}` });
};

exports.addView = async (req, res) => {
  try {
    console.log(req.params.id);
    const postId = req.params.id;
    const post = await Post.findOne({ where: { id: postId } });
    console.log(post);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    post.view += 1;
    await post.save();
    res.send({ message: "Post view count incremented successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
