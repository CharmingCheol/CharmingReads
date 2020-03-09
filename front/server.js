const express = require("express");
const next = require("next");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const PORT = 3000;

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();
  server.use(morgan("dev"));
  server.use("/", express.static(path.join(__dirname, "public")));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
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

  server.get("/book/:id", (req, res) => {
    return app.render(req, res, "/book", { id: req.params.id });
  });

  server.get("/user/:id", (req, res) => {
    return app.render(req, res, "/user", { id: req.params.id });
  });

  server.get("/explore/:word", (req, res) => {
    return app.render(req, res, "/explore/", { word: req.params.word });
  });

  server.get("/explore/category/:word", (req, res) => {
    return app.render(req, res, "/explore/category", { word: req.params.word });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`next+express running on port ${PORT}`);
  });
});
