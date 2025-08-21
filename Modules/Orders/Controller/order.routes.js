const express = require("express");
const createOrder = require("../createOrder");
const authHandler = require("../../../Middleware/authHandler");
const getAllOrders = require("../getAllOrders");
const getSingleOrder = require("../getSingleOrder");

const orderRoutes = express.Router();

orderRoutes.use(authHandler);

orderRoutes.post("/", createOrder);
orderRoutes.get("/my-orders", getAllOrders);
orderRoutes.get("/:orderId", getSingleOrder);

module.exports = orderRoutes;
