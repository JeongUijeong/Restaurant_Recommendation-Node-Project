const mysql = require("../mysql");

// 메인 페이지
const main = async (req, res) => {
  try {
    // 테마 정보 select
    let theme = await mysql.query("themeSelectForMain");
    let theme_list = [...theme];
    res.status(200).json(theme_list);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "테마 정보를 불러오는 과정에서 오류가 발생했습니다. ",
    });
  }
};

// 테마 음식점 목록
const theme_list = async (req, res) => {
  try {
    let theme_list = [];
    // 해당 테마 정보 select
    let theme_info = await mysql.query(
      "themeSelectForThemeList",
      req.params.t_title
    );
    // 해당 테마 음식점 code, intro select
    let theme_restaurants = await mysql.query(
      "themeSelectByT_title",
      req.params.t_title
    );
    // r_code 리스트로 해당 음식점 정보 리스트 select
    for (i of theme_restaurants) {
      let restaurant = await mysql.query("restaurantSelectByR_Idx", i.r_Idx);
      // 검색 결과 음식점 정보 하나씩 배열에 삽입
      theme_list.push({
        r_Idx: restaurant[0].r_Idx,
        r_name: restaurant[0].r_name,
        image: restaurant[0].image.split(" ")[0],
        address: restaurant[0].address,
        star: restaurant[0].stars,
        intro: i.r_intro,
        options: {
          takeout: !!restaurant[0].takeout,
          parking: !!restaurant[0].parking,
        },
      });
    }
    res.status(200).json({
      t_title: theme_info[0].t_title,
      t_contents: theme_info[0].t_contents,
      r_info: theme_list,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "테마 정보를 불러오는 과정에서 오류가 발생했습니다. ",
    });
  }
};

module.exports = { main, theme_list };
