var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

// const sender = "skoolify.sgb@gmail.com";

// var transporter = nodemailer.createTransport({
//   host:'smtp.gmail.com',
//   port:465,
//   secure: true,
//   auth: {
//     user: "skoolify.sgb@gmail.com", //
//     pass: "Letsdoit!", //
//   },
// });

const sender = "skoolify@outlook.com";

var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "skoolify@outlook.com", //
    pass: "Letsdoit!", //
  },
});

transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

module.exports = transporter,sender;