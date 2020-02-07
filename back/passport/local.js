const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "userId", passwordField: "password" },
      async (userId, password, done) => {
        try {
          const user = await db.User.findOne({
            where: { userId }
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않은 사용자입니다" });
          }
          const verifyPassword = await bcrypt.compare(password, user.password);
          if (!verifyPassword) {
            return done(null, false, { reason: "비밀번호가 틀립니다" });
          }
          return done(null, user);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
