const express = require("express");
const db = require("../models");

const router = express.Router();

//내가 쓴 게시글 불러오기
router.get("/loadPosts", async (req, res, next) => {
  try {
    let where = {};
    if (req.user && parseInt(req.user.id, 10)) {
      where = {
        UserId: parseInt(req.user.id, 10)
      };
    } else {
      where = {
        UserId: 0
      };
    }
    const myPosts = await db.Post.findAll({
      where,
      // include: [
      //   {
      //     model: db.User,
      //     as: "Like",
      //     attributes: ["id"]
      //   },
      //   {
      //     model: db.Comment,
      //     include: [
      //       {
      //         model: db.User,
      //         attributes: ["id", "nickName", "src"]
      //       }
      //     ]
      //   }
      // ],
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
      // include: [
      //   {
      //     model: db.User,
      //     as: "Like",
      //     attributes: ["id"]
      //   },
      //   {
      //     model: db.Comment,
      //     include: [
      //       {
      //         model: db.User,
      //         attributes: ["id", "nickName", "src"]
      //       }
      //     ]
      //   }
      // ],
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

module.exports = router;
