const passport = require("passport");
const { Strategy: KakaoStrategy } = require("passport-kakao");
const dotenv = require("dotenv");

const db = require("../models");
dotenv.config();

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "http://localhost:3000/auth/kakao/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("asfgead");
        // try {
        //   const user = await db.findOne({
        //     where: { snsId: profile.id, provider: "kakao" }
        //   });
        //   if (user) {
        //     done(null, user);
        //   } else {
        //     const newUser = await db.create({
        //       email: profile._json && profile._jso.kaccount_email,
        //       nick: profile.displayName,
        //       snsId: profile.id,
        //       provider: "kakao"
        //     });
        //     done(null, newUser);
        //   }
        // } catch (error) {
        //   console.error(error);
        //   done(error);
        // }
      }
    )
  );
};
