const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT ?? 3333;
const app = express();

app.get("/", (req, res) => {
  res.end("Web academy");
});

app.listen(PORT, () => {
  console.log(`servidor escutando a porta ${PORT}`);
});     