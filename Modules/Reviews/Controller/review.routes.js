const express = require("express");
const authHandler = require("../../../Middleware/authHandler");
const addReview = require("../addReview");
const deleteReview = require("../deleteReview");
const authorizedRoles = require("../../../Middleware/authorizeRoles");

const reviewsRoutes = express.Router();

reviewsRoutes.use(authHandler);
reviewsRoutes.use(authorizedRoles("admin", "user"));

reviewsRoutes.post("/:productId/addReview", addReview);
reviewsRoutes.delete("/:reviewId/deleteReview", deleteReview);

module.exports = reviewsRoutes;
