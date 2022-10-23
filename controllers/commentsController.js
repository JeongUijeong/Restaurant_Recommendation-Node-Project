const mysql = require("../mysql");

// 댓글 저장
const write = async (req, res) => {
  try {
    // 요청 헤더 내의 authorization 헤더에서 토큰 추출
    let token = req.headers.authorization.split("Bearer ")[1];
    // 토큰과 일치하는 user id select
    let user = await mysql.query("userSelectByToken", token);
    // 사용자가 해당 음식점에 남긴 댓글이 있는지 확인
    let userComment = await mysql.query("commentSelectByU_Idx", user[0].u_Idx);
    if (userComment[0]) {
      res.status(400).json({
        error: "이미 댓글을 남기셨습니다. ",
      });
      return;
    }
    let old_stars = 0;
    let c_sum = 0;
    await mysql
      .query("restaurantSelectByR_Idx", req.body.r_Idx)
      .then((result) => {
        old_stars = result[0].stars;
      });
    await mysql.query("c_sumSelectByR_Idx", req.body.r_Idx).then((result) => {
      c_sum = result[0].c_sum;
    });
    //평점 계산
    let new_stars =
      (old_stars * c_sum + req.body.comments.star) / (c_sum + 1.0);
    //댓글 저장
    await mysql.query("commentInsert", [
      req.body.r_Idx,
      user[0].u_Idx,
      req.body.comments.c_title,
      req.body.comments.c_contents,
      req.body.comments.star,
    ]);
    //음식점 별점 수정
    await mysql.query("restaurantUpdate", [
      { stars: new_stars },
      req.body.r_Idx,
    ]);
    res.status(201).json({
      message: "댓글 저장 성공",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "댓글 저장 중 오류가 발생했습니다. ",
    });
  }
};

module.exports = { write };
