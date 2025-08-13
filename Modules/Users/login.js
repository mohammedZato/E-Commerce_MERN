const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwtManager = require("../../Managers/jwtManager");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, password } = req.body;

  if (!email) throw "Email is required";
  if (!password) throw "Password is required";
  if (!validator.isEmail(email)) throw "Invalid Email";
  if (!validator.isLength(password, { min: 8 }))
    throw "Password must be at least 8 characters long.";
  if (!validator.matches(password, /[A-Z]/, "g"))
    throw "Password must have at least one uppercase";

  const getUser = await usersModel.findOne({
    email: email,
  });
  if (!getUser) throw "Email does not exist. Please Sign Up";

  const comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Incorrect Password. Try Again";

  const accessToken = jwtManager(getUser);

  res.status(200).json({
    status: "login successful",
    accessToken,
  });
};

module.exports = login;
