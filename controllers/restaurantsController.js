const mysql = require("../mysql");

// 검색, 선택장애, 룰렛
const search = async (req, res) => {
  try {
    let result = [];
    // 검색 키워드에 해당하는 음식점 리스트 select
    let search_result = await mysql.query("restaurantSelectBySearch", [
      "%" + req.params.search + "%",
      "%" + req.params.search + "%",
    ]);
    for (i of search_result) {
      // 검색 결과 음식점 댓글 개수 select
      let c_sum = await mysql.query("c_sumSelectByR_Idx", i.r_Idx);
      // 검색 결과 음식점 정보 하나씩 배열에 삽입
      result.push({
        r_Idx: i.r_Idx,
        r_name: i.r_name,
        image: i.image.split(" ")[0],
        address: i.address,
        star: i.stars,
        c_sum: c_sum[0].c_sum,
        price: i.price,
        options: {
          takeout: !!i.takeout,
          parking: !!i.parking,
        },
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "검색 로딩중 오류가 발생했습니다. ",
    });
  }
};

module.exports = { search };
