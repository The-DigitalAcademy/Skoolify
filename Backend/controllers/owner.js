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
    const owner_id = req.params.owner_id
    const sql = "SELECT * FROM requests WHERE owner_id = $1";
    client.query(sql,[owner_id],(err, results) => {
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

    const request = "SELECT * FROM requests WHERE request_id = $1 AND owner_id = $2";
    const school = "SELECT * FROM school WHERE school_id = $1";
    const parent = "SELECT * FROM users WHERE user_id = $1";


    client.query(request,[request_id,owner_id],(err, results) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Error fetching request"});
      } else {
        client.query(parent,[results.rows[0].parent_id],(err,parentRes)=>{
            if (err) {
                res.status(400).json({ message: "Error fetching parent"});
            }else{
                client.query(school,[results.rows[0].school_id],(err,schoolRes)=>{
                    if (err) {
                        res.status(400).json({ message: "Error fetching school"});
                    }else{
                       res.status(200).json({ request : results.rows[0], parent: parentRes.rows[0], school :schoolRes.rows[0]});
                    }
        
                })//school call
            }
        })//parent call
      }
    });//request call
  };

  exports.decline = (req, res) => {
    const request_id = req.params.owner_id
    const feedback = req.body.feedback;


    const sql = "SELECT * FROM requests WHERE request_id = $1";
    client.query(sql, [request_id], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results.rows[0]);
          let parent_id = results.rows[0].parent_id;
          let sql_2 = "SELECT * FROM users WHERE user_id = $1";
    
          client.query(sql_2, [parent_id], (err, parentResults) => {
            if (err) {
              console.log(err);
            } else {
                client.query('SELECT * FROM school WHERE school_id = $1',[results.rows[0].school_id],(err,schoolResults)=>{
                    if(err)
                    {
                        console.log(err)
                    }else{
                        client.query('SELECT * FROM users WHERE user_id = $1',[results.rows[0].owner_id],(err,ownerResults) => {
                            if(err){
                                console.log(err)

                            }else{
                                emailDetails.from = sender;
                                emailDetails.to = parentResults.rows[0].email;
                                emailDetails.text =
                                "Good Day " +
                                parentResults.rows[0].name +
                                "\n\nThank you for taking your time and sending an request to"+ownerResults.rows[0].name+" "+ownerResults.rows[0].surname+". However, we are sad to notify you that your application was rejected. \n\nReason: " +
                                feedback +
                                "\n\nThe SGB";
                                emailDetails.subject = "Request Response";
                
                
                                transporter.sendMail(emailDetails, (emailErr) => {
                                if (emailErr) {
                                    console.log(emailErr);
                                } else {
                                    let sql_3 =
                                    "UPDATE requests SET status = 'DECLINED' WHERE request_id = $1";
                                    client.query(sql_3, [request_id], (err, declinedResults) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.status(200).json({ message: "Request declined" });
                                    }
                                    });//update status
                                }
                                });
                                //send the email
                            }

                        })//get the owner
                        
                    }

                })
            
             


            }
          });
        }
      });
   
  };


