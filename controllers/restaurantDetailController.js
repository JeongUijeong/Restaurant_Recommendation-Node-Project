const mysql = require("../mysql");

const restaurantDetail = async (req, res) => {
  try {
    let like = false; // 찜 여부
    let comments = [];
    let mycomment;
    if (req.headers.authorization != undefined) {
      // 로그인 한 경우
      // 요청 헤더 내의 authorization 헤더에서 토큰 추출
      let token = req.headers.authorization.split("Bearer ")[1];
      // 토큰과 일치하는 user select
      let user = await mysql.query("userSelectByToken", token);
      // 해당 음식점을 찜했는지 확인
      await mysql
        .query(
          "likeSelectForRestaurantDetail"[(user[0].u_Idx, req.params.r_Idx)]
        )
        .then((result) => {
          if (!result[0]) {
            like = false;
          } else {
            like = true;
          }
        });
      // 해당 user가 남긴 댓글 정보 select
      let mycommentInfo = await mysql.query(
        "commentSelectForRestaurantDetail",
        [user[0].u_Idx, req.params.r_Idx]
      );
      if (mycommentInfo[0]) {
        mycomment = {
          star: mycommentInfo[0].star,
          title: mycommentInfo[0].c_title,
          content: mycommentInfo[0].c_content,
          time: mycommentInfo[0].updatedAt,
        };
      } else {
        // 남긴 댓글이 없는 경우
        mycomment = {
          star: 0,
          title: "",
          content: "",
          time: "",
        };
      }
    } else {
      // 게스트인 경우
      mycomment = {
        star: 0,
        title: "",
        content: "",
        time: "",
      };
    }
    // 해당 음식점 정보 select
    let restaurant = await mysql.query(
      "restaurantSelectByR_Idx",
      req.params.r_Idx
    );
    // 이미지 url 두개 나누기
    let img_list = restaurant[0].image.split(" ");
    // 해당 음식점에 남긴 댓글 전부 select
    let comment_list = await mysql.query(
      "commentSelectByR_Idx",
      req.params.r_Idx
    );
    for (const i of comment_list) {
      let comment_user = await mysql.query("userSelectByU_Idx", i.u_Idx);
      // 댓글 정보 배열에 하나씩 삽입
      comments.push({
        nickname: comment_user[0].nickname,
        star: i.star,
        c_title: i.c_title,
        c_content: i.c_contents,
        createdAt: i.updatedAt,
      });
    }
    res.status(200).json({
      r_Idx: restaurant[0].r_code,
      restaurant_name: restaurant[0].r_name,
      img_list: img_list,
      address: restaurant[0].address,
      like: like,
      star: restaurant[0].stars,
      price: restaurant[0].price,
      options: {
        takeout: !!restaurant[0].takeout,
        parking: !!restaurant[0].parking,
      },
      comments,
      mycomment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "상세페이지 로딩중 오류가 발생했습니다. ",
    });
  }
};

module.exports = { restaurantDetail };
