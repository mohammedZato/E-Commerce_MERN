const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwtManager = require("../../Managers/jwtManager");
const emailManager = require("../../Managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { username, email, password, confirm_password, phone } = req.body;

  if (!username) throw "Username is required";
  if (!email) throw "Email is required";
  if (!password) throw "Password is required";
  if (!phone) throw "Enter phone number";
  if (!validator.isLength(password, { min: 8 }))
    throw "Password must be at least 8 characters long.";
  if (!validator.matches(password, /[A-Z]/, "g"))
    throw "Password must have at least one uppercase";
  if (password !== confirm_password) throw "Passwords do not match";

  const getUser = await usersModel.findOne({
    email: email,
  });
  if (getUser) throw "Email already exists! Please log in";

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await usersModel.create({
    username: username,
    email: email,
    password: hashedPassword,
    phone: phone,
  });

  const accessToken = jwtManager(newUser);

  emailManager(
    newUser.email,
    "You successfully registered for an update of job vacancies on our website",
    "You successfully registered for an update of job vacancies on our website",
    "Job Vacancies"
  );

  res.status(200).json({
    status: "Registered successfully",
    newUser,
    accessToken,
  });
};

module.exports = register;
