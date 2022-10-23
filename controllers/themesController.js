const mysql = require("../mysql");

const main = async (req, res) => {
  try {
    //테마 정보(테마 title, image) select
    let theme = await mysql.query("themeSelect");
    let theme_list = [...theme];
    res.status(200).json(theme_list);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "테마 정보를 불러오는 과정에서 오류가 발생했습니다. ",
    });
  }
};

module.exports = { main };
