const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploadPost");
    },
    filename: (req, file, cb) => {
      const extName = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, extName);
      cb(null, baseName + new Date().valueOf() + extName);
    }
  }),
  limits: { fileSize: 1024 * 1024 * 20 }
});

router.post(
  "/loadPostImage",
  upload.single("image"),
  async (req, res, next) => {
    try {
      return res.json(req.file);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
