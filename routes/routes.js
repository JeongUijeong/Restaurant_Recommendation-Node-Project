const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.post("/signup", userController.signup); //회원가입 라우팅
router.post("/signin", userController.signin); //로그인 라우팅

module.exports = router;
