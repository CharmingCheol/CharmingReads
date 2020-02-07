const express = require("express");
const router = express.Router();
const { postSignUp, postLogIn } = require("../controllers/user");

router.post("/signUp", postSignUp, postLogIn);
router.post("/logIn", postLogIn);

module.exports = router;
