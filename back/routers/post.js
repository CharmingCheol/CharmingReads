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
    const post = await db.Post.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      src: req.body.image,
      UserId: req.user.id
    });
    return res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
