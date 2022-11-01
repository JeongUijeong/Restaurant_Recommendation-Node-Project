const mysql = require("../mysql");

// 검색, 선택장애, 룰렛
const search = async (req, res) => {
  try {
    let result = [];
    // 검색 키워드에 해당하는 음식점 리스트 select
    let search_result = await mysql.query("restaurantSelectForSearch", [
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

// 카테고리
const category = async (req, res) => {
  try {
    let category_list;
    let result = [];
    //카테고리에 맞는 음식점 리스트 select
    switch (req.params.category) {
      case "한식":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%한식%",
          "%한식%",
        ]);
        break;
      case "중국식":
        category_list = categoryList = await mysql.query(
          "restaurantSelectByCategory",
          ["%중국식%", "%중국식%"]
        );
        break;
      case "일식":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%일식%",
          "%일식%",
        ]);
        break;
      case "뷔페식":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%뷔페%",
          "%뷔페%",
        ]);
        break;
      case "경양식":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%경양식%",
          "%경양식%",
        ]);
        break;
      case "찜탕":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%찜%",
          "%탕%",
        ]);
        break;
      case "족발보쌈":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%족발%",
          "%보쌈%",
        ]);
        break;
      case "회":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%회%",
          "%스시%",
        ]);
        break;
      case "고기구이":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%고기구이%",
          "%숯불구이%",
        ]);
      case "국수":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%국수%",
          "%면%",
        ]);
        break;
      case "치킨":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%치킨%",
          "%닭튀김%",
        ]);
        break;
      case "분식":
        category_list = await mysql.query("restaurantSelectForCategory", [
          "%분식%",
          "%분식%",
        ]);
        break;
      default:
        res.status(400).json({
          error: "잘못된 요청입니다. ",
        });
        return;
    }
    for (i of category_list) {
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
      error: "카테고리 로딩중 오류가 발생했습니다. ",
    });
  }
};

module.exports = { search, category };
