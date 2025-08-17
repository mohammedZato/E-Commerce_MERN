const express = require("express");
const register = require("../register");
const login = require("../login");
const forgotPassword = require("../forgotPassword");
const resetPassword = require("../resetPassword");
const userDashboard = require("../userDashboard");
const authHandler = require("../../../Middleware/authHandler");
const seedAdmin = require("../seedAdmin");

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotpw", forgotPassword);
userRoutes.post("/resetpw", resetPassword);
userRoutes.post("/seedAdmin", seedAdmin);

userRoutes.use(authHandler);

userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;
