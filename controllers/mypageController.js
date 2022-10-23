const mysql = require("../mysql");

const mypage = async (req, res) => {
  try {
    let token = req.headers.authorization.split("Bearer ")[1];
    let user = await mysql.query("userSelectByToken", token);
    let like_list = [];
    r_Idxs = await mysql.query("likeSelect", user[0].u_Idx);
    for (i of r_Idxs) {
      let restaurant = await mysql.query("restaurantSelectByR_Idx", i.r_Idx);
      like_list.push({
        r_Idx: restaurant[0].r_Idx,
        r_name: restaurant[0].r_name,
        image: restaurant[0].image,
        address: restaurant[0].address,
        options: {
          takeout: !!restaurant[0].takeout,
          parking: !!restaurant[0].parking,
        },
      });
    }
    res.status(200).json({
      nickname: user[0].nickname,
      like_list: like_list,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "마이페이지 로딩 중 오류가 발생했습니다. ",
    });
  }
};

module.exports = { mypage };
