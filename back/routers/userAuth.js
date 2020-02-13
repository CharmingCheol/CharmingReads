const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const db = require("../models");

const router = express.Router();

router.post("/signUp", async (req, res, next) => {
  try {
    const findUser = await db.User.findOne({
      where: { userId: req.body.userId }
    });
    if (findUser) {
      return res.status(403).send("이미 가입 된 아이디입니다");
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await db.User.create({
      userId: req.body.userId,
      nickName: req.body.nickName,
      password: hashPassword
    });
    return res.status(200).send("회원가입 성공");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/logIn", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.logIn(user, async error => {
      try {
        if (error) {
          return next(error);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
              attributes: ["id"]
            }
          ],
          attributes: ["id", "userId", "nickName"]
        });
        return res.json(fullUser);
      } catch (error) {
        console.error(error);
        next(error);
      }
    });
  })(req, res, next);
});

router.post("/logOut", (req, res, next) => {
  req.logOut();
  req.session.destroy();
  return res.send("Logout 성공");
});

module.exports = router;
