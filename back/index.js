const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const passportConfig = require("./passport");
const userAuthRouter = require("./routers/userAuth");
const userDetailRouter = require("./routers/userDetail");
const kakaoRouter = require("./routers/kakao");
const postRouter = require("./routers/post");
const postDetailRouter = require("./routers/postDetail");
const loadPostsRouter = require("./routers/posts");
const db = require("./models");

const app = express();
const port = 3001;
db.sequelize.sync();
dotenv.config();
passportConfig();

app.use("/", express.static("upload"));
app.use("/", express.static("uploadPost"));
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userAuthRouter);
app.use("/user", userDetailRouter);
app.use("/auth", kakaoRouter);
app.use("/post", postRouter);
app.use("/posts", loadPostsRouter);
app.use("/post", postDetailRouter);

app.listen(port, () => {
  console.log(`server start : ${port}`);
});
