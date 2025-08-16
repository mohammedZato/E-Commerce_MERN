const express = require("express");
const authHandler = require("../../../Middleware/authHandler");
const addReview = require("../addReview");

const reviewsRoutes = express.Router();

reviewsRoutes.use(authHandler);

reviewsRoutes.post("/addReview", addReview);

module.exports = reviewsRoutes;
