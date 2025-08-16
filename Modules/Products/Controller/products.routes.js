const express = require("express");
const authHandler = require("../../../Middleware/authHandler");
const getSingleProduct = require("../getSingleProduct");
const getAllProducts = require("../getAllProduct");
const authorizedRoles = require("../../../Middleware/authorizeRoles");
const addProduct = require("../addProduct");
const deleteProduct = require("../deleteProduct");

const productsRoutes = express.Router();

//public routes
productsRoutes.get("/", getAllProducts);
productsRoutes.get("/:productId", getSingleProduct);

//middlewares
productsRoutes.use(authHandler);
productsRoutes.use(authorizedRoles("admin"));

//protected routes
productsRoutes.post("/addProduct", addProduct);
productsRoutes.delete("/:productId", deleteProduct);

module.exports = productsRoutes;
