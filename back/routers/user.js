const express = require("express");
const router = express.Router();
const { signUp, logIn, logOut } = require("../controllers/user");

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/logOut", logOut);

module.exports = router;
