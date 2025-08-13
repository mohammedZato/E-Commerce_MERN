const nodemailer = require("nodemailer");

const emailManager = (email, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "12e3ffeaa8bbec",
      pass: "b5d7b13ee4bfa4",
    },
  });

  transport.sendMail({
    to: email,
    from: "infoanalytics@yahoo.com",
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
