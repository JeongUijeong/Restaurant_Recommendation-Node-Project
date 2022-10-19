const express = require("express");
const router = require("./routes/routes");

const app = express();

// 클라이언트 요청 body를 json으로 파싱 처리
app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("Server stared. port 3000.");
});

app.use("/", router);
