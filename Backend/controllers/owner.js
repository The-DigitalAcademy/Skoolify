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

exports.viewRequests = (req, res) => {
    const sql = "SELECT * FROM school WHERE is_deleted = false";
  
    client.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Error fetching owners" });
      } else {
        res.status(200).json(results.rows);
      }
    });
  };