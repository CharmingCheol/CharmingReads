const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const db = require("../models");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload");
    },
    filename: (req, file, cb) => {
      const extName = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, extName);
      cb(null, baseName + new Date().valueOf() + extName);
    }
  }),
  limits: { fileSize: 1024 * 1024 * 20 }
});

//내 정보 불러오기
router.get("/loadUser", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("로그인 먼저 해라");
    }
    const loadUser = Object.assign({}, req.user.toJSON());
    delete loadUser.password;
    return res.json(loadUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//유저 정보 변경
router.patch("/edit", upload.none(), async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await db.User.update(
      {
        userId: req.body.userId,
        nickName: req.body.nickName,
        password: hashPassword,
        introduction: req.body.introduction,
        src: req.body.image
      },
      {
        where: { id: req.user.id }
      }
    );
    const returnUser = await db.User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "userId", "nickName", "introduction", "src"]
    });
    return res.json(returnUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//이미지 불러오기
router.post("/uploadImage", upload.single("image"), async (req, res, next) => {
  try {
    return res.json(req.file);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//게시글 저장
router.post("/addPostStorage", async (req, res, next) => {
  try {
    await db.PostStorage.create({
      UserId: req.user.id,
      PostId: req.body.postId
    });
    return res.json(req.body.postId);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//게시글 저장 취소
router.delete("/:id/removePostStorage", async (req, res, next) => {
  try {
    await db.PostStorage.destroy({ where: { PostId: req.params.id } });
    return res.status(200).send(req.params.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//유저 정보 불러오기
router.get("/:id", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
      },
      include: [
        {
          model: db.Post,
          include: [
            {
              model: db.User,
              as: "Like",
              attributes: ["id"]
            },
            {
              model: db.Comment,
              attributes: ["id"]
            }
          ]
        },
        {
          model: db.User,
          as: "Follow",
          attributes: ["id"]
        },
        {
          model: db.User,
          as: "Follower",
          attributes: ["id"]
        },
        {
          model: db.PostStorage,
          include: [
            {
              model: db.Post,
              include: [
                {
                  model: db.User,
                  as: "Like",
                  attributes: ["id"]
                },
                {
                  model: db.Comment,
                  attributes: ["id"]
                }
              ]
            }
          ]
        }
      ]
    });
    const jsonUser = Object.assign({}, user.toJSON());
    console.log(jsonUser);
    jsonUser.Posts.Likes = jsonUser.Posts.Likes
      ? jsonUser.Posts.Likes.length
      : 0;
    jsonUser.Posts.Comments = jsonUser.Posts.Comments
      ? jsonUser.Posts.Comments.length
      : 0;
    jsonUser.PostStorages.Likes = jsonUser.PostStorages.Likes
      ? jsonUser.PostStorages.Likes.length
      : 0;
    jsonUser.PostStorages.Comments = jsonUser.PostStorages.Comments
      ? jsonUser.PostStorages.Comments.length
      : 0;
    delete jsonUser.password;
    return res.status(200).json(jsonUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//팔로우
router.post("/:id", async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id }
    });
    const anotherUser = await db.User.findOne({
      where: { id: req.params.id }
    });
    await me.addFollow(req.params.id);
    await anotherUser.addFollower(req.user.id);
    return res.status(200).json(req.params);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//언팔로우
router.delete("/:id", async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id }
    });
    const anotherUser = await db.User.findOne({
      where: { id: req.params.id }
    });
    await me.removeFollow(req.params.id);
    await anotherUser.removeFollower(req.user.id);
    return res.status(200).json(req.params.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
