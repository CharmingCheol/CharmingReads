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
      rating: req.body.star,
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
router.post("/loadComments", async (req, res, next) => {
  try {
    const comments = await db.Comment.findAll({
      where: { PostId: req.body.postId },
      // attributes: ["id", "content", "rating", "UserId"],
      include: [
        {
          model: db.User,
          attributes: ["id", "nickName", "src"]
        }
      ]
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
          ]
        },
        {
          model: db.User,
          as: "Like",
          attributes: ["id"]
        }
      ]
    });
    const returnPost = Object.assign({}, post.toJSON());
    delete returnPost.User.password;
    return res.status(200).json(returnPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
