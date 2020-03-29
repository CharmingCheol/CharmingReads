const express = require("express");

const router = express.Router();
const db = require("../models");

//게시글 좋아요
router.post("/:id/addLike", async (req, res, next) => {
  try {
    await db.Post.update(
      {
        likeCount: req.body.likeCount + 1
      },
      { where: { id: parseInt(req.params.id, 10) } }
    );
    const post = await db.Post.findOne({
      where: { id: parseInt(req.params.id, 10) }
    });
    await post.addLike(req.user.id);
    return res.json(req.user.id);

    // const post = await db.Post.update(
    //   {
    //     where: { id: 1 }
    //   },
    //   {
    //     likeCount: parseInt(req.body.likeCount, 10) + 1
    //   }
    // );

    // const post = await db.Post.update(
    //   {
    //     where: { id: req.body.postId }
    //   },
    //   { likeCount: req.body.likeCount + 1 }
    // );
    // return res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//좋아요 취소
router.post("/:id/removeLike", async (req, res, next) => {
  try {
    console.log("sdkjfhk", req.params.id, req.body.likeCount);
    await db.Post.update(
      {
        likeCount: req.body.likeCount - 1
      },
      { where: { id: parseInt(req.params.id, 10) } }
    );
    const post = await db.Post.findOne({
      where: { id: parseInt(req.params.id, 10) }
    });
    await post.removeLike(req.user.id);
    return res.json(req.user.id);

    // const post = await db.Post.findOne({ where: { id: req.body.postId } });
    // await post.removeLike(req.user.id);
    // return res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//댓글 추가
router.post("/:id/addComment", async (req, res, next) => {
  try {
    console.log(req.params.id, req.body);

    await db.Post.update(
      {
        commentCount: req.body.commentCount + 1
      },
      { where: { id: parseInt(req.params.id, 10) } }
    );

    const newComment = await db.Comment.create({
      content: req.body.comment,
      PostId: req.body.postId,
      UserId: req.user.id
    });

    const post = await db.Post.findOne({
      where: { id: parseInt(req.params.id, 10) }
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
          as: "Like"
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
