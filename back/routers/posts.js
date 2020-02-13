const express = require("express");
const db = require("../models");

const router = express.Router();

//게시글 불러오기
router.get("/loadPosts", async (req, res, next) => {
  try {
    const myPosts = await db.Post.findAll({
      where: { UserId: req.user.id },
      limit: parseInt(req.query.limit, 10),
      order: [["createdAt", "DESC"]]
    });
    return res.json(myPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
