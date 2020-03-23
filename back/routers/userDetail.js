const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
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
          attributes: ["id", "nickName", "src"]
        },
        {
          model: db.User,
          as: "Follower",
          attributes: ["id", "nickName", "src"]
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
    jsonUser.Follow = jsonUser.Follow.sort((p, c) => {
      return c["id"] - p["id"];
    });
    jsonUser.Follow = jsonUser.Follow.slice(0, 10);
    jsonUser.Follower = jsonUser.Follower.sort((p, c) => {
      return c["id"] - p["id"];
    });
    jsonUser.Follower = jsonUser.Follower.slice(0, 10);
    jsonUser.Posts = jsonUser.Posts.sort((p, c) => {
      return c["id"] - p["id"];
    });
    jsonUser.Posts = jsonUser.Posts.slice(0, 9);
    jsonUser.PostStorages = jsonUser.PostStorages.sort((p, c) => {
      return c["id"] - p["id"];
    });
    jsonUser.PostStorages = jsonUser.PostStorages.slice(0, 9);
    delete jsonUser.password;
    return res.status(200).json(jsonUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//팔로우
router.post("/:id/follow", async (req, res, next) => {
  try {
    await db.User.update(
      {
        followCount: req.body.followCount + 1
      },
      { where: { id: req.user.id } }
    );
    await db.User.update(
      {
        followerCount: req.body.followerCount + 1
      },
      { where: { id: req.params.id } }
    );

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
router.post("/:id/unfollow", async (req, res, next) => {
  try {
    await db.User.update(
      {
        followCount: req.body.followCount - 1
      },
      { where: { id: req.user.id } }
    );
    await db.User.update(
      {
        followerCount: req.body.followerCount - 1
      },
      { where: { id: req.params.id } }
    );

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

//팔로우 리스트 불러오기
router.get("/:id/follow", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          as: "Follow",
          attributes: ["id", "nickName", "src"],
          where: {
            id: { [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) }
          }
        }
      ]
    });
    const jsonUser = Object.assign({}, user.toJSON());
    jsonUser.Follow = jsonUser.Follow.sort((p, c) => {
      return c["id"] - p["id"];
    });
    jsonUser.Follow = jsonUser.Follow.slice(0, req.query.limit);
    return res.status(200).json(jsonUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//팔로워 목록 불러오기
router.get("/:id/follower", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          as: "Follower",
          attributes: ["id", "nickName", "src"],
          where: {
            id: { [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) }
          }
        }
      ]
    });
    const jsonUser = Object.assign({}, user.toJSON());
    jsonUser.Follower = jsonUser.Follower.sort((p, c) => {
      return c["id"] - p["id"];
    });
    jsonUser.Follower = jsonUser.Follower.slice(0, req.query.limit);
    return res.status(200).json(jsonUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//유저 게시글 불러오기
router.get("/:id/userPosts", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Post,
          where: {
            id: { [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) }
          },
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
    });
    if (user) {
      const jsonUser = Object.assign({}, user.toJSON());
      jsonUser.Posts = jsonUser.Posts.sort((p, c) => {
        return c["id"] - p["id"];
      });
      jsonUser.Posts = jsonUser.Posts.slice(0, req.query.limit);
      return res.status(200).json(jsonUser);
    } else {
      return res.status(200).json({ id: 0 });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//유저 저장 게시글 불러오기
router.get("/:id/userSavedPosts", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.PostStorage,
          where: {
            id: { [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) }
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
            }
          ]
        }
      ]
    });
    const jsonUser = Object.assign({}, user.toJSON());
    if (!jsonUser || !jsonUser.PostStorages[1]) {
      if (jsonUser) {
        return res.status(200).json(jsonUser);
      } else {
        return res.status(200).json({ id: 0 });
      }
    } else {
      jsonUser.PostStorages = jsonUser.PostStorages.sort((p, c) => {
        return c["id"] - p["id"];
      });
      jsonUser.PostStorages = jsonUser.PostStorages.slice(0, req.query.limit);
      return res.status(200).json(jsonUser);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
