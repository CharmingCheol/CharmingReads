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
      "asldfhsdifjsiohioshigodhio"
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

module.exports = router;
