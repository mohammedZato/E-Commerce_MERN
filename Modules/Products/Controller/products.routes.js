const express = require("express");
const authHandler = require("../../../Middleware/authHandler");
const getSingleProduct = require("../getSingleProduct");
const getAllProducts = require("../getAllProduct");

const productsRoutes = express.Router();

productsRoutes.get("/:productId", getSingleProduct);
productsRoutes.get("/", getAllProducts);

productsRoutes.use(authHandler);

module.exports = productsRoutes;
