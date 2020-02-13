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

router.post("/uploadImage", upload.single("image"), async (req, res, next) => {
  try {
    return res.json(req.file);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
