const express = require("express");
const createOrder = require("../createOrder");
const authHandler = require("../../../Middleware/authHandler");

const orderRoutes = express.Router();

orderRoutes.use(authHandler);

orderRoutes.post("/", createOrder);

module.exports = orderRoutes;
