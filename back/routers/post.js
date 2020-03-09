const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();
const db = require("../models");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "charmingbooks",
    key(req, file, cb) {
      cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
    }
  }),
  limits: { fileSize: 1024 * 1024 * 20 }
});

//이미지 불러오기
router.post(
  "/loadPostImage",
  upload.single("image"),
  async (req, res, next) => {
    try {
      return res.json(req.file.location);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

//게시글 추가
router.post("/addPost", upload.none(), async (req, res, next) => {
  try {
    console.log(req.body);
    const post = await db.Post.create({
      title: req.body.title,
      content: req.body.content,
      src: req.body.image,
      UserId: req.user.id
    });
    const hashTags = req.body.hashTag.split(" ");
    const result = await Promise.all(
      hashTags.map(tag =>
        db.Hashtag.findOrCreate({
          where: { content: tag.slice(1) }
        })
      )
    );
    await post.addHashtag(result.map(tag => tag[0]));
    const returnPost = await db.Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "userId", "nickName", "src", "introduction"]
        }
      ]
    });
    return res.json(returnPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
