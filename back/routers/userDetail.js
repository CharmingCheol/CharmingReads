const express = require("express");
const router = express.Router();

const db = require("../models");

router.post("/edit", async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
