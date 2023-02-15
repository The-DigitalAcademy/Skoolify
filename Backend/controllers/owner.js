const client = require("../config/db_config");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const sender = "skoolify@outlook.com";

var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "skoolify@outlook.com", //
    pass: "Letsdoit!", //
  },
});

emailDetails = {
  from: "", //where the email is from
  to: "", //where the email is to
  subject: "", //email subject
  text: "", //email
};
