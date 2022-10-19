const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/signup", usersController.signup); // 회원가입 라우팅
router.post("/signin", usersController.signin); // 로그인 라우팅

module.exports = router;
