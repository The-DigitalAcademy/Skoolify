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
  exports.getSchool = async (req, res) => {
    
    const school_id = parseInt(req.params.id);
    try {
         
          const data = await client.query(
            `SELECT * FROM school where school_id = $1`,
            [school_id],
            (err,result) => {
              if (err) {
            
                console.error(err);
                return res.status(500).json({
                  error: "Database error",
                });
              } else {
                res
                  .status(200)
                  .send(result.rows);
              }
            }
          );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Database error", //Database connection error
      });
    }
  };



  exports.price = (req, res) => {
    const {price,owner_id,vehicle_id,school_id } = req.body;
    let status="PENDING"
    const sql =
      "INSERT INTO application (owner_id,vehicle_id,price,school_id,status) values($1,$2,$3,$4,$5)";
  
    client.query(sql, [owner_id,vehicle_id,price,school_id,status], (err, results) => {
      if (err) {
        res.status(401).json({ message: "Error inserting price" });
      } else {
        res.status(201).json({ message: "price successfully added" });
      }
    });
  };



  exports.viewO = async (req, res) => {
    const {owner_id,school_id } = req.body;
    try {
          //get all post form the database
          const data = await client.query(
        "SELECT * from application where school_id = $1 and owner_id = $2,"
            [school_id,owner_id],
            (err,result) => {
              if (err) {
             //If post are not available is not inserted to database
                console.error(err);
                return res.status(500).json({
                  error: "Database error",
                });
              } else {
                res
                  .status(200)
                  .send(result.rows);
              }
            }
          );    } catch (err) {
            console.log(err);
            res.status(500).json({
              error: "Database error while creating post!", //Database connection error
            });
          }
        };
        exports.viewOwnerRequests= async (req, res) => {
          const user_id = parseInt(req.params.id);
          try {
                //get all post form the database
                const data = await client.query(
                ` SELECT * FROM application a, school s where application_id = s.school_id and a.owner_id = $1 `,
        
                  [user_id],
                  (err,result) => {
                    if (err) {
                   //If post are not available is not inserted to database
                      console.error(err);
                      return res.status(500).json({
                        error: "Database error",
                      });
                    } else {
                      res
                        .status(200)
                        .send(result.rows);
                    }
                  }
                );
          } catch (err) {
            console.log(err);
            res.status(500).json({
              error: "Database error while creating post!", //Database connection error
            });
          }
        };
        