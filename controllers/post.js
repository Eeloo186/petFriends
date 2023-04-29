


exports.afterUploadImage = (req, res) => {
    console.log(req.files[0].mimetype);
    res.json({ url: `/img/${req.files[0].filename}` });
  };