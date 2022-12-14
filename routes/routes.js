const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const likesController = require("../controllers/likesController");
const mypageController = require("../controllers/mypageController");
const restaurantsController = require("../controllers/restaurantsController");
const themesController = require("../controllers/themesController");
const commentsController = require("../controllers/commentsController");
const restaurantDetailController = require("../controllers/restaurantDetailController");

router.post("/signup", usersController.signup); // 회원 가입 라우팅
router.post("/signin", usersController.signin); // 로그인 라우팅
router.put("/user_edit", usersController.userEdit); // 회원 정보 수정 라우팅
router.post("/like", likesController.like); // 찜 등록 라우팅
router.delete("/like", likesController.dislike); // 찜 취소 라우팅
router.get("/mypage", mypageController.mypage); // 마이페이지 라우팅
router.get("/search/:search", restaurantsController.search); // 검색, 선택장애, 룰렛 라우팅
router.get("/list/:search", restaurantsController.search); // 재검색 라우팅
router.get("/category/:category", restaurantsController.category); // 카테고리 라우팅
router.get("/main", themesController.main); // 메인 페이지 라우팅
router.get("/theme_list/:t_title", themesController.theme_list); // 테마 목록 라우팅
router.post("/write", commentsController.write); // 댓글 저장 라우팅
router.get("/restaurant/:r_Idx", restaurantDetailController.restaurantDetail); // 음식점 상세 페이지 라우팅

module.exports = router;
