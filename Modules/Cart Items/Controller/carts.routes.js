const express = require("express");
const addToCart = require("../addToCart");
const authHandler = require("../../../Middleware/authHandler");

const cartsRoutes = express.Router();

cartsRoutes.use(authHandler);

cartsRoutes.post("/addtocart/:productId", addToCart);

module.exports = cartsRoutes;
