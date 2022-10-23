const mysql = require("../mysql");

// 찜 등록
const like = async (req, res) => {
  try {
    // 요청 헤더 내의 authorization 헤더에서 토큰 추출
    let token = req.headers.authorization.split("Bearer ")[1];
    let user = await mysql.query("userSelectByToken", token);
    await mysql.query("likeInsert", [user[0].u_Idx, req.body.r_Idx]);
    res.status(201).json({
      message: "찜 등록에 성공했습니다. ",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "찜 등록 중 오류가 발생했습니다. ",
    });
  }
};

// 찜 취소
const dislike = async (req, res) => {
  try {
    // 요청 헤더 내의 authorization 헤더에서 토큰 추출
    let token = req.headers.authorization.split("Bearer ")[1];
    let user = await mysql.query("userSelectByToken", token);
    await mysql.query("likeDelete", [user[0].u_Idx, req.body.r_Idx]);
    res.status(200).json({
      message: "찜 취소에 성공했습니다.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "찜 취소 중 오류가 발생했습니다. ",
    });
  }
};

module.exports = { like, dislike };
