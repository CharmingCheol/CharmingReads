const passport = require("passport");
const db = require("../models");
const local = require("./local");
const kakao = require("./kakao");

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        include: [
          {
            model: db.Post,
            attributes: ["id"]
          },
          {
            model: db.PostStorage,
            attributes: ["postId"]
          },
          {
            model: db.User,
            as: "Follower",
            attributes: ["id"]
          },
          {
            model: db.User,
            as: "Follow",
            attributes: ["id"]
          }
        ]
      });
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  local();
  kakao();
};
