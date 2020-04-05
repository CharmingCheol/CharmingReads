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
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "charmingbooks",
    key(req, file, cb) {
      cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 20 },
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
      UserId: req.user.id,
    });
    await db.User.update(
      {
        postCount: parseInt(req.body.postCount, 10) + 1,
      },
      {
        where: { id: req.user.id },
      }
    );
    return res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//좋아요 많은 게시글 불러오기
router.get("/topLiked", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      limit: parseInt(req.query.limit, 10),
      order: [
        ["likeCount", "DESC"],
        ["createdAt", "DESC"],
      ],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//댓글 많은 게시글 불러오기
router.get("/topRatedComment", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      limit: parseInt(req.query.limit, 10),
      order: [
        ["commentCount", "DESC"],
        ["createdAt", "DESC"],
      ],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//모든 게시물 불러오기
router.get("/all", async (req, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: { [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) },
      };
    } else {
      where = {
        id: { [db.Sequelize.Op.lt]: 99999999 },
      };
    }
    const posts = await db.Post.findAll({
      where,
      limit: parseInt(req.query.limit, 10),
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
