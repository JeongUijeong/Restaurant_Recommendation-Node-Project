const crypto = require("crypto");
const mysql = require("../mysql");
const jwt = require("jsonwebtoken");

const idCheck = /^[0-9a-zA-Z]{1,15}$/g; // 영대소문자, 숫자 최대 15글자
const pwCheck = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])([a-zA-Z0-9]){8,15}$/g; // 영대소문자, 숫자 조합 최소 8자 최대 15자
const nicknameCheck = /^[0-9a-zA-Z가-힣]{1,15}$/g; // 한글, 영대소문자, 숫자 최대 15글자

// 회원 가입
const signup = async (req, res) => {
  try {
    // 전역 탐색 이후 lastIndex가 바뀜 => true, false가 반복되는 문제 생김 => lastIndex 초기화
    idCheck.lastIndex = 0;
    pwCheck.lastIndex = 0;
    nicknameCheck.lastIndex = 0;

    if (!idCheck.test(req.body.id)) {
      res.status(400).json({ error: "아이디 양식이 다릅니다. " });
      return;
    }
    if (!pwCheck.test(req.body.pw)) {
      res.status(400).json({ error: "비밀번호 양식이 다릅니다. " });
      return;
    }
    if (!nicknameCheck.test(req.body.nickname)) {
      res.status(400).json({ error: "닉네임 양식이 다릅니다. " });
      return;
    }
    // id 중복 확인
    let user = await mysql.query("userSelectById", req.body.id);
    if (user[0]) {
      // 반환 데이터가 있다면 이미 존재하는 id
      res.status(409).json({
        error: "이미 존재하는 아이디입니다.",
      });
      return;
    } else {
      // 해시 암호화
      let salt = Math.round(new Date().valueOf() * Math.random()) + "";
      let hashed_pw = crypto
        .createHash("sha512")
        .update(req.body.pw + salt)
        .digest("hex");

      // 회원 정보 저장
      await mysql.query("userInsert", {
        id: req.body.id,
        nickname: req.body.id,
        pw: hashed_pw,
        salt: salt,
      });
      res.status(200).json({ message: "회원가입이 완료되었습니다." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "회원가입 중 오류가 발생했습니다." });
  }
};

// 로그인
const signin = async (req, res) => {
  try {
    let user = await mysql.query("userSelectById", req.body.id);
    if (!user[0]) {
      // 일치하는 id가 없는 경우
      res.status(400).json({
        error: "존재하지 않는 아이디 입니다.",
      });
      return;
    }
    let db_pw = user[0].pw;
    let salt = user[0].salt;
    let hashed_pw = crypto
      .createHash("sha512")
      .update(req.body.pw + salt)
      .digest("hex");
    // 비밀번호 일치 확인
    if (db_pw === hashed_pw) {
      // 토큰 생성
      let token = jwt.sign({ id: req.body.id }, process.env.JWT_SECRET);
      // 토큰 정보 update
      await mysql.query("userUpdateById", [{ token: token }, req.body.id]);
      res.status(200).json({
        message: "로그인에 성공하였습니다",
        token,
      });
    } else {
      res.status(500).json({ message: "잘못된 비밀번호 입니다" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "로그인 중 오류가 발생했습니다. ",
    });
  }
};

// 회원 정보 수정
const userEdit = async (req, res) => {
  try {
    // 요청 헤더 내의 authorization 헤더에서 토큰 추출
    let token = req.headers.authorization.split("Bearer ")[1];
    // 양식 검사
    pwCheck.lastIndex = 0;
    nicknameCheck.lastIndex = 0;
    if (!pwCheck.test(req.body.pw)) {
      res.status(400).json({ error: "비밀번호 양식이 다릅니다. " });
      return;
    }
    if (!nicknameCheck.test(req.body.nickname)) {
      res.status(400).json({ error: "닉네임 양식이 다릅니다. " });
      return;
    }
    // 해시 암호화
    let salt = Math.round(new Date().valueOf() * Math.random()) + "";
    let hashed_pw = crypto
      .createHash("sha512")
      .update(req.body.pw + salt)
      .digest("hex");
    // 회원 정보 수정 사항 update
    await mysql.query("userUpdateByToken", [
      { nickname: req.body.nickname, pw: hashed_pw, salt: salt },
      token,
    ]);
    res.status(201).json({
      message: "개인 정보 수정 성공",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "수정 중 오류 발생했습니다. ",
    });
  }
};

module.exports = { signup, signin, userEdit };
