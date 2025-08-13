const express = require("express");
const register = require("../register");
const login = require("../login");

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);

module.exports = userRoutes;
