const express = require("express");
const router = require("./routes/routes");

const app = express();

app.listen(3000, () => {
  console.log("Server stared. port 3000.");
});

app.use("/", router);
