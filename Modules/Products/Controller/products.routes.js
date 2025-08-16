const express = require("express");
const authHandler = require("../../../Middleware/authHandler");
const getSingleProduct = require("../getSingleProduct");

const productsRoutes = express.Router();

productsRoutes.use(authHandler);

productsRoutes.get("/:productId", getSingleProduct);

module.exports = productsRoutes;
