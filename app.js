require("express-async-errors");
require("dotenv").config();
const express = require("express");
const errorHandler = require("./Handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./Modules/Users/Controller/users.route");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb Connected Successfully");
  })
  .catch(() => {
    console.log("Mongodb Connection Failed");
  });

require("./Models/users.model");

app.use(express.json());
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server Started Successfully");
});
