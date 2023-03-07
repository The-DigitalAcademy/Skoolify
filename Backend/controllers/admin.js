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

exports.viewSchools = (req, res) => {
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

exports.viewSchool = (req, res) => {
  const school_id = req.params.school_id;
  const sql = "SELECT * FROM school WHERE school_id = $1";

  client.query(sql, [school_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching school" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

exports.viewSchoolTransporters = (req, res) => {
  const school_id = req.params.school_id;
  const sql = "SELECT * FROM vehicle_owner WHERE school_id = $1";

  client.query(sql, [school_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching school" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.verifiedOwners = (req, res) => {
  const sql = "SELECT * FROM vehicle_owner v, users u WHERE v.owner_id = u.user_id AND u.is_suspended = false";
  client.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching school" });
    } else {
      res.status(200).json(results.rows);
    }
  });

}

exports.addSchool = (req, res) => {
  const { school_name, school_location } = req.body;
  const sql =
    "INSERT INTO school (school_name,school_location,is_deleted) values($1,$2,$3)";

  client.query(sql, [school_name, school_location, false], (err, results) => {
    if (err) {
      res.status(401).json({ message: "Error inserting school" });
    } else {
      res.status(201).json({ message: "School successfully added" });
    }
  });
};

exports.removeSchool = (req, res) => {
  const school_id = req.params.school_id;
  const sql = "UPDATE school SET is_deleted = $1 WHERE school_id = $2";

  client.query(sql, [true, school_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "Error deleting school" });
    } else {
      res.status(201).json({ message: "School successfully deleted" });
    }
  });
};

exports.viewAllOwners = (req, res) => {
  const sql = "SELECT * FROM users WHERE account = 'OWNER'";

  client.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching owners" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.viewTopRated = (req, res) => {
  const sql = "SELECT * FROM users WHERE account = 'OWNER' AND is_suspended = false ORDER BY ratings DESC LIMIT 4 ";

  client.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching owners" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.viewAllApplications = (req, res) => {
  const sql = "SELECT * FROM application WHERE status = 'PENDING'";

  client.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching applications" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
exports.viewApplication = (req, res) => {
  const application_id = req.params.application_id;
  const applicationSql = "SELECT * FROM application WHERE application_id = $1";
  const ownerSql = "SELECT * FROM users WHERE user_id = $1";
  const vehicleSql = "SELECT * FROM vehicle WHERE vehicle_id = $1";
  const schoolSql = "SELECT * FROM school WHERE school_id = $1";

  client.query(applicationSql, [application_id], (err, applications) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching application" });
    } else {
      client.query(ownerSql, [applications.rows[0].owner_id], (err, owner) => {
        if (err) {
          console.log(err);
          res.status(400).json({ message: "Error fetching owner" });
        } else {
          client.query(
            vehicleSql,
            [applications.rows[0].vehicle_id],
            (err, vehicle) => {
              if (err) {
                console.log(err);
                res.status(400).json({ message: "Error fetching vehicle" });
              } else {
                client.query(
                  schoolSql,
                  [applications.rows[0].school_id],
                  (err, school) => {
                    if (err) {
                      console.log(err);
                      res
                        .status(400)
                        .json({ message: "Error fetching application" });
                    } else {
                      res.status(200).json({
                        application: applications.rows[0],
                        owner: owner.rows[0],
                        vehicle: vehicle.rows[0],
                        school: school.rows[0],
                      });
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });
};

exports.declineApplication = (req, res) => {
  //Decline the application
  const application_id = req.params.application_id;
  const feedback = req.body.feedback;
  console.log(feedback);

  const sql_1 = "SELECT * FROM application WHERE application_id = $1";

  client.query(sql_1, [application_id], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results.rows[0]);
      let owner_id = results.rows[0].owner_id;
      let sql_2 = "SELECT * FROM users WHERE user_id = $1";

      client.query(sql_2, [owner_id], (err, ownerResults) => {
        if (err) {
          console.log(err);
        } else {
          emailDetails.from = sender;
          emailDetails.to = ownerResults.rows[0].email;
          emailDetails.text =
            "Good Day " +
            ownerResults.rows[0].name +
            "\n\nThank you for taking your time and sending an application to get verified. However upon reviewing your application, we are sad to notify you that your application was unsuccessful. \n\nReason: " +
            feedback +
            "\n\nThe SGB";
          emailDetails.subject = "Application Response";

          let sql_3 =
            "UPDATE application SET status = 'DECLINED' WHERE application_id = $1";
          client.query(sql_3, [application_id], (err, declinedResults) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json({ message: "Application declined" });
            }
          });

          // transporter.sendMail(emailDetails, (emailErr) => {
          //   if (emailErr) {
          //     console.log(emailErr);
          //   } else {

          //   }
          // });
        }
      });
    }
  });
};

exports.approve = (req, res) => {
  const { application_id, owner_id, school_id, vehicle_id } = req.params;
  const sql =
    "INSERT INTO vehicle_owner (owner_id, school_id, vehicle_id,price) VALUES ($1, $2, $3, $4)";
  const sql_1 = "SELECT * FROM application WHERE application_id = $1";

  client.query(sql_1, [application_id], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      client.query(
        sql,
        [owner_id, school_id, vehicle_id, results.rows[0].price],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(400).json({ message: "Error insert owner into school" });
          } else {
            let sql_2 = "SELECT * FROM users WHERE user_id = $1";

            client.query(sql_2, [owner_id], (err, ownerResults) => {
              if (err) {
                console.log(err);
              } else {
                emailDetails.from = sender;
                emailDetails.to = ownerResults.rows[0].email;
                emailDetails.text =
                  "Good Day " +
                  ownerResults.rows[0].name +
                  "\n\nThank you for taking your time and sending an application to get verified. Upon reviewing your application, we are happy to notify you that your application was successful. \nYou will now recieve requests to transport children. All the best.\n\nThe SGB";
                emailDetails.subject = "Application Response";

                let sql_3 =
                  "UPDATE application SET status = 'APPROVED' WHERE application_id = $1";
                client.query(sql_3, [application_id], (err, acceptResult) => {
                  if (err) {
                    console.log(err);
                  } else {
                    transporter.sendMail(emailDetails, (emailErr) => {
                      if (emailErr) {
                        res.status(400).json({ message: "Error sending email to owner" });
                      } else {
                        res.status(200).json({ message: "Application accepted" });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      );

      //archive the application after accepting
      //Send email to the owner
    }
  });
};

exports.viewOwner = (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT * FROM users WHERE user_id = $1";

  client.query(sql, [user_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching owner" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

exports.ownerVehicles = (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT * FROM vehicle WHERE owner_id = $1";

  client.query(sql, [user_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching vehicles" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.ViewVehicle = (req, res) => {
  const vehicle_id = req.params.vehicle_id;
  const sql = "SELECT * FROM vehicle WHERE vehicle_id = $1";

  client.query(sql, [vehicle_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching vehicle" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

exports.suspendOwner = (req, res) => {
  const user_id = req.params.user_id;
  const sql = "UPDATE users SET is_suspended = $1 WHERE user_id = $2";
const sqlRemode = "DELETE FROM vehicle_owner WHERE owner_id = $1";

  client.query(sql, [true, user_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "Error suspending account" });
    } else {

      
      res.status(201).json({ message: "Successfully suspended" });
    }
  });
};
