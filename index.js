require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use("/", require('./routes/forgot-password'));

app.get("/status", (req, res) => {
  res.send("This API is running live🥳");
});
app.listen(8080, console.log)