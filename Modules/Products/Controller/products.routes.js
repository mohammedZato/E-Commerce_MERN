const express = require("express");
const authHandler = require("../../../Middleware/authHandler");
const getSingleProduct = require("../getSingleProduct");
const getAllProducts = require("../getAllProduct");

const productsRoutes = express.Router();

productsRoutes.use(authHandler);

productsRoutes.get("/:productId", getSingleProduct);
productsRoutes.get("/", getAllProducts);

module.exports = productsRoutes;
