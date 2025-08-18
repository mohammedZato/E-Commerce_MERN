const express = require("express");
const addToCart = require("../addToCart");
const authHandler = require("../../../Middleware/authHandler");
const removeFromCart = require("../removeFromCart");

const cartsRoutes = express.Router();

cartsRoutes.use(authHandler);

cartsRoutes.post("/addtocart/:productId", addToCart);
cartsRoutes.delete("/removefromcart/:cartitemId", removeFromCart);

module.exports = cartsRoutes;
