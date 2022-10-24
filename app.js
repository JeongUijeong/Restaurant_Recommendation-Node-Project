const express = require("express");
const router = require("./routes/routes");
require("dotenv").config({ path: ".env" });
const app = express();
const fs = require("fs");
const jsonFile = fs.readFileSync("./data.json", "utf8");
const jsonData = JSON.parse(jsonFile);
const mysql = require("./mysql");
const cors = require("cors");

const corsOptions = {
  origin: "*", // 허용할 도메인
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// 클라이언트 요청 body를 json으로 파싱 처리
app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(80, () => {
  console.log("Server stared. port 80.");
});

const baseData = async () => {
  try {
    let data = await mysql.query("restaurantSelect");
    if (!data[0]) {
      // 음식점 데이터가 없을 때만 실행
      for (let i = 0; i < jsonData.data.length; i++) {
        if (jsonData.data[i].star === "NULL") {
          jsonData.data[i].star = 0;
        }
        mysql.query("restaurantInsert", [
          i,
          jsonData.data[i].restaurant_name,
          jsonData.data[i].img,
          jsonData.data[i].address,
          jsonData.data[i].tag,
          jsonData.data[i].price,
          jsonData.data[i].star,
          jsonData.data[i].options.parking,
          jsonData.data[i].options.takeout,
        ]);
      }
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

baseData();

app.use("/", router);
