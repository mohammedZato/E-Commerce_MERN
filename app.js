require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./Handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./Modules/Users/Controller/users.route");
const productsRoutes = require("./Modules/Products/Controller/products.routes");
const reviewsRoutes = require("./Modules/Reviews/Controller/review.routes");
const cartsRoutes = require("./Modules/Cart Items/Controller/carts.routes");
const orderRoutes = require("./Modules/Orders/Controller/order.routes");

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb Connected Successfully");
  })
  .catch(() => {
    console.log("Mongodb Connection Failed");
  });

require("./Models/users.model");
require("./Models/products.model");
require("./Models/review.model");
require("./Models/cartItems.model");
require("./Models/order.model");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/cart", cartsRoutes);
app.use("/api/orders", orderRoutes);
app.all("/", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "Error!! Page Not Found",
  });
});

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server Started Successfully");
});
