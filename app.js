require("express-async-errors");
require("dotenv").config();
const express = require("express");
const errorHandler = require("./Handlers/errorHandler");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb Connected Successfully");
  })
  .catch(() => {
    console.log("Mongodb Connection Failed");
  });

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server Started Successfully");
});
