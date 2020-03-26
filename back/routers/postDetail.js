const express = require("express");

const router = express.Router();
const db = require("../models");

//게시글 좋아요
router.post("/like", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.body.postId } });
    await post.addLike(req.user.id);
    return res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//좋아요 취소
router.post("/likeRemove", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.body.postId } });
    await post.removeLike(req.user.id);
    return res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//댓글 추가
router.post("/addComment", async (req, res, next) => {
  try {
    const newComment = await db.Comment.create({
      content: req.body.comment,
      PostId: req.body.postId,
      UserId: req.user.id
    });
    const post = await db.Post.findOne({
      where: { id: req.body.postId }
    });
    await post.addComment(newComment.id);
    const returnComment = await db.Comment.findOne({
      where: { id: newComment.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickName", "src"]
        }
      ]
    });
    return res.json(returnComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//댓글 불러오기
router.get("/:id/comments", async (req, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        PostId: req.params.id,
        id: {
          [db.Sequelize.Op.gt]: req.query.lastId
        }
      };
    } else {
      where = {
        PostId: req.params.id
      };
    }
    const comments = await db.Comment.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["id", "nickName", "src"]
        }
      ],
      limit: parseInt(req.query.limit, 10)
    });
    return res.json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//modal 불러오기
router.get("/:id/loadModal", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["id", "nickName", "src"]
            }
          ],
          limit: 12
        },
        {
          model: db.User,
          as: "Like",
          attributes: ["id"]
        }
      ]
    });
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
