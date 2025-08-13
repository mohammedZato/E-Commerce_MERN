const mongoose = require("mongoose");
const validator = require("validator");
const emailManager = require("../../Managers/emailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email } = req.body;

  if (!email) throw "Enter email";
  if (!validator.isEmail(email)) throw "Invalid Email";

  const getUser = await usersModel.findOne({
    email: email,
  });
  if (!getUser) throw "Email does not exist";

  const reset_code = Math.floor(1000 + Math.random() * 9000);

  emailManager(
    getUser.email,
    "Your reset code is " + reset_code,
    "Your reset code is " + reset_code,
    "Password Reset Code"
  );

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: reset_code,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "reset code sent successfully",
  });
};

module.exports = forgotPassword;
