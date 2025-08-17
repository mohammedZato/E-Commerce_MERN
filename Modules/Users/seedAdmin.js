const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwtManager = require("../../Managers/jwtManager");
const emailManager = require("../../Managers/emailManager");

const seedAdmin = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { username, email, password, confirm_password, role, phone } = req.body;

  if (!username) throw "Username is required";
  if (!email) throw "Email is required";
  if (!password) throw "Password is required";
  if (!phone) throw "Enter phone number";
  if (!validator.isLength(password, { min: 8 }))
    throw "Password must be at least 8 characters long.";
  if (!validator.matches(password, /[A-Z]/, "g"))
    throw "Password must have at least one uppercase";
  if (password !== confirm_password) throw "Passwords do not match";

  const existingAdmin = await usersModel.findOne({
    email: email,
  });
  if (existingAdmin) throw "Admin already exists";

  const hashedPassword = await bcrypt.hash(password, 12);

  const newAdmin = await usersModel.create({
    username: username,
    email: email,
    password: hashedPassword,
    role: role,
    phone: phone,
  });

  const accessToken = jwtManager(newAdmin);

  emailManager(
    newAdmin.email,
    "You successfully registered as an Administrator",
    "You successfully registered as an Administrator",
    "Administrator Roles"
  );

  res.status(200).json({
    status: "seed administrator registered",
    newAdmin,
    accessToken,
  });
};

module.exports = seedAdmin;
