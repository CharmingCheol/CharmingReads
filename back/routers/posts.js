const express = require("express");
const db = require("../models");

const router = express.Router();

//메인 화면 게시글 불러오기
router.get("/loadPosts", async (req, res, next) => {
  try {
    const myPosts = await db.Post.findAll({
      where: { UserId: req.user.id },
      include: [
        {
          model: db.User,
          as: "Like",
          attributes: ["id"]
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["id", "nickName", "src"]
            }
          ]
        }
      ],
      limit: parseInt(req.query.limit, 10),
      order: [["createdAt", "DESC"]]
    });
    return res.json(myPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//카테고리별 게시글 불러오기
router.get("/:word", async (req, res, next) => {
  try {
    console.log(
      req.query.lastId,
      req.query.limit,
      decodeURIComponent(req.params.word),
      "시작부분"
    );
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        },
        category: {
          [db.Sequelize.Op.like]: decodeURIComponent(req.params.word)
        }
      };
    } else {
      where = {
        category: {
          [db.Sequelize.Op.like]: decodeURIComponent(req.params.word)
        }
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          as: "Like",
          attributes: ["id"]
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["id", "nickName", "src"]
            }
          ]
        }
      ],
      limit: parseInt(req.query.limit, 10),
      order: [["createdAt", "DESC"]]
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//게시글 검색
router.get("/search/:word", async (req, res, next) => {
  try {
    console.log(
      "dsfsdfsdfdsfsdfsd",
      decodeURIComponent(req.params.word.trim()),
      req.query.lastId,
      req.query.limit
    );
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        title: {
          [db.Sequelize.Op.regexp]: decodeURIComponent(req.params.word.trim())
        },
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    } else {
      where = {
        title: {
          [db.Sequelize.Op.regexp]: decodeURIComponent(req.params.word.trim())
        }
      };
    }
    const posts = await db.Post.findAll({
      where,
      limit: parseInt(req.query.limit, 10),
      order: [["createdAt", "DESC"]]
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//팔로우 게시글 불러오기
router.get("/follow/:id", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
      },
      include: [
        {
          model: db.User,
          as: "Follow",
          attributes: ["id"]
        }
      ]
    });
    const test = Object.assign({}, user.toJSON());
    let followId = []; //유저 팔로우 id를 담은 배열
    test.Follow.forEach(follow => followId.push(follow.id));
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        UserId: {
          [db.Sequelize.Op.or]: followId
        },
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    } else {
      where = {
        UserId: {
          [db.Sequelize.Op.or]: followId
        }
      };
    }
    const posts = await db.Post.findAll({
      where,
      limit: parseInt(req.query.limit, 10),
      order: [["createdAt", "DESC"]]
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
