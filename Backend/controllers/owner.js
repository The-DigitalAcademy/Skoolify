const client = require("../config/db_config");
const transporter = require('../config/email_config')
const sender = require('../config/email_config')

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

    //console.log('vehi' + vehicle_id+'\nsc' + vehicle_id+'\n')
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
                ` SELECT * FROM application where owner_id = $1 `,
        
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

        exports.getOneApplication = async (req,res)=>{
          const app_id = req.params.application_id;
          const app = "SELECT * FROM application where application_id = $1 ";
          const school = "SELECT * FROM school where school_id = $1 ";

          client.query(app,[app_id],(err,application)=>{
            if(err){
              res.status(400).json({message:'Failed to get application'})
            }else{
              client.query(school,[application.rows[0].school_id],(err,school)=>{
                if(err){
                  res.status(400).json({message:'Failed to get application'})
                }else{
                  res.status(200).json({application:application.rows[0],school:school.rows[0]})
                }
              })
            }
          })



        }

        
  exports.viewMyRequests = (req, res) => {
    const owner_id = req.params.owner_id;
  const sql =
    "SELECT * FROM requests WHERE owner_id = $1 AND (status = 'PENDING' OR status = 'ACCEPTED')";
  client.query(sql, [owner_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching requests" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.viewRequest = (req, res) => {
  const request_id = req.params.request_id;
  const owner_id = req.params.owner_id;

  const request =
    "SELECT * FROM requests WHERE request_id = $1 AND owner_id = $2";
  const school = "SELECT * FROM school WHERE school_id = $1";
  const parent = "SELECT * FROM users WHERE user_id = $1";

  client.query(request, [request_id, owner_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching request" });
    } else {
      client.query(parent, [results.rows[0].parent_id], (err, parentRes) => {
        if (err) {
          res.status(400).json({ message: "Error fetching parent" });
        } else {
          client.query(
            school,
            [results.rows[0].school_id],
            (err, schoolRes) => {
              if (err) {
                res.status(400).json({ message: "Error fetching school" });
              } else {
                res
                  .status(200)
                  .json({
                    request: results.rows[0],
                    parent: parentRes.rows[0],
                    school: schoolRes.rows[0],
                  });
              }
            }
          ); //school call
        }
      }); //parent call
    }
  }); //request call
};

exports.decline = (req, res) => {
  const request_id = req.params.request_id;
  const feedback = req.body.feedback;

  const sql = "SELECT * FROM requests WHERE request_id = $1";
  client.query(sql, [request_id], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results.rows);
      let parent_id = results.rows[0].parent_id;
      console.log(results.rows[0]);
      let sql_2 = "SELECT * FROM users WHERE user_id = $1";

      client.query(sql_2, [parent_id], (err, parentResults) => {
        if (err) {
          console.log(err);
        } else {
          client.query(
            "SELECT * FROM school WHERE school_id = $1",
            [results.rows[0].school_id],
            (err, schoolResults) => {
              if (err) {
                console.log(err);
              } else {
                client.query(
                  "SELECT * FROM users WHERE user_id = $1",
                  [results.rows[0].owner_id],
                  (err, ownerResults) => {
                    if (err) {
                      console.log(err);
                    } else {
                      emailDetails.from = sender;
                      emailDetails.to = parentResults.rows[0].email;
                      emailDetails.text =
                        "Good Day " +
                        parentResults.rows[0].name +
                        "\n\nThank you for taking your time and sending an request to" +
                        ownerResults.rows[0].name +
                        " " +
                        ownerResults.rows[0].surname +
                        ". However, we are sad to notify you that your application was rejected. \n\nReason: " +
                        feedback +
                        "\n\nThe SGB";
                      emailDetails.subject = "Request Response";

                      transporter.sendMail(emailDetails, (emailErr) => {
                        if (emailErr) {
                          console.log(emailErr);
                        } else {
                          let sql_3 =
                            "UPDATE requests SET status = 'DECLINED' WHERE request_id = $1";
                          client.query(
                            sql_3,
                            [request_id],
                            (err, declinedResults) => {
                              if (err) {
                                console.log(err);
                              } else {
                                res
                                  .status(200)
                                  .json({ message: "Request declined" });
                              }
                            }
                          ); //update status
                        }
                      });
                      //send the email
                    }
                  }
                ); //get the owner
              }
            }
          );
        }
      });
    }
  });
};

exports.accept = (req, res) => {
  const request_id = req.params.request_id;

  const sql = "SELECT * FROM requests WHERE request_id = $1";
  client.query(sql, [request_id], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(results.rows);
      let parent_id = results.rows[0].parent_id;
      //console.log(results.rows[0]);
      let sql_2 = "SELECT * FROM users WHERE user_id = $1";

      client.query(sql_2, [parent_id], (err, parentResults) => {
        if (err) {
          console.log(err);
        } else {
          client.query(
            "SELECT * FROM school WHERE school_id = $1",
            [results.rows[0].school_id],
            (err, schoolResults) => {
              if (err) {
                console.log(err);
              } else {
                client.query(
                  "SELECT * FROM users WHERE user_id = $1",
                  [results.rows[0].owner_id],
                  (err, ownerResults) => {
                    if (err) {
                      console.log(err);
                    } else {
                      emailDetails.from = sender;
                      emailDetails.to = parentResults.rows[0].email;
                      emailDetails.text =
                        "Good Day " +
                        parentResults.rows[0].name +
                        "\n\nThank you for taking your time and sending an request to " +
                        ownerResults.rows[0].name +
                        " " +
                        ownerResults.rows[0].surname +
                        ". We are glad to notify you that your application was accepted. Your name and email address will now be sent to the transport owner for further communication\n\nThe SGB";
                      emailDetails.subject = "Request Response";
                      let sql_3 =
                            "UPDATE requests SET status = 'ACCEPTED' WHERE request_id = $1";
                          client.query(
                            sql_3,
                            [request_id],
                            (err, acceptedResults) => {
                              if (err) {
                                console.log(err);
                              } else {
                                //email to owner
                                emailDetails.from = sender;
                                emailDetails.to = ownerResults.rows[0].email;
                                emailDetails.text =
                                  "Good Day " +
                                  ownerResults.rows[0].name +
                                  "\n\nYou have accepted the request from " +
                                  parentResults.rows[0].name +
                                  " " +
                                  parentResults.rows[0].surname +
                                  ". For further communication, here details the details of the parent.\nFull name: "+parentResults.rows[0].name +" "+parentResults.rows[0].surname+"\nEmail address: "+parentResults.rows[0].email+"\nPick up address: "+results.rows[0].pickUp_address+"\n\nWe wish you all the best on this opportunity.\n\nThe SGB";
                                emailDetails.subject = "Request Response";

                                let sql_3 =
                                        "UPDATE requests SET status = 'ACCEPTED' WHERE request_id = $1";
                                      client.query(
                                        sql_3,
                                        [request_id],
                                        (err, acceptedResults) => {
                                          if (err) {
                                            console.log(err);
                                          } else {
                                            res
                                              .status(200)
                                              .json({
                                                message: "Request accepted",
                                              });
                                          }
                                        }
                                      ); //update status

                                // transporter.sendMail(
                                //   emailDetails,
                                //   (emailErr) => {
                                //     if (emailErr) {
                                //       console.log(emailErr);
                                //     } else {
                                //       //update goes here
                                //     }
                                //   }
                                // );
                                //send the email to parent
                              }
                            }
                          ); //update status

                      // transporter.sendMail(emailDetails, (emailErr) => {
                      //   if (emailErr) {
                      //     console.log(emailErr);
                      //   } else {
                      //     //owner email here
                      //   }
                      // });
                      //send the email to parent
                    }
                  }
                ); //get the owner
              }
            }
          );
        }
      });
    }
  });
};


