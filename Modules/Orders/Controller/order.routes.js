const express = require("express");
const createOrder = require("../createOrder");

const orderRoutes = express.Router();

orderRoutes.post("/", createOrder);

module.exports = orderRoutes;
