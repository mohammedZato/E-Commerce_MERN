const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const emailManager = require("../../Managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, reset_code, newPassword, confirm_newPassword } = req.body;

  if (!email) throw "Email is required";
  if (!reset_code) throw "Enter 5 digit reset code";
  if (!newPassword) throw "Enter New Password";
  if (!validator.isLength(newPassword, { min: 8 }))
    throw "Password must be at least 8 characters long.";
  if (!validator.matches(newPassword, /[A-Z]/, "g"))
    throw "Password must have at least one uppercase";
  if (newPassword !== confirm_newPassword) throw "Passwords do not match";

  const getUser = await usersModel.findOne({
    email: email,
  });
  if (reset_code !== getUser.reset_code) throw "Invalid reset code";

  const hashPassword = await bcrypt.hash(newPassword, 12);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  emailManager(
    getUser.email,
    "You have successfully resetted your new password",
    "You have successfully resetted your new password",
    "Password reset successful"
  );

  res.status(200).json({
    status: "password reset successful",
  });
};

module.exports = resetPassword;
