const express = require("express");
const authHandler = require("../../../Middleware/authHandler");
const getSingleProduct = require("../getSingleProduct");
const getAllProducts = require("../getAllProduct");
const authorizedRoles = require("../../../Middleware/authorizeRoles");

const productsRoutes = express.Router();

productsRoutes.get("/", getAllProducts);

productsRoutes.use(authHandler);

productsRoutes.get("/:productId", getSingleProduct);

productsRoutes.use(authorizedRoles);

module.exports = productsRoutes;
