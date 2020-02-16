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

module.exports = router;
